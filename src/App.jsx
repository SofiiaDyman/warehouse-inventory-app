//інструменти для створення навігації без перезавантаження сторінки 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

//імпорти сторінок для користувача
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

export default function App() {
  return ( 
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          {/* адмінська частина */}
          <Route path="/" element={<AdminInventory />} />
          <Route path="/create" element={<AdminInventoryCreate />} />
          <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
          <Route path="/inventory/:id/edit" element={<AdminInventoryEdit />} />

          {/* Користувацька частина доступна за окремими посиланнями (Лаб 8) */}
          <Route path="/gallery" element={<Gallery />} /> 
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}
