---
title: QNAP 威联通 Container 配置 Proxy
description: 修改container配置proxy
pubDate: 2025-07-27
tags: [QNap， Docker]
---

## 修改配置

···shell
# 配置 /share/CACHEDEV1_DATA/.qpkg/container-station/script/run-docker.sh

export http_proxy="http://Clash:6oKdGFuX@192.168.5.249:7893"
export https_proxy="http://Clash:6oKdGFuX@192.168.5.249:7893"
export no_proxy="localhost,127.0.0.1,::1,192.168.0.0/16,10.0.0.0/8,*.example.com"

。。。。。。

exec dockerd $DOCKER_OPTS

···

## 重启Container

```shell
sudo /etc/init.d/container-station.sh restart
```