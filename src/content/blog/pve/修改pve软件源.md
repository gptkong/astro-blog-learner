---
title: 修改PVE默认的软件源地址
pubDate: 2025-07-14
description: 记录修改pve源情况
tags: [pve, 软件源]
---

## 修改软件源

- [清华镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/proxmox/)

```bash
/etc/apt/sources.list

# 清华源
deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian/pve bookworm pve-no-subscription
```

## 修改 CT 源

### 备份原文件

```shell
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back
```

### 修改下载地址

```shell
sed -i 's|http://download.proxmox.com|https://mirrors.tuna.tsinghua.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```
