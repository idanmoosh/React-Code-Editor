import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NoMatch } from './components/NoMatch';
import { Lobby } from './components/Lobby';
import { CodeEditor } from './components/CodeEditor';
import './styles/styles.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Lobby />} />
          <Route path='cases/:case' element={<CodeEditor />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
