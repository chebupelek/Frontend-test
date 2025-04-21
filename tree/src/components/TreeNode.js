import React from 'react';
import { dispatch } from '../store/store';

function TreeNode({ node, selectedId }) {
    const isSelected = node.id === selectedId;
  
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'SELECT_NODE', payload: node.id });
            }}
            style={{marginLeft: '20px', marginBottom: '8px', padding: '5px', border: isSelected ? '1px solid blue' : '1px solid gray', borderRadius: '4px', cursor: 'pointer', backgroundColor: isSelected ? '#e0f0ff' : '#fff', }}
        >
        <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>{node.name}</div>
            {node.children.map((child) => (
                <TreeNode key={child.id} node={child} selectedId={selectedId} />
            ))}
        </div>
    );
  }

export default TreeNode;
