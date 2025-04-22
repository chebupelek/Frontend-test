import React, { useEffect, useState } from 'react';
import Tree from './components/Tree';
import Controls from './components/Controls';
import { getState, subscribe } from './store/store';

function App() {
  const [store, setStore] = useState(getState());

  useEffect(() => {
    const unsubscribe = subscribe(setStore);
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px'}}>
      <div style={{ padding: 20, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '600px' }}>
        <h2 style={{ textAlign: 'center' }}>Tree</h2>
        <div style={{ textAlign: 'center' }}>Для того чтобы повзаимодействовать в веткой:</div>
        <div style={{ textAlign: 'center' }}>1. Нажмите на ветку</div>
        <div style={{ textAlign: 'center', paddingBottom: '40px' }}>2. Нажмите на кнопку операции</div>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <Tree data={store.tree} selectedId={store.selectedId} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Controls disabled={store.selectedId == null} />
        </div>
      </div>
    </div>
  );
}

export default App;
