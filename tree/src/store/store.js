let state = {
    tree: [{ id: 1, name: 'Node 1', children: [] }],
    selectedId: null,
    idCounter: 2,
  };
  
  let listeners = [];
  
  export const getState = () => state;
  
  export const subscribe = (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  };
  
    export const dispatch = (action) => {
        switch (action.type) {
        case 'SELECT_NODE':
            state = { ...state, selectedId: action.payload };
            break;

        case 'ADD_NODE':
            const newNode = {
                id: state.idCounter,
                name: `Node ${state.idCounter}`,
                children: [],
            };

            const addNode = (nodes) =>
                nodes.map((node) => {
                    if (node.id === state.selectedId) 
                    {
                        return {...node, children: [...node.children, newNode],};
                    }
                    return { ...node, children: addNode(node.children) };
            });

            state = {
                ...state,
                tree: addNode(state.tree),
                idCounter: state.idCounter + 1,
            };
            break;

        case 'RENAME_NODE':
            const renameNode = (nodes) =>
                nodes.map((node) => {
                    if (node.id === state.selectedId) 
                    {
                        return { ...node, name: action.payload };
                    }
                        return { ...node, children: renameNode(node.children) };
                });
                
            state = { ...state, tree: renameNode(state.tree) };
            break;

        case 'DELETE_NODE':
            const deleteNode = (nodes) =>
            nodes
                .filter((node) => node.id !== state.selectedId)
                .map((node) => ({
                    ...node,
                    children: deleteNode(node.children),
                }));
            state = {
                ...state,
                tree: deleteNode(state.tree),
                selectedId: null,
            };
            break;

        case 'RESET':
            state = {
                tree: [{ id: 1, name: 'Node 1', children: [] }],
                selectedId: null,
                idCounter: 2,
            };
            break;
        }
    
        listeners.forEach((cb) => cb(state));
  };
  