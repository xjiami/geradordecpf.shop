# Gerador NV - 文档生成器

这是一个模仿https://geradornv.com.br/的文档生成器网站，提供巴西各类身份证件号码的生成、验证和格式化功能。

## 项目概述

本项目是一个纯前端实现的文档生成器，主要面向开发人员、系统分析师、数据库管理员和软件测试人员，用于生成有效的测试数据。

### 主要功能

- 生成有效的巴西身份证件号码（CPF、CNPJ等）
- 验证已有文档号码的有效性
- 格式化文档号码
- 一键复制生成的号码
- 支持暗黑/亮色模式

## 技术架构

### 前端技术

- HTML5 + CSS3 + JavaScript (ES6+)
- 响应式设计
- 苹果风格UI设计
- 无外部依赖，纯原生实现

### 项目结构
D:\geradornv
├── index.html # 主页面 ├── README.md # 项目说明文档 ├── assets\ # 静态资源文件夹 │ ├── css\ # 样式文件 │ ├── js\ # JavaScript文件 │ │ ├── generators\ # 生成器模块 │ │ └── validators\ # 验证器模块 │ ├── images\ # 图片资源 │ └── fonts\ # 字体文件 ├── favicon.ico # 网站图标 └── sitemap.xml # 网站地图（SEO用）
## SEO优化

- 语义化HTML结构
- 优化元标签
- 创建sitemap.xml和robots.txt
- 实现结构化数据
- 移动友好设计

## 性能优化

- 代码压缩
- 资源延迟加载
- 浏览器缓存利用
- Service Worker离线功能

## 设计风格

- 简约大气的苹果风格
- 圆角元素和微妙阴影
- 大量留白
- 简洁的色彩方案
- 响应式设计，适配所有设备

## 开发指南

1. 克隆本仓库
2. 直接在浏览器中打开index.html即可运行
3. 无需安装任何依赖或运行服务器

## 部署方式

作为纯静态网站，可部署在任何静态网站托管服务上：
- GitHub Pages
- Netlify
- Vercel
- 任何支持静态文件的Web服务器