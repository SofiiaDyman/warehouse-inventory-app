import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInventory } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import styles from '../styles/gallery.module.css';

export default function Gallery() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  async function fetchItems() {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>Inventory System</div>
          <h1 className={styles.pageTitle}>
            Галерея <span>інвентарю</span>
          </h1>
        </div>

        <div className={styles.headerRight}>
          <Link className={styles.favLink} to="/favorites">
            ❤️ Улюблені
            <span className={styles.favCount}>{favorites.length}</span>
          </Link>
        </div>
      </header>

      <InventoryGallery
        items={items}
        loading={loading}
        error={error}
        onRetry={fetchItems}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}