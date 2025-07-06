import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Card, Tag, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5);
  }
  100% {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  }
`;



const StyledCard = styled(Card)<{ status: string; isDragging?: boolean; isActive?: boolean }>`
  min-width: 180px;
  border-radius: 16px;
  transition: all 0.2s ease-out;
  border: none;
  overflow: hidden;
  position: relative;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  ${props => props.isDragging && css`
    transform: rotate(5deg) scale(1.05);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
    z-index: 1000;
  `}
  
  ${props => props.isActive && css`
    animation: ${pulse} 2s ease-in-out infinite;
    transform: scale(1.02);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 16px;
    z-index: -1;
  }
  
  ${props => {
    // 如果节点被激活，显示对应的颜色
    if (props.isActive) {
      switch (props.status) {
        case 'completed':
          return css`
            background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
            box-shadow: 0 8px 32px rgba(82, 196, 26, 0.3);
            color: white;
          `;
        case 'running':
          return css`
            background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
            box-shadow: 0 8px 32px rgba(24, 144, 255, 0.4);
            color: white;
          `;
        case 'failed':
          return css`
            background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
            box-shadow: 0 8px 32px rgba(255, 77, 79, 0.3);
            color: white;
          `;
        case 'processing':
          return css`
            background: linear-gradient(135deg, #faad14 0%, #ffc53d 100%);
            box-shadow: 0 8px 32px rgba(250, 173, 20, 0.3);
            color: white;
          `;
        default:
          return css`
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            color: white;
          `;
      }
    }
    
    // 默认状态：白色背景
    return css`
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      color: #666;
      border: 2px solid #e9ecef;
    `;
  }}

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .ant-card-body {
    padding: 20px;
    text-align: center;
  }
`;

const NodeIcon = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const NodeTitle = styled.div`
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const StatusTag = styled(Tag)`
  width: 100%;
  text-align: center;
  border-radius: 20px;
  margin-top: 12px;
  border: none;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 12px;
  height: auto;
  line-height: 1.4;
  
  &.ant-tag-success {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  &.ant-tag-processing {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  &.ant-tag-error {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  &.ant-tag-warning {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  &.ant-tag-default {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const DragIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transition: opacity 0.2s ease-out;
  
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'running':
      return 'processing';
    case 'failed':
      return 'error';
    case 'processing':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'status.completed';
    case 'running':
      return 'status.running';
    case 'failed':
      return 'status.failed';
    case 'processing':
      return 'status.processing';
    default:
      return 'status.pending';
  }
};

interface FlowNodeProps {
  data: {
    label: string;
    status: 'completed' | 'running' | 'pending' | 'failed' | 'processing';
    icon: string;
    description: string;
    isDragging?: boolean;
    isActive?: boolean;
  };
}

const FlowNode: React.FC<FlowNodeProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t(data.description)} placement="top">
      <StyledCard status={data.status} isDragging={data.isDragging} isActive={data.isActive} size="small">
        <Handle
          type="target"
          position={Position.Left}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            width: '12px',
            height: '12px'
          }}
        />
        
        <DragIndicator>⋮⋮</DragIndicator>
        
        <NodeIcon>{data.icon}</NodeIcon>
        <NodeTitle>{t(data.label) === data.label ? (data.label || t('nodes.custom')) : t(data.label)}</NodeTitle>
        
        <StatusTag color={getStatusColor(data.status)}>
          {t(getStatusText(data.status))}
        </StatusTag>

        <Handle
          type="source"
          position={Position.Right}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            width: '12px',
            height: '12px'
          }}
        />
      </StyledCard>
    </Tooltip>
  );
};

export default FlowNode; 