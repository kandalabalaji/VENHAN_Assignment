import { Node, Edge } from 'reactflow';
import { X } from 'lucide-react';
import NodeForm from './NodeForm';
import EdgeForm from './EdgeForm';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'node' | 'edge';
  nodes: Node[];
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onAddNode: (label: string, x: number, y: number) => void;
  onUpdateNode: (id: string, label: string) => void;
  onDeleteNode: (id: string) => void;
  onAddEdge: (source: string, target: string, type: string) => void;
  onDeleteEdge: (id: string) => void;
  onTabChange: (tab: 'node' | 'edge') => void;
}

function Sidebar({
  isOpen,
  onClose,
  activeTab,
  nodes,
  selectedNode,
  selectedEdge,
  onAddNode,
  onUpdateNode,
  onDeleteNode,
  onAddEdge,
  onDeleteEdge,
  onTabChange,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Diagram Editor</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <div className="sidebar-tabs">
        <button
          className={`tab ${activeTab === 'node' ? 'active' : ''}`}
          onClick={() => onTabChange('node')}
        >
          Nodes
        </button>
        <button
          className={`tab ${activeTab === 'edge' ? 'active' : ''}`}
          onClick={() => onTabChange('edge')}
        >
          Edges
        </button>
      </div>
      <div className="sidebar-content">
        {activeTab === 'node' && (
          <NodeForm
            selectedNode={selectedNode}
            onAddNode={onAddNode}
            onUpdateNode={onUpdateNode}
            onDeleteNode={onDeleteNode}
            onClose={onClose}
          />
        )}
        {activeTab === 'edge' && (
          <EdgeForm
            nodes={nodes}
            selectedEdge={selectedEdge}
            onAddEdge={onAddEdge}
            onDeleteEdge={onDeleteEdge}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
