---
title: shadow-tls 处理udp流量
pubDate: 2025-05-05 21:42:11
updateDate: 2025-06-23 16:30:00
tags: [ss, shadow-tls]
description: 本文介绍如何使用nftables和ss-rust处理udp流量
---

[TOC]

> 解决方案参考来源 [surge community](https://community.nssurge.com/d/1711-shadowsocks-rustshadow-tlsudp)


## 2025-06-23更新

```shell
# 在ipv6 only的机器下配置

table ip6 nat {
        chain prerouting {
                type nat hook prerouting priority dstnat; policy accept;
                iifname "eth0" ip6 daddr 公网ipv6 udp dport 21042 dnat to :19569
        }

        chain postrouting {
                type nat hook postrouting priority srcnat; policy accept;
                oifname "eth0" udp dport 19569 masquerade
        }
}
```


## nftables 解决方案

```shell
nft add table inet my_nat_table

nft add chain inet my_nat_table prerouting { type nat hook prerouting priority filter \; policy accept \; }

nft add chain inet my_nat_table postrouting { type nat hook postrouting priority srcnat \; policy accept \; }

nft add rule inet my_nat_table prerouting iifname "eth0" udp dport xxxxx(替换成shadowTLS 的端口) dnat to :xxxxxx(替换成 $$-rust的端口)

nft add rule inet my_nat_table postrouting oifname "eth0" udp dport xxxxxx(替换成 $$-rust的端口) masquerade
```

### nftables 部分指令

1. 输出到文件持久化

```shell
nft list ruleset > /etc/nftables.conf
```

2. 加载规则

```shell
nft -f /etc/nftables.conf
```

## ss-rust 解决方案

```json
{
    "server": "::",
    "server_port": xxxxx(shadow TLS端口，让$$来接管这个端口的 udp 流量),
    "password": "xxxxxxxx",
    "method": "2022-blake3xxxxxxxx",
    "fast_open": true,
    "mode": "udp_only",
    "user": "nobody",
    "timeout": 300
}
```
