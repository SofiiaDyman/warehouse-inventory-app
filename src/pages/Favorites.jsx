import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventory } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import styles from '../styles/gallery.module.css';

export default function Favorites() {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [quickItem, setQuickItem] = useState(null);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    getInventory()
      .then(setAllItems)
      .finally(() => setLoading(false));
  }, []);

  const favItems = allItems.filter(i => favorites.includes(i.id));

  return (
    <div className={styles.page}>
      <div className={styles.favPageHeader}>
        <button className={styles.backBtn} onClick={() => navigate('/gallery')}>
          ← Назад до галереї
        </button>
        <h1 className={styles.favPageTitle}>
          Мої <span>улюблені</span>
        </h1>
      </div>

      <div className={styles.grid}>
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonImg} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
          </div>
        ))}

        {!loading && favItems.length === 0 && (
          <div className={styles.stateBox}>
            <div className={styles.stateIcon}>💔</div>
            <div className={styles.stateTitle}>Список порожній</div>
            <div className={styles.stateText}>
              Натисніть ❤️ на картці, щоб додати товар до улюблених
            </div>
            <button className={styles.retryBtn} onClick={() => navigate('/gallery')}>
              До галереї
            </button>
          </div>
        )}

        {!loading && favItems.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onQuickView={setQuickItem}
          />
        ))}
      </div>

      {quickItem && (
        <InventoryQuickView
          item={quickItem}
          isFavorite={isFavorite(quickItem.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setQuickItem(null)}
        />
      )}
    </div>
  );
}