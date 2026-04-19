import { useNavigate } from 'react-router-dom';
import styles from '../../styles/details.module.css';

export default function InventoryDetails({ item }) {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Деталі товару</div>
      <div className={styles.card}>
        {item.photo
          ? <img src={item.photo} alt={item.inventory_name} className={styles.img} />
          : <div className={styles.noPhoto}>Фото відсутнє</div>
        }
        <div className={styles.name}>{item.inventory_name}</div>
        <div className={styles.desc}>{item.description || 'Опис відсутній'}</div>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Назад до списку</button>
      </div>
    </div>
  );
}