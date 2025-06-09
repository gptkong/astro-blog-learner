---
title: 一键安装sing-box 并配置好ss2022 + shadow-tls
pubDate: 2025-05-06 16:57:12
tags: [sing-box,shadow-tls,ss]
summary: 本文介绍如何使用一键脚本安装和配置sing-box，并设置ss2022和shadow-tls加密
---

## 一健脚本

```shell
bash <(curl -Ls https://alist.kong.vision/d/r2/ss/script/sb-kong.sh)
```

## 脚本审查

```shell
#!/bin/bash

# 检查是否为root用户
if [ "$(id -u)" != "0" ]; then
   echo "此脚本需要root权限运行" 
   exit 1
fi

# 检测系统类型并安装依赖
install_dependencies() {
    if command -v apt-get &> /dev/null; then
        # Debian/Ubuntu
        apt-get update
        apt-get install -y curl jq openssl nftables
    elif command -v yum &> /dev/null; then
        # CentOS/RHEL
        yum install -y epel-release
        yum install -y curl jq openssl nftables
    elif command -v dnf &> /dev/null; then
        # Fedora
        dnf install -y curl jq openssl nftables
    elif command -v pacman &> /dev/null; then
        # Arch Linux
        pacman -Sy --noconfirm curl jq openssl nftables
    else
        echo "不支持的系统类型"
        exit 1
    fi
}

# 安装依赖
echo "正在安装必要的依赖..."
install_dependencies

# 检查必要的命令
for cmd in curl jq openssl nft; do
    if ! command -v $cmd &> /dev/null; then
        echo "错误: 安装 $cmd 失败"
        exit 1
    fi
done

# 生成随机端口 (10000-65535)
SHADOWTLS_PORT=$((RANDOM % 55535 + 10000))
SHADOWSOCKS_PORT=$((RANDOM % 55535 + 10000))

# 生成随机密钥
SHADOWSOCKS_PASSWORD=$(openssl rand -base64 32)
SHADOWTLS_PASSWORD=$(openssl rand -base64 24)

# 安装 sing-box
echo "正在安装 sing-box..."
if ! curl -fsSL https://sing-box.app/install.sh | sh; then
    echo "sing-box 安装失败"
    exit 1
fi

# 创建配置目录（如果不存在）
mkdir -p /etc/sing-box

# 备份原有配置文件（如果存在）
if [ -f /etc/sing-box/config.json ]; then
    mv /etc/sing-box/config.json /etc/sing-box/config.json.bak
fi

# 生成配置文件
tee /etc/sing-box/config.json > /dev/null << EOF
{
  "inbounds": [
    {
      "type": "shadowtls",
      "listen": "0.0.0.0",
      "listen_port": ${SHADOWTLS_PORT},
      "version": 3,
      "users": [
        {
          "name": "Eyeseas",
          "password": "${SHADOWTLS_PASSWORD}"
        }
      ],
      "handshake": {
        "server": "azure.microsoft.com",
        "server_port": 443
      },
      "detour": "shadowsocks-in"
    },
    {
      "type": "shadowsocks",
      "tag": "shadowsocks-in",
      "listen": "0.0.0.0",
      "listen_port": ${SHADOWSOCKS_PORT},
      "network": "tcp",
      "method": "2022-blake3-aes-256-gcm",
      "password": "${SHADOWSOCKS_PASSWORD}"
    },
    {
      "type": "shadowsocks",
      "tag": "shadowsocks-udp-in",
      "listen": "0.0.0.0",
      "listen_port": ${SHADOWSOCKS_PORT},
      "network": "udp",
      "method": "2022-blake3-aes-256-gcm",
      "password": "${SHADOWSOCKS_PASSWORD}"
    }
  ],
  "outbounds": [
    {
      "type": "direct",
      "tag": "direct-out"
    }
  ],
  "route": {
    "rules": [
      {
        "action": "route",
        "outbound": "direct-out"
      }
    ]
  }
}
EOF

# 启动 sing-box 服务
echo "正在启动 sing-box 服务..."
systemctl enable sing-box
systemctl restart sing-box

# 检查服务状态
if systemctl is-active --quiet sing-box; then
    echo "sing-box 服务已启动"
else
    echo "sing-box 服务启动失败"
    exit 1
fi

# 配置 nftables 规则
echo "正在配置 nftables 规则..."

# 获取主网卡名称
MAIN_INTERFACE=$(ip route | grep default | awk '{print $5}')

# 重启 nftables 服务
echo "重启 nftables 服务..."
systemctl restart nftables

# 初始化 nftables
nft flush ruleset

# 创建 ss_udp_rule 表和链
nft add table inet ss_udp_rule
nft add chain inet ss_udp_rule prerouting { type nat hook prerouting priority filter \; policy accept \; }
nft add chain inet ss_udp_rule postrouting { type nat hook postrouting priority srcnat \; policy accept \; }

# 添加规则
nft add rule inet ss_udp_rule prerouting iifname ${MAIN_INTERFACE} udp dport ${SHADOWTLS_PORT} dnat to :${SHADOWSOCKS_PORT}
nft add rule inet ss_udp_rule postrouting oifname ${MAIN_INTERFACE} udp dport ${SHADOWSOCKS_PORT} masquerade

# 保存规则到配置文件
nft list ruleset > /etc/nftables.conf

# 获取服务器IPv4地址
SERVER_IP=$(curl -s -4 ifconfig.me)
if [ -z "$SERVER_IP" ]; then
    echo "无法获取服务器IPv4地址"
    exit 1
fi

LOCATION=$(curl -s "http://ip-api.com/json/${SERVER_IP}" | jq -r '.country + "-" + .city' 2>/dev/null)

# 获取主机名，如果获取失败则使用IP和位置信息
HOSTNAME=$(hostname 2>/dev/null)
if [ -z "$HOSTNAME" ] || [ "$HOSTNAME" = "localhost" ]; then
    if [ -n "$LOCATION" ] && [ "$LOCATION" != "null-null" ]; then
        HOSTNAME="${LOCATION}-${SERVER_IP}"
    else
        HOSTNAME="server-${SERVER_IP}"
    fi
fi

# 输出配置信息
echo "${HOSTNAME}=ss,${SERVER_IP},${SHADOWTLS_PORT},encrypt-method=2022-blake3-aes-256-gcm,password=\"${SHADOWSOCKS_PASSWORD}\",udp-relay=true,shadow-tls-password=${SHADOWTLS_PASSWORD},shadow-tls-sni=azure.microsoft.com,shadow-tls-version=3" 
```
