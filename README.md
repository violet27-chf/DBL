# 大数据工作流程演示应用

这是一个基于React和Electron的大数据工作流程可视化演示应用，用于展示各种大数据处理流程。

## 功能特性

- 🎯 **多种工作流程**：包含数据采集、数据处理、数据存储、数据分析、数据可视化、机器学习、实时处理和批量处理等8种典型大数据工作流程
- 🎨 **美观的界面**：使用Ant Design组件库，提供现代化的用户界面
- 🌐 **多语言支持**：支持中文和英文切换
- ⚡ **动画效果**：流程节点具有动态高亮和动画效果
- 📱 **Electron应用**：可打包成桌面应用
- 🔄 **实时状态**：显示流程节点的实时状态（运行中、已完成、等待中等）

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI组件库**：Ant Design
- **流程图**：React Flow
- **样式**：Styled Components
- **国际化**：i18next
- **桌面应用**：Electron
- **构建工具**：Create React App

## 安装和运行

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 启动Electron开发模式
npm run electron-dev
```

### 打包应用

```bash
# 构建React应用
npm run build

# 打包Electron应用
npm run electron-pack
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── FlowNode.tsx     # 流程节点组件
│   ├── FlowDisplay.tsx  # 流程展示组件
│   └── FlowMenu.tsx     # 菜单组件
├── data/               # 数据配置
│   └── flowData.ts     # 流程数据
├── i18n/               # 国际化
│   └── index.ts        # 语言配置
├── types/              # TypeScript类型定义
│   └── flow.ts         # 流程相关类型
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口
```

## 工作流程说明

### 1. 数据采集 (Data Collection)
- 数据源 → 数据摄入 → 数据清洗

### 2. 数据处理 (Data Processing)
- 数据转换 → 数据验证 → ETL处理 → 数据建模

### 3. 数据存储 (Data Storage)
- 数据仓库 → 数据湖 → 数据集市

### 4. 数据分析 (Data Analysis)
- 统计分析 → 预测分析 → 报告生成

### 5. 数据可视化 (Data Visualization)
- 仪表板 → 图表可视化 → 地图可视化

### 6. 机器学习 (Machine Learning)
- 模型训练 → 模型评估 → 模型部署

### 7. 实时处理 (Real-time Processing)
- 流处理 → 监控告警

### 8. 批量处理 (Batch Processing)
- 批处理作业 → 任务调度 → 监控告警

## 状态说明

- 🟢 **已完成** (Completed)：流程节点已完成处理
- 🔵 **运行中** (Running)：流程节点正在执行，带有动画效果
- 🟡 **处理中** (Processing)：流程节点正在处理中
- 🔴 **失败** (Failed)：流程节点执行失败
- ⚪ **等待中** (Pending)：流程节点等待执行

## 开发说明

这是一个演示应用，主要用于展示大数据工作流程的可视化效果，不包含实际的大数据处理功能。

## 许可证

MIT License 