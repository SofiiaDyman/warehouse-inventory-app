import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

export default function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                     element={<AdminInventory />} />
          <Route path="/create"               element={<AdminInventoryCreate />} />
          <Route path="/inventory/:id"        element={<AdminInventoryDetails />} />
          <Route path="/inventory/:id/edit"   element={<AdminInventoryEdit />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}