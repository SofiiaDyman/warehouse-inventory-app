import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import { deleteInventory } from '../../services/inventoryApi';
import ConfirmModal from './ConfirmModal';
import styles from '../../styles/table.module.css';

export default function InventoryTable() {
  const { items, loading, error, fetchItems } = useInventory();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  async function handleDelete() {
    await deleteInventory(deleteId);
    setDeleteId(null);
    fetchItems();
  }

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (error)   return <div className={styles.errorMsg}>Помилка: {error}</div>;
  if (!items.length) return <div className={styles.empty}>Інвентар порожній</div>;

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Фото</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.inventory_name}</td>
              <td>{item.description || '—'}</td>
              <td>
                {item.photo
                  ? <img src={item.photo} alt={item.inventory_name} className={styles.thumb} />
                  : <div className={styles.noPhoto}>Немає фото</div>
                }
              </td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.btnSecondary} onClick={() => navigate(`/inventory/${item.id}`)}>
                    Переглянути
                  </button>
                  <button className={styles.btnSecondary} onClick={() => navigate(`/inventory/${item.id}/edit`)}>
                    Редагувати
                  </button>
                  <button className={styles.btnDanger} onClick={() => setDeleteId(item.id)}>
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <ConfirmModal
          message="Ви впевнені, що хочете видалити цей товар?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}