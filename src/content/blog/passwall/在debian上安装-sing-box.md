---
title: 在debian上安装 sing-box
pubDate: 2025-05-06 11:00:01
tags: [sing-box]
summary: 在 Debian 系统上安装和配置 sing-box 代理工具的完整教程
---

## 官方一键安装脚本

```shell
curl -fsSL https://sing-box.app/install.sh | sh
```

### 内部运行指令

```shell
/usr/bin/sing-box -D /var/lib/sing-box -C /etc/sing-box run
```
- 配置文件路径 `/etc/sing-box` 下的 `config.json` (需要手动创建)


## 管理服务

| 操作          | 命令                                              |
|---------------|--------------------------------------------------|
| Enable        | `sudo systemctl enable sing-box`                |
| Disable       | `sudo systemctl disable sing-box`               |
| Start         | `sudo systemctl start sing-box`                 |
| Stop          | `sudo systemctl stop sing-box`                  |
| Kill          | `sudo systemctl kill sing-box`                  |
| Restart       | `sudo systemctl restart sing-box`               |
| Logs          | `sudo journalctl -u sing-box --output cat -e`   |
| New Logs      | `sudo journalctl -u sing-box --output cat -f`   |