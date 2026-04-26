import { useEffect } from 'react';
import styles from '../../styles/gallery.module.css';

export default function InventoryQuickView({ item, isFavorite, onToggleFavorite, onClose }) {
  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.qvOverlay} onClick={handleOverlayClick}>
      <div className={styles.qvModal}>
        <button className={styles.qvClose} onClick={onClose}>✕</button>

        {item.photo ? (
          <img
            src={item.photo}
            alt={item.inventory_name}
            className={styles.qvImg}
          />
        ) : (
          <div className={styles.qvNoImg}>📦</div>
        )}

        <div className={styles.qvBody}>
          <div className={styles.qvName}>{item.inventory_name}</div>
          <div className={styles.qvDesc}>
            {item.description || 'Опис відсутній'}
          </div>

          <div className={styles.qvFooter}>
            <button
              className={`${styles.qvFavBtn} ${isFavorite ? styles.active : ''}`}
              onClick={() => onToggleFavorite(item.id)}
            >
              {isFavorite ? '❤️ В улюблених' : '🤍 До улюблених'}
            </button>
            <button className={styles.qvCloseFooter} onClick={onClose}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}