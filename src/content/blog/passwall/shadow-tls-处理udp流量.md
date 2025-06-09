---
title: shadow-tls 处理udp流量
pubDate: 2025-05-05 21:42:11
tags: [ss,shadow-tls]
summary: 本文介绍如何使用nftables和ss-rust处理udp流量
---


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