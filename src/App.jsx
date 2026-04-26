//інструменти для створення навігації без перезавантаження сторінки 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Імпортує компонент-обгортку, 
//який забезпечує доступ до даних про товари (список, функції завантаження) для всіх вкладених компонентів
import { InventoryProvider } from './store/InventoryContext';
//Завантажує сторінку зі списком усіх товарів 
import AdminInventory from './pages/AdminInventory';
//Завантажує сторінку з формою для створення нового товару
import AdminInventoryCreate from './pages/AdminInventoryCreate';
//Завантажує сторінку для редагування існуючого товару
import AdminInventoryEdit from './pages/AdminInventoryEdit';
//Завантажує сторінку для перегляду детальної інформації про товар
import AdminInventoryDetails from './pages/AdminInventoryDetails';

import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

export default function App() {
  return ( //Самий верхній рівень: робить глобальний стан (дані інвентарю) доступним для всіх сторінок і компонентів всередині
    <InventoryProvider>
      {/* Налаштовує маршрутизацію: визначає, яка сторінка (компонент) повинна відображатися для кожного URL-шляху */}
      <BrowserRouter>
      {/* Контейнер, який переглядає всі вкладені Route і вибирає лише один, що найкраще відповідає поточному шляху (URL):
          "/" - головна сторінка зі списком товарів (AdminInventory)
          "/create" - сторінка для створення нового товару (AdminInventoryCreate)
          "/inventory/:id" - сторінка з деталями товару, де :id відповідає ID товару (AdminInventoryDetails)
          "/inventory/:id/edit" - сторінка для редагування товару з певним ID (AdminInventoryEdit) */}
        <Routes>
{/* Повертаємо адмінку на головний шлях "/", щоб перевірити чи все працює */}
{/* Адмінка залишається головною (Лаб 7) */}
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
