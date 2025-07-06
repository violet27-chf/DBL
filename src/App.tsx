import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FlowDisplay from './components/FlowDisplay';
import { allFlows } from './data/flowData';
import './App.css';

const { Content } = Layout;

const AppContainer = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const StyledContent = styled(Content)`
  padding: 32px;
  background: transparent;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    margin: 16px;
    z-index: -1;
  }
`;

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0); // 用于强制重新渲染

  // 合并所有流程节点和连线，生成超级流程
  const allNodes: any[] = [];
  const allEdges: any[] = [];
  let nodeId = 1;
  let prevNodeId: string | null = null;
  Object.values(allFlows).forEach((flow, flowIdx) => {
    flow.nodes.forEach((node, idx) => {
      const newId = `${nodeId}`;
      allNodes.push({
        ...node,
        id: newId,
        position: { x: 100 + (nodeId - 1) * 220, y: 100 },
      });
      if (prevNodeId) {
        allEdges.push({
          id: `e${prevNodeId}-${newId}`,
          source: prevNodeId,
          target: newId,
          animated: true
        });
      }
      prevNodeId = newId;
      nodeId++;
    });
  });
  const superFlow = {
    id: 'all-in-one',
    name: 'all-in-one',
    nodes: allNodes,
    edges: allEdges
  };

  const handleLanguageChange = () => {
    setKey(prev => prev + 1); // 强制重新渲染组件
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#667eea',
          borderRadius: 12,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        },
        components: {
          Card: {
            borderRadiusLG: 16,
            boxShadowTertiary: '0 4px 16px rgba(0, 0, 0, 0.1)',
          },
          Menu: {
            itemBorderRadius: 12,
            itemMarginInline: 8,
            itemHeight: 56,
          },
          Button: {
            borderRadius: 12,
            controlHeight: 40,
          },
        },
      }}
    >
      <AppContainer key={key}>
        <StyledContent>
          <FlowDisplay flowData={superFlow} />
        </StyledContent>
      </AppContainer>
    </ConfigProvider>
  );
};

export default App;
