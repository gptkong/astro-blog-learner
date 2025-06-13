---
title: 自建DNS解锁流媒体
pubDate: 2025-06-02
updatedDate: 2025-06-13
description: 利用解锁服务器搭建DNS解锁流媒体
tags:
  - vps
  - dns服务器
  - dns
  - adguardhome
  - sniproxy
---

## 使用AdguardHome搭建DNS服务器

具体安装教程参考
- [adguardhome github](https://github.com/AdguardTeam/AdGuardHome)
- [adguard docker hub](https://hub.docker.com/r/adguard/adguardhome)

### 一键脚本
```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

### docker
```bash
docker run --name adguardhome\
    --restart unless-stopped\
    -v /my/own/workdir:/opt/adguardhome/work\
    -v /my/own/confdir:/opt/adguardhome/conf\
    -p 53:53/tcp -p 53:53/udp\
    -p 67:67/udp -p 68:68/udp\
    -p 80:80/tcp -p 443:443/tcp -p 443:443/udp -p 3000:3000/tcp\
    -p 853:853/tcp\
    -p 784:784/udp -p 853:853/udp -p 8853:8853/udp\
    -p 5443:5443/tcp -p 5443:5443/udp\
    -d adguard/adguardhome
```

### 配置上游DNS
#### 打开过滤器
![image](https://i.111666.best/image/fd2t5mNb0Vl8GV0iC3uq1V.png)

#### 一般使用`8.8.8.8`|`1.1.1.1`
![image](https://i.111666.best/image/k0Xv3MCF73ELFBMCk31Ehp.png)

#### 配置adghome的自定义过滤规则

使用[DNS解锁配置生成器](https://dnsconfig.072899.xyz/), 填入解锁服务器的ip地址, v4/v6都可以,来自大佬[[hkfires](https://www.nodeseek.com/space/23484)](https://www.nodeseek.com/post-329849-1)

![image](https://i.111666.best/image/O7pEaqbEULVpeWCfEgZ1ub.png)

#### 填入自定义过滤规则
![image](https://i.111666.best/image/gZ9OVYQTLNAL6SBM10jkQ9.png)


## 安装SNIProxy

> SNIProxy 本质也是一种端口转发工具

[官方配置教程如下](https://github.com/XIU2/SNIProxy?tab=readme-ov-file#-%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)

```
# 如果是第一次使用，则建议创建新文件夹（后续更新时，跳过该步骤）
mkdir sniproxy

# 进入文件夹（后续更新，只需要从这里重复下面的下载、解压命令即可）
cd sniproxy

# 下载 sniproxy 压缩包（自行根据需求替换 URL 中 [版本号] 和 [文件名]）
wget -N https://github.com/XIU2/SNIProxy/releases/download/v1.0.4/sniproxy_linux_amd64.tar.gz
# 如果你是在国内服务器上下载，那么请使用下面这几个镜像加速：
# wget -N https://ghp.ci/https://github.com/XIU2/SNIProxy/releases/download/v1.0.4/sniproxy_linux_amd64.tar.gz
# wget -N https://ghproxy.cc/https://github.com/XIU2/SNIProxy/releases/download/v1.0.4/sniproxy_linux_amd64.tar.gz
# wget -N https://ghproxy.net/https://github.com/XIU2/SNIProxy/releases/download/v1.0.4/sniproxy_linux_amd64.tar.gz
# wget -N https://gh-proxy.com/https://github.com/XIU2/SNIProxy/releases/download/v1.0.4/sniproxy_linux_amd64.tar.gz

# 如果下载失败的话，尝试删除 -N 参数（如果是为了更新，则记得提前删除旧压缩包 rm sniproxy_linux_amd64.tar.gz ）

# 解压（不需要删除旧文件，会直接覆盖，自行根据需求替换 文件名）
tar -zxf sniproxy_linux_amd64.tar.gz

# 赋予执行权限
chmod +x sniproxy

# 编辑配置文件（根据下面的 配置文件说明 来自定义配置内容并保存(按下 Ctrl+X 然后再按 2 下回车)
nano config.yaml

# 运行（不带参数）
./sniproxy

# 运行（带参数示例）
./sniproxy -c "config.yaml"

# 后台运行（带参数示例）
nohup ./sniproxy -c "config.yaml" > "sni.log" 2>&1 &
```


### 大佬提供的一键SNIProxy脚本

```
curl -sSL https://raw.githubusercontent.com/hkfires/DNS-Unlock-Server/main/install_sniproxy.sh | sudo bash
```


## 配置DNS解锁

> DNS配置解锁时最好是直接使用resolv模式直接全局改为adghome的dns配置

[一键脚本](https://github.com/Jimmyzxk/DNS-Alice-Unlock)


### 解锁效果
![image](https://i.111666.best/image/urEmGs258tnGXvpDd313T8.png)