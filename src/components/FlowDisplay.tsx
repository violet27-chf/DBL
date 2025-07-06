import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  EdgeTypes,
  Connection,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
} from 'react-flow-renderer';
import { Card, Typography, Modal, Input, Select, Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FlowNode from './FlowNode';
import FlowEdge from './FlowEdge';
import { FlowData } from '../types/flow';

const { Title } = Typography;

// 整体背景容器
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #667eea 50%, 
    #764ba2 75%, 
    #667eea 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding: 24px;
  position: relative;
  overflow: hidden;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

// 内容包装器
const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FlowContainer = styled.div`
  width: 100%;
  height: 700px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.08) 0%, 
      rgba(118, 75, 162, 0.08) 50%,
      rgba(102, 126, 234, 0.08) 100%);
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, #667eea, #764ba2, #667eea);
    border-radius: 25px;
    z-index: -2;
    opacity: 0.3;
  }
  
  &:hover {
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
`;

const FlowCard = styled(Card)`
  height: 100%;
  background: transparent;
  border: none;
  padding: 24px;
  
  .ant-card-body {
    height: 100%;
    padding: 0;
  }
`;

const FlowTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
`;

const FlowTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const FlowTitle = styled(Title)`
  position: relative;
  z-index: 2;
  padding: 24px 56px;
  font-size: 48px;
  font-weight: 900;
  color: #fff !important;
  letter-spacing: 8px;
  line-height: 1.2;
  background: none;
  margin: 0;
  text-align: center;
  text-shadow: 0 4px 16px rgba(102,126,234,0.18), 0 1px 0 #222, 0 0 2px #fff;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12));
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.15) 0%, 
      rgba(118, 75, 162, 0.15) 100%);
    border-radius: 24px;
    z-index: -1;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 32px rgba(102, 126, 234, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  &:hover {
    transform: translateY(-2px);
    
    &::before {
      box-shadow: 
        0 12px 40px rgba(102, 126, 234, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
  }
`;

const GlassBg = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  top: 50%; 
  height: 70%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(255,255,255,0.15);
  border-radius: 20px;
  filter: blur(15px);
  pointer-events: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
`;

const DragHint = styled.div`
  position: absolute;
  top: 80px;
  right: 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 13px;
  color: #222;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 29;
  opacity: 0.95;
  transition: all 0.3s ease-out;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(255,255,255,0.5), 0 1px 0 #fff;
  
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 
      0 6px 25px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.4);
  }
  
  .hint-icon {
    margin-right: 8px;
    font-size: 16px;
    opacity: 0.8;
  }
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  gap: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ControlButton = styled.button<{ isActive?: boolean }>`
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-shadow: 0 2px 8px rgba(102,126,234,0.18), 0 1px 0 #222;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  top: 100px;
  left: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 13px;
  color: #222;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  opacity: 0.95;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(255,255,255,0.5), 0 1px 0 #fff;
  
  .progress-text {
    font-weight: 900;
    color: #667eea;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 4px rgba(255,255,255,0.5), 0 1px 0 #fff;
  }
`;

// 更明显的语言切换浮动按钮
const LanguageFloatButton = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
  z-index: 20;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(102,126,234,0.18), 0 1px 0 #fff;
  padding: 0;
  overflow: hidden;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(.4,2,.6,1);
  min-width: 120px;
  min-height: 48px;
  user-select: none;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(102,126,234,0.28), 0 2px 8px #fff;
    transform: scale(1.06) translateY(-2px);
    border-color: #667eea;
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
  
  .lang-flag {
    font-size: 26px;
    margin: 0 10px 0 18px;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
  }
  .lang-text {
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 1px;
    margin-right: 8px;
    text-shadow: 0 2px 8px rgba(102,126,234,0.18), 0 1px 0 #222;
  }
  .lang-arrow {
    font-size: 16px;
    margin-right: 18px;
    opacity: 0.7;
    transition: transform 0.2s;
  }
  &:hover .lang-arrow {
    transform: rotate(180deg);
  }
`;

interface FlowDisplayProps {
  flowData: FlowData;
}

const FlowDisplay: React.FC<FlowDisplayProps> = ({ flowData }) => {
  const { t, i18n } = useTranslation();
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isFlowStarted, setIsFlowStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeIcon, setNewNodeIcon] = useState('🧩');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [insertAfterId, setInsertAfterId] = useState<string>('');

  // 自定义节点类型
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      dataSource: FlowNode,
      dataIngestion: FlowNode,
      dataCleaning: FlowNode,
      dataTransformation: FlowNode,
      dataValidation: FlowNode,
      dataWarehouse: FlowNode,
      dataLake: FlowNode,
      dataMart: FlowNode,
      etlProcess: FlowNode,
      dataModeling: FlowNode,
      statisticalAnalysis: FlowNode,
      predictiveAnalysis: FlowNode,
      reportGeneration: FlowNode,
      dashboard: FlowNode,
      chartVisualization: FlowNode,
      mapVisualization: FlowNode,
      modelTraining: FlowNode,
      modelEvaluation: FlowNode,
      modelDeployment: FlowNode,
      streamProcessing: FlowNode,
      batchJob: FlowNode,
      scheduling: FlowNode,
      monitoring: FlowNode,
    }),
    []
  );

  // 自定义边类型
  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      default: FlowEdge,
    }),
    []
  );

  // 初始化节点和边，并添加拖拽状态
  const initialNodes = useMemo(() => 
    flowData.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isDragging: false,
        isActive: false
      }
    })), [flowData.nodes]
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  
  // 初始化边，支持动态样式
  const initialEdges = useMemo(() => 
    flowData.edges.map(edge => ({
      ...edge,
      type: 'default',
      data: {
        isActive: isFlowStarted,
      },
      style: {
        stroke: '#667eea',
        strokeWidth: 3,
        strokeDasharray: isFlowStarted ? '10,5' : '0',
        strokeDashoffset: isFlowStarted ? 0 : 0,
      },
      animated: isFlowStarted,
    })), [flowData.edges, isFlowStarted]
  );
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 处理连接
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // 处理节点拖拽开始
  const onNodeDragStart = useCallback((event: any, node: Node) => {
    setDraggingNodeId(node.id);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isDragging: n.id === node.id
        }
      }))
    );
  }, [setNodes]);

  // 处理节点拖拽结束
  const onNodeDragStop = useCallback((event: any, node: Node) => {
    setDraggingNodeId(null);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isDragging: false
        }
      }))
    );
  }, [setNodes]);

  // 开始流程演示
  const startFlow = useCallback(() => {
    setIsFlowStarted(true);
    setCurrentStep(0);
    
    // 重置所有节点状态
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isActive: false
        }
      }))
    );

    // 更新边为虚线并激活流动效果
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: {
          isActive: true,
        },
        style: {
          ...edge.style,
          strokeDasharray: '10,5',
        },
        animated: true,
      }))
    );

    // 按顺序激活节点，激活后保持常亮
    const nodeIds = flowData.nodes.map(node => node.id);
    nodeIds.forEach((nodeId, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: {
              ...n.data,
              isActive: n.id === nodeId || n.data.isActive // 保持之前激活的节点
            }
          }))
        );
      }, index * 1000); // 每秒激活一个节点
    });
  }, [flowData.nodes, setNodes, setEdges]);

  // 重置流程
  const resetFlow = useCallback(() => {
    setIsFlowStarted(false);
    setCurrentStep(0);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isActive: false
        }
      }))
    );
    
    // 重置边为实线并停止流动效果
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: {
          isActive: false,
        },
        style: {
          ...edge.style,
          strokeDasharray: '0',
        },
        animated: false,
      }))
    );
  }, [setNodes, setEdges]);

  // 添加自定义节点
  const handleAddNode = () => {
    // 默认插入到最后一个节点后
    setInsertAfterId(nodes.length > 0 ? nodes[nodes.length - 1].id : '');
    setAddModalOpen(true);
  };

  const handleAddNodeOk = () => {
    if (!newNodeName.trim()) return;
    const newId = `custom-${Date.now()}`;
    const newNode = {
      id: newId,
      type: 'dataIngestion',
      position: { x: 0, y: 0 }, // 先占位，后面统一排列
      data: {
        label: newNodeName,
        status: 'pending' as 'pending',
        icon: newNodeIcon || '🧩',
        description: newNodeDesc || '自定义功能块',
        isDragging: false,
        isActive: false,
      }
    };
    // 计算插入位置
    let newNodes: typeof nodes;
    if (insertAfterId === '__head__') {
      newNodes = [newNode, ...nodes];
    } else {
      const idx = nodes.findIndex(n => n.id === insertAfterId);
      if (idx === -1) {
        newNodes = [...nodes, newNode];
      } else {
        newNodes = [
          ...nodes.slice(0, idx + 1),
          newNode,
          ...nodes.slice(idx + 1)
        ];
      }
    }
    // 横向排列
    const startX = 200, startY = 200, gapX = 260;
    const newNodesWithPos = newNodes.map((node, i) => ({
      ...node,
      position: { x: startX + i * gapX, y: startY }
    }));
    // 顺序连线
    const newEdges = [];
    for (let i = 0; i < newNodesWithPos.length - 1; i++) {
      newEdges.push({
        id: `e${newNodesWithPos[i].id}-${newNodesWithPos[i + 1].id}`,
        source: newNodesWithPos[i].id,
        target: newNodesWithPos[i + 1].id,
        type: 'default',
        data: { isActive: false },
        style: { stroke: '#667eea', strokeWidth: 3, strokeDasharray: '0' }
      });
    }
    setNodes(newNodesWithPos);
    setEdges(newEdges);
    setAddModalOpen(false);
    setNewNodeName('');
    setNewNodeIcon('🧩');
    setNewNodeDesc('');
    setInsertAfterId('');
  };

  const handleAddNodeCancel = () => {
    setAddModalOpen(false);
    setNewNodeName('');
    setNewNodeIcon('🧩');
    setNewNodeDesc('');
    setInsertAfterId('');
  };

  // 重置节点顺序并自动排列和连线
  const handleResetOrder = () => {
    // 按id升序排列（可自定义规则）
    const sortedNodes = [...nodes].sort((a, b) => a.id.localeCompare(b.id));
    // 横向排列
    const startX = 200, startY = 200, gapX = 260;
    const newNodes = sortedNodes.map((node, idx) => ({
      ...node,
      position: { x: startX + idx * gapX, y: startY }
    }));
    // 顺序连线
    const newEdges = [];
    for (let i = 0; i < newNodes.length - 1; i++) {
      newEdges.push({
        id: `e${newNodes[i].id}-${newNodes[i + 1].id}`,
        source: newNodes[i].id,
        target: newNodes[i + 1].id,
        type: 'default',
        data: { isActive: false },
        style: { stroke: '#667eea', strokeWidth: 3, strokeDasharray: '0' }
      });
    }
    setNodes(newNodes);
    setEdges(newEdges);
  };

  // 语言切换
  const langMenu = (
    <Menu
      onClick={({ key }) => handleLanguageChange(key)}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
        padding: '8px 0'
      }}
      items={[
        { 
          key: 'zh', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇨🇳</span>
              <span style={{ fontWeight: 600 }}>中文</span>
            </div>
          )
        },
        { 
          key: 'en', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇺🇸</span>
              <span style={{ fontWeight: 600 }}>English</span>
            </div>
          )
        },
        { 
          key: 'ja', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇯🇵</span>
              <span style={{ fontWeight: 600 }}>日本語</span>
            </div>
          )
        },
        { 
          key: 'ru', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇷🇺</span>
              <span style={{ fontWeight: 600 }}>Русский</span>
            </div>
          )
        },
        { 
          key: 'de', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇩🇪</span>
              <span style={{ fontWeight: 600 }}>Deutsch</span>
            </div>
          )
        },
        { 
          key: 'hi', 
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <span style={{ fontSize: '16px' }}>🇮🇳</span>
              <span style={{ fontWeight: 600 }}>हिन्दी</span>
            </div>
          )
        }
      ]}
    />
  );

  // 获取当前语言的图标和显示文本
  const getCurrentLanguageInfo = () => {
    const currentLang = i18n.language;
    const languageMap = {
      zh: { icon: '🇨🇳', text: '中文' },
      en: { icon: '🇺🇸', text: 'EN' },
      ja: { icon: '🇯🇵', text: '日本語' },
      ru: { icon: '🇷🇺', text: 'Русский' },
      de: { icon: '🇩🇪', text: 'Deutsch' },
      hi: { icon: '🇮🇳', text: 'हिन्दी' }
    };
    return languageMap[currentLang as keyof typeof languageMap] || languageMap.en;
  };

  // 语言切换处理函数
  const handleLanguageChange = (key: string) => {
    i18n.changeLanguage(key);
  };

  return (
    <AppContainer>
      <ContentWrapper>
        <FlowCard>
          <FlowTitleWrapper>
            <FlowTitleBox>
              <FlowTitle level={3}>{t('header.title')}</FlowTitle>
            </FlowTitleBox>
          </FlowTitleWrapper>
          
          <FlowContainer>
        <ControlPanel>
          <ControlButton 
            onClick={startFlow} 
            disabled={isFlowStarted}
            isActive={isFlowStarted}
          >
            {isFlowStarted ? t('flowInProgress') : t('button.startFlow')}
          </ControlButton>
          <ControlButton 
            onClick={resetFlow}
            disabled={!isFlowStarted}
          >
            {t('button.resetFlow')}
          </ControlButton>
          {/* 仅在数据采集流程下显示添加功能块按钮 */}
          {flowData.name === 'dataCollection' && (
            <>
              <ControlButton onClick={handleAddNode}>
                {t('button.addBlock')}
              </ControlButton>
              <ControlButton onClick={handleResetOrder}>
                {t('button.resetOrder')}
              </ControlButton>
            </>
          )}
        </ControlPanel>
        
        {isFlowStarted && (
          <ProgressIndicator>
            <span className="progress-text">
              {t('progress.currentProgress')}: {currentStep + 1} / {flowData.nodes.length}
            </span>
          </ProgressIndicator>
        )}
        
        <DragHint>
          <span className="hint-icon">🖱️</span>
          {t('hint.dragToReorder')}
        </DragHint>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-left"
          style={{
            background: 'transparent'
          }}
          minZoom={0.5}
          maxZoom={2}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
        >
          <Background 
            color="rgba(102, 126, 234, 0.1)" 
            gap={24}
            size={1}
          />
          <Controls 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px'
            }}
          />
          <div className="react-flow__pane">
            <LanguageFloatButton as="div">
              <Dropdown overlay={langMenu} placement="bottomRight">
                <div style={{display:'flex',alignItems:'center'}}>
                  <span className="lang-flag">{getCurrentLanguageInfo().icon}</span>
                  <span className="lang-text">{getCurrentLanguageInfo().text}</span>
                  <span className="lang-arrow">▼</span>
                </div>
              </Dropdown>
            </LanguageFloatButton>
          </div>
        </ReactFlow>
        {/* 添加功能块弹窗 */}
        <Modal
          title={t('modal.addCustomBlock')}
          open={addModalOpen}
          onOk={handleAddNodeOk}
          onCancel={handleAddNodeCancel}
          okText={t('button.ok')}
          cancelText={t('button.cancel')}
          style={{
            backdropFilter: 'blur(10px)'
          }}
          styles={{
            mask: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)'
            },
            content: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
            },
            header: {
              background: 'transparent',
              borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
              borderRadius: '20px 20px 0 0'
            },
            body: {
              padding: '24px'
            },
            footer: {
              background: 'transparent',
              borderTop: '1px solid rgba(102, 126, 234, 0.1)',
              borderRadius: '0 0 20px 20px'
            }
          }}
        >
          <div style={{marginBottom: 12}}>
            <Input
              placeholder={t('input.blockName')}
              value={newNodeName}
              onChange={e => setNewNodeName(e.target.value)}
              maxLength={12}
              style={{
                marginBottom: 12,
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Input
              placeholder={t('input.blockIcon')}
              value={newNodeIcon}
              onChange={e => setNewNodeIcon(e.target.value)}
              maxLength={2}
              style={{
                marginBottom: 12,
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Input
              placeholder={t('input.blockDesc')}
              value={newNodeDesc}
              onChange={e => setNewNodeDesc(e.target.value)}
              maxLength={20}
              style={{
                marginBottom: 12,
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Select
              value={insertAfterId}
              onChange={setInsertAfterId}
              style={{ 
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Select.Option value="__head__">{t('select.insertToHead')}</Select.Option>
              {nodes.map(n => (
                <Select.Option key={n.id} value={n.id}>
                  {n.data.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Modal>
      </FlowContainer>
        </FlowCard>
      </ContentWrapper>
    </AppContainer>
  );
};

export default FlowDisplay; 