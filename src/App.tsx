import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
} from 'reactflow';
import { Plus } from 'lucide-react';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import initialMetadata from './metadata.json';

const STORAGE_KEY = 'diagram-flow-data';

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'node' | 'edge'>('node');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedData);
      setNodes(savedNodes);
      setEdges(savedEdges);
    } else {
      setNodes(initialMetadata.nodes);
      setEdges(initialMetadata.edges);
    }
  }, []);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    []
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      setSelectedEdge(null);
      setActiveTab('node');
      setSidebarOpen(true);
    },
    []
  );

  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setSelectedEdge(edge);
      setSelectedNode(null);
      setActiveTab('edge');
      setSidebarOpen(true);
    },
    []
  );

  const handleAddNode = (label: string, x: number, y: number) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'default',
      position: { x, y },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(null);
    setSidebarOpen(false);
  };

  const handleUpdateNode = (id: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
    setSelectedNode(null);
    setSidebarOpen(false);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
    setSelectedNode(null);
    setSidebarOpen(false);
  };

  const handleAddEdge = (source: string, target: string, type: string) => {
    const newEdge: Edge = {
      id: `edge-${Date.now()}`,
      source,
      target,
      type,
    };
    setEdges((eds) => [...eds, newEdge]);
    setSelectedEdge(null);
    setSidebarOpen(false);
  };

  const handleDeleteEdge = (id: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
    setSelectedEdge(null);
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const handleTabChange = (tab: 'node' | 'edge') => {
    setActiveTab(tab);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  return (
    <div className="app-container">
      <div className="diagram-container">
        <Diagram
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
        />
        <button className="fab" onClick={handleOpenSidebar} title="Add Node/Edge">
          <Plus size={24} />
        </button>
      </div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        activeTab={activeTab}
        nodes={nodes}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        onAddNode={handleAddNode}
        onUpdateNode={handleUpdateNode}
        onDeleteNode={handleDeleteNode}
        onAddEdge={handleAddEdge}
        onDeleteEdge={handleDeleteEdge}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default App;
