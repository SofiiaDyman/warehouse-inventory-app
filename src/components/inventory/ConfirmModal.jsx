import styles from '../../styles/modal.module.css';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.title}>Підтвердження</div>
        <div className={styles.text}>{message}</div>
        <div className={styles.row}>
          <button className={styles.btnCancel} onClick={onCancel}>Скасувати</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Видалити</button>
        </div>
      </div>
    </div>
  );
}