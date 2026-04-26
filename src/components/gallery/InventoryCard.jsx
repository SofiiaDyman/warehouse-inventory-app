import styles from '../../styles/gallery.module.css';

export default function InventoryCard({ item, onQuickView, isFavorite, onToggleFavorite }) {
  function handleFavClick(e) {
    e.stopPropagation();
    onToggleFavorite(item.id);
  }

  return (
    <div className={styles.card} onClick={() => onQuickView(item)}>
      <div className={styles.imageWrapper}>
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.inventory_name}
            className={styles.cardImg}
            loading="lazy"
          />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span className={styles.imgPlaceholderIcon}>📦</span>
            <span>Фото відсутнє</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavClick}
          title={isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardName}>{item.inventory_name}</div>
        {item.description && (
          <div className={styles.cardDesc}>{item.description}</div>
        )}
      </div>
    </div>
  );
}