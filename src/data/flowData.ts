import { FlowData, FlowNode, FlowEdge } from '../types/flow';

// 数据采集流程
export const dataCollectionFlow: FlowData = {
  id: 'dataCollection',
  name: 'dataCollection',
  nodes: [
    {
      id: '1',
      type: 'dataSource',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.dataSource',
        status: 'completed',
        icon: '📊',
        description: 'descriptions.dataCollection'
      }
    },
    {
      id: '2',
      type: 'dataIngestion',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.dataIngestion',
        status: 'running',
        icon: '📥',
        description: 'descriptions.dataCollection'
      }
    },
    {
      id: '3',
      type: 'dataCleaning',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.dataCleaning',
        status: 'pending',
        icon: '🧹',
        description: 'descriptions.dataProcessing'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

// 数据处理流程
export const dataProcessingFlow: FlowData = {
  id: 'dataProcessing',
  name: 'dataProcessing',
  nodes: [
    {
      id: '1',
      type: 'dataTransformation',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.dataTransformation',
        status: 'completed',
        icon: '🔄',
        description: 'descriptions.dataProcessing'
      }
    },
    {
      id: '2',
      type: 'dataValidation',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.dataValidation',
        status: 'running',
        icon: '✅',
        description: 'descriptions.dataProcessing'
      }
    },
    {
      id: '3',
      type: 'etlProcess',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.etlProcess',
        status: 'pending',
        icon: '⚙️',
        description: 'descriptions.dataProcessing'
      }
    },
    {
      id: '4',
      type: 'dataModeling',
      position: { x: 700, y: 100 },
      data: { 
        label: 'nodes.dataModeling',
        status: 'pending',
        icon: '🏗️',
        description: 'descriptions.dataProcessing'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false },
    { id: 'e3-4', source: '3', target: '4', animated: false }
  ]
};

// 数据存储流程
export const dataStorageFlow: FlowData = {
  id: 'dataStorage',
  name: 'dataStorage',
  nodes: [
    {
      id: '1',
      type: 'dataWarehouse',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.dataWarehouse',
        status: 'completed',
        icon: '🏢',
        description: 'descriptions.dataStorage'
      }
    },
    {
      id: '2',
      type: 'dataLake',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.dataLake',
        status: 'running',
        icon: '🌊',
        description: 'descriptions.dataStorage'
      }
    },
    {
      id: '3',
      type: 'dataMart',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.dataMart',
        status: 'pending',
        icon: '🏪',
        description: 'descriptions.dataStorage'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

// 数据分析流程
export const dataAnalysisFlow: FlowData = {
  id: 'dataAnalysis',
  name: 'dataAnalysis',
  nodes: [
    {
      id: '1',
      type: 'statisticalAnalysis',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.statisticalAnalysis',
        status: 'completed',
        icon: '📈',
        description: 'descriptions.dataAnalysis'
      }
    },
    {
      id: '2',
      type: 'predictiveAnalysis',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.predictiveAnalysis',
        status: 'running',
        icon: '🔮',
        description: 'descriptions.dataAnalysis'
      }
    },
    {
      id: '3',
      type: 'reportGeneration',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.reportGeneration',
        status: 'pending',
        icon: '📋',
        description: 'descriptions.dataAnalysis'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

// 数据可视化流程
export const dataVisualizationFlow: FlowData = {
  id: 'dataVisualization',
  name: 'dataVisualization',
  nodes: [
    {
      id: '1',
      type: 'dashboard',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.dashboard',
        status: 'completed',
        icon: '📊',
        description: 'descriptions.dataVisualization'
      }
    },
    {
      id: '2',
      type: 'chartVisualization',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.chartVisualization',
        status: 'running',
        icon: '📊',
        description: 'descriptions.dataVisualization'
      }
    },
    {
      id: '3',
      type: 'mapVisualization',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.mapVisualization',
        status: 'pending',
        icon: '🗺️',
        description: 'descriptions.dataVisualization'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

// 机器学习流程
export const machineLearningFlow: FlowData = {
  id: 'machineLearning',
  name: 'machineLearning',
  nodes: [
    {
      id: '1',
      type: 'modelTraining',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.modelTraining',
        status: 'completed',
        icon: '🤖',
        description: 'descriptions.machineLearning'
      }
    },
    {
      id: '2',
      type: 'modelEvaluation',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.modelEvaluation',
        status: 'running',
        icon: '📊',
        description: 'descriptions.machineLearning'
      }
    },
    {
      id: '3',
      type: 'modelDeployment',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.modelDeployment',
        status: 'pending',
        icon: '🚀',
        description: 'descriptions.machineLearning'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

// 实时处理流程
export const realTimeProcessingFlow: FlowData = {
  id: 'realTimeProcessing',
  name: 'realTimeProcessing',
  nodes: [
    {
      id: '1',
      type: 'streamProcessing',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.streamProcessing',
        status: 'running',
        icon: '⚡',
        description: 'descriptions.realTimeProcessing'
      }
    },
    {
      id: '2',
      type: 'monitoring',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.monitoring',
        status: 'running',
        icon: '👁️',
        description: 'descriptions.realTimeProcessing'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true }
  ]
};

// 批量处理流程
export const batchProcessingFlow: FlowData = {
  id: 'batchProcessing',
  name: 'batchProcessing',
  nodes: [
    {
      id: '1',
      type: 'batchJob',
      position: { x: 100, y: 100 },
      data: { 
        label: 'nodes.batchJob',
        status: 'completed',
        icon: '📦',
        description: 'descriptions.batchProcessing'
      }
    },
    {
      id: '2',
      type: 'scheduling',
      position: { x: 300, y: 100 },
      data: { 
        label: 'nodes.scheduling',
        status: 'running',
        icon: '⏰',
        description: 'descriptions.batchProcessing'
      }
    },
    {
      id: '3',
      type: 'monitoring',
      position: { x: 500, y: 100 },
      data: { 
        label: 'nodes.monitoring',
        status: 'pending',
        icon: '👁️',
        description: 'descriptions.batchProcessing'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: false }
  ]
};

export const allFlows = {
  dataCollection: dataCollectionFlow,
  dataProcessing: dataProcessingFlow,
  dataStorage: dataStorageFlow,
  dataAnalysis: dataAnalysisFlow,
  dataVisualization: dataVisualizationFlow,
  machineLearning: machineLearningFlow,
  realTimeProcessing: realTimeProcessingFlow,
  batchProcessing: batchProcessingFlow
}; 