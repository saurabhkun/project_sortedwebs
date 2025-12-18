import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Popup from './pages/Popup';
import Explore from './pages/Explore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorites" element={<Dashboard />} />
          <Route path="archives" element={<Dashboard />} />
        </Route>
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
