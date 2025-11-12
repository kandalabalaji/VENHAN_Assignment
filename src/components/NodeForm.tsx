import { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface NodeFormProps {
  selectedNode: Node | null;
  onAddNode: (label: string, x: number, y: number) => void;
  onUpdateNode: (id: string, label: string) => void;
  onDeleteNode: (id: string) => void;
  onClose: () => void;
}

function NodeForm({
  selectedNode,
  onAddNode,
  onUpdateNode,
  onDeleteNode,
  onClose,
}: NodeFormProps) {
  const [label, setLabel] = useState('');
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setPosX(selectedNode.position.x);
      setPosY(selectedNode.position.y);
    } else {
      setLabel('');
      setPosX(0);
      setPosY(0);
    }
  }, [selectedNode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode) {
      onUpdateNode(selectedNode.id, label);
    } else {
      onAddNode(label, posX, posY);
    }
    setLabel('');
    setPosX(0);
    setPosY(0);
  };

  const handleDelete = () => {
    if (selectedNode) {
      onDeleteNode(selectedNode.id);
    }
  };

  return (
    <div className="node-form">
      <h3>{selectedNode ? 'Edit Node' : 'Add Node'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="label">Label:</label>
          <input
            id="label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter node label"
            required
          />
        </div>
        {!selectedNode && (
          <>
            <div className="form-group">
              <label htmlFor="posX">Position X:</label>
              <input
                id="posX"
                type="number"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="posY">Position Y:</label>
              <input
                id="posY"
                type="number"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
              />
            </div>
          </>
        )}
        <div className="button-group">
          <button type="submit" className="btn-primary">
            {selectedNode ? 'Update' : 'Add'}
          </button>
          {selectedNode && (
            <button type="button" onClick={handleDelete} className="btn-danger">
              Delete
            </button>
          )}
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NodeForm;
