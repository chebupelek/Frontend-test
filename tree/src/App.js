import React, { useEffect, useState } from 'react';
import Tree from './components/Tree';
import Controls from './components/Controls';
import { getState, subscribe, dispatch } from './store/store';

function App() {
  const [store, setStore] = useState(getState());

  useEffect(() => {
    const unsubscribe = subscribe(setStore);
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', backgroundColor: '#f5f5f5', paddingTop: '40px'}}>
      <div style={{ padding: 20, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '600px' }}>
        <h2 style={{ textAlign: 'center' }}>Tree</h2>
        <h3 style={{ textAlign: 'center' }}>Для того чтобы повзаимодействовать в веткой:</h3>
        <h3 style={{ textAlign: 'center' }}>1. Нажмите на ветку</h3>
        <h3 style={{ textAlign: 'center' }}>2. Нажмите на кнопку использования операции</h3>
        <Tree data={store.tree} selectedId={store.selectedId} />
        <Controls disabled={store.selectedId == null} />
      </div>
    </div>
  );
}

export default App;
