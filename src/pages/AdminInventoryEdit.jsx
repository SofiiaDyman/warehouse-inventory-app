import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInventoryById } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getInventoryById(id).then(setItem);
  }, [id]);

  if (!item) return <div style={{ padding: 24 }}>Завантаження...</div>;
  return <InventoryForm mode="edit" initial={item} />;
}