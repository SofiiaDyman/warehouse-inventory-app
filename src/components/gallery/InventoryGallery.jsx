import { useState } from 'react';
import InventoryCard from './InventoryCard';
import InventoryQuickView from './InventoryQuickView';
import styles from '../../styles/gallery.module.css';

export default function InventoryGallery({ items, loading, error, onRetry, isFavorite, onToggleFavorite }) {
  const [quickItem, setQuickItem] = useState(null);

  const visibleItems = items;

  return (
    <>
      <div className={styles.grid}>
        {/* Skeleton loading */}
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonImg} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
          </div>
        ))}

        {/* Error state */}
        {!loading && error && (
          <div className={styles.stateBox}>
            <div className={styles.stateIcon}>⚠️</div>
            <div className={styles.stateTitle}>Помилка завантаження</div>
            <div className={styles.stateText}>{error}</div>
            <button className={styles.retryBtn} onClick={onRetry}>
              Спробувати знову
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visibleItems.length === 0 && (
          <div className={styles.stateBox}>
            <div className={styles.stateIcon}>📦</div>
            <div className={styles.stateTitle}>Інвентар порожній</div>
            <div className={styles.stateText}>
              Додайте перший товар через адмін-панель
            </div>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && visibleItems.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={onToggleFavorite}
            onQuickView={setQuickItem}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickItem && (
        <InventoryQuickView
          item={quickItem}
          isFavorite={isFavorite(quickItem.id)}
          onToggleFavorite={onToggleFavorite}
          onClose={() => setQuickItem(null)}
        />
      )}
    </>
  );
}