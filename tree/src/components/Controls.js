import React, { useState } from 'react';
import { dispatch, getState } from '../store/store';

const Controls = ({ disabled }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  const handleEditClick = () => {
    const state = getState();
    const selected = findNodeById(state.tree, state.selectedId);
    setTempName(selected?.name || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({ type: 'RENAME_NODE', payload: tempName });
    setIsEditing(false);
    setTempName('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempName('');
  };

  return (
    <div style={{ marginBottom: '20px', gap: 8, display: 'flex' }}>
        <button onClick={() => dispatch({ type: 'ADD_NODE' })}>Добавить</button>

        {!isEditing ? (
            <button onClick={handleEditClick} disabled={disabled}>Редактировать</button>
        ) : (
            <>
            <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                style={{ padding: '4px' }}
            />
            <button onClick={handleSave} disabled={!tempName.trim()}>Сохранить</button>
            <button onClick={handleCancel}>Отмена</button>
            </>
        )}

        <button onClick={() => dispatch({ type: 'DELETE_NODE' })} disabled={disabled}>Удалить</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button>
    </div>
  );
};

function findNodeById(nodes, id) {
    for (let node of nodes) {
        if (node.id === id) return node;
        const found = findNodeById(node.children, id);
        if (found) return found;
    }
    return null;
}

export default Controls;
