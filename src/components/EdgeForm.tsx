import { useState, useEffect } from 'react';
import { Edge, Node } from 'reactflow';

interface EdgeFormProps {
  nodes: Node[];
  selectedEdge: Edge | null;
  onAddEdge: (source: string, target: string, type: string) => void;
  onDeleteEdge: (id: string) => void;
  onClose: () => void;
}

function EdgeForm({
  nodes,
  selectedEdge,
  onAddEdge,
  onDeleteEdge,
  onClose,
}: EdgeFormProps) {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [edgeType, setEdgeType] = useState('smoothstep');

  useEffect(() => {
    if (selectedEdge) {
      setSource(selectedEdge.source);
      setTarget(selectedEdge.target);
      setEdgeType(selectedEdge.type || 'smoothstep');
    } else {
      setSource('');
      setTarget('');
      setEdgeType('smoothstep');
    }
  }, [selectedEdge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEdge) {
      onAddEdge(source, target, edgeType);
    }
    setSource('');
    setTarget('');
    setEdgeType('smoothstep');
  };

  const handleDelete = () => {
    if (selectedEdge) {
      onDeleteEdge(selectedEdge.id);
    }
  };

  return (
    <div className="edge-form">
      <h3>{selectedEdge ? 'Edge Details' : 'Add Edge'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="source">Source Node:</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            disabled={!!selectedEdge}
            required
          >
            <option value="">Select source</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.data.label || node.id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="target">Target Node:</label>
          <select
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={!!selectedEdge}
            required
          >
            <option value="">Select target</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.data.label || node.id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="edgeType">Edge Type:</label>
          <select
            id="edgeType"
            value={edgeType}
            onChange={(e) => setEdgeType(e.target.value)}
            disabled={!!selectedEdge}
          >
            <option value="default">Default</option>
            <option value="smoothstep">Smooth Step</option>
            <option value="step">Step</option>
            <option value="straight">Straight</option>
          </select>
        </div>
        <div className="button-group">
          {!selectedEdge && (
            <button type="submit" className="btn-primary">
              Add Edge
            </button>
          )}
          {selectedEdge && (
            <button type="button" onClick={handleDelete} className="btn-danger">
              Delete Edge
            </button>
          )}
          <button type="button" onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EdgeForm;
