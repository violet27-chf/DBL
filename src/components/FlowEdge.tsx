import React from 'react';
import { getBezierPath } from 'react-flow-renderer';
import styled, { keyframes, css } from 'styled-components';

const flowAnimation = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -30;
  }
`;

const glowAnimation = keyframes`
  0% {
    filter: drop-shadow(0 0 4px rgba(24, 144, 255, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(24, 144, 255, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 4px rgba(24, 144, 255, 0.6));
  }
`;



const StyledPath = styled.path<{ isActive: boolean }>`
  stroke: ${props => props.isActive ? 'url(#flowGradient)' : '#667eea'};
  stroke-width: 3;
  fill: none;
  stroke-dasharray: ${props => props.isActive ? '10,5' : '0'};
  ${props => props.isActive && css`
    animation: ${flowAnimation} 2s linear infinite, ${glowAnimation} 1.5s ease-in-out infinite;
  `}
  transition: all 0.3s ease-out;
`;

interface FlowEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: any;
  targetPosition?: any;
  style?: any;
  markerEnd?: string;
  data?: {
    isActive?: boolean;
  };
}

const FlowEdge: React.FC<FlowEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isActive = data?.isActive || false;

  return (
    <>
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667eea" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#1890ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#667eea" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <StyledPath
        d={edgePath}
        isActive={isActive}
        style={style}
      />
    </>
  );
};

export default FlowEdge; 