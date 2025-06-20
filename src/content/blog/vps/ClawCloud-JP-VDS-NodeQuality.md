---
title: "ClawCloud Japan"
pubDate: 2025-05-27 12:00:00
tags: [vps,nodequality,  优化线路]
description: 本文介绍ClawCloud Japan VDS的性能测试结果
---

[TOC]

# 💻 基本信息

```
Basic System Information:
---------------------------------
Uptime     : 39 days, 4 hours, 50 minutes
Processor  : Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz
CPU cores  : 2 @ 2499.982 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ❌ Disabled
RAM        : 1.9 GiB
Swap       : 0.0 KiB
Disk       : 40.0 GiB
Distro     : Debian GNU/Linux 12 (bookworm)
Kernel     : 6.1.0-33-cloud-amd64
VM Type    : ALIBABA CLOUD ECS
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : Alibaba (US) Technology Co., Ltd.
ASN        : AS45102 Alibaba (US) Technology Co., Ltd.
Host       : Alibaba.com Singapore E-Commerce Private Limited
Location   : Tokyo, Tokyo (13)
Country    : Japan

fio Disk Speed Tests (Mixed R/W 50/50) (Partition -):
---------------------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ----
Read       | 81.90 MB/s   (20.4k) | 216.63 MB/s   (3.3k)
Write      | 82.12 MB/s   (20.5k) | 217.77 MB/s   (3.4k)
Total      | 164.02 MB/s  (41.0k) | 434.41 MB/s   (6.7k)
           |                      |
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ----
Read       | 210.75 MB/s    (411) | 189.55 MB/s    (185)
Write      | 221.95 MB/s    (433) | 202.17 MB/s    (197)
Total      | 432.71 MB/s    (844) | 391.73 MB/s    (382)

Geekbench 5 Benchmark Test:
---------------------------------
Test            | Value
                |
Single Core     | 776
Multi Core      | 932
Full Test       | https://browser.geekbench.com/v5/cpu/23568664

 SysBench CPU 测试 (Fast Mode, 1-Pass @ 5sec)
---------------------------------
 1 线程测试(单核)得分:          893 Scores
 2 线程测试(多核)得分:          1505 Scores
 SysBench 内存测试 (Fast Mode, 1-Pass @ 5sec)
---------------------------------
 单线程读测试:          17934.62 MB/s
 单线程写测试:          14868.67 MB/s
```

# 🎬IP 质量

![image](https://i.111666.best/image/kPYY3lQS93S2gaggHk1I8P.webp)

# 🌐 网络质量

![image](https://i.111666.best/image/7VNZ2HBkopG3V2d7qEFh8v.webp)

# 📍 回程路由

![image](https://i.111666.best/image/EpcRg6Nu7MPno9vZG0bWXL.webp)

[NodeQuality 链接](https://nodequality.com/r/MmZmqyqUyjFgHBuvN7fcKeP74e7ouT46)
