import { useNavigate } from 'react-router-dom';
import InventoryTable from '../components/inventory/InventoryTable';
import styles from '../styles/table.module.css';

export default function AdminInventory() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Склад інвентарю</div>
        <button className={styles.btn} onClick={() => navigate('/create')}>+ Додати товар</button>
      </div>
      <InventoryTable />
    </div>
  );
}