import React from 'react';
import TreeNode from './TreeNode';

const Tree = ({ data, selectedId }) => {
    return (
        <div style={{ width: '100%' }}>{data.map(node => (<TreeNode key={node.id} node={node} selectedId={selectedId} />))}</div>
    );
};

export default Tree;
