import styles from '../../styles/gallery.module.css';

export default function FavoritesBar({ items, favoriteIds }) {
  const favItems = items.filter(i => favoriteIds.includes(i.id));

  if (favItems.length === 0) return null;

  return (
    <div className={styles.favBar}>
      <span className={styles.favBarLabel}>❤️ Улюблені</span>

      <div className={styles.favBarItems}>
        {favItems.map(item => (
          item.photo ? (
            <img
              key={item.id}
              src={item.photo}
              alt={item.inventory_name}
              className={styles.favBarThumb}
              title={item.inventory_name}
            />
          ) : (
            <div key={item.id} className={styles.favBarThumbEmpty} title={item.inventory_name}>
              📦
            </div>
          )
        ))}
      </div>
    </div>
  );
}