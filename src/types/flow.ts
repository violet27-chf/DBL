export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    status: 'completed' | 'running' | 'pending' | 'failed' | 'processing';
    icon: string;
    description: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface FlowData {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowMenu {
  key: string;
  label: string;
  icon: string;
  description: string;
} 