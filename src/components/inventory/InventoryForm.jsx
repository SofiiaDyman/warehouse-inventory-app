import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInventory, updateInventory, updateInventoryPhoto } from '../../services/inventoryApi';
import styles from '../../styles/form.module.css';

export default function InventoryForm({ initial = null, mode = 'create' }) {
  const navigate = useNavigate();
  const [name, setName]         = useState(initial?.inventory_name || '');
  const [desc, setDesc]         = useState(initial?.description || '');
  const [photoPath, setPhotoPath] = useState('');
  const [errors, setErrors]     = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Назва обов'язкова";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (mode === 'create') {
      await createInventory({
        inventory_name: name.trim(),
        description: desc.trim(),
        photo: photoPath.trim() || null,
      });
    } else {
      // Частина 1 — текстові дані
      await updateInventory(initial.id, {
        inventory_name: name.trim(),
        description: desc.trim(),
      });
      // Частина 2 — фото (окремо, тільки якщо введено новий шлях)
      if (photoPath.trim()) {
        await updateInventoryPhoto(initial.id, photoPath.trim());
      }
    }
    navigate('/');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {mode === 'create' ? 'Додати товар' : 'Редагувати товар'}
      </div>
      <form onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label className={styles.label}>Назва *</label>
          <input
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Наприклад: Ноутбук Dell XPS 15"
          />
          {errors.name && <div className={styles.errText}>{errors.name}</div>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Опис</label>
          <textarea
            className={styles.textarea}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Короткий опис товару..."
          />
        </div>

        {mode === 'create' && (
          <div className={styles.field}>
            <label className={styles.label}>Шлях до фото</label>
            <input
              className={styles.input}
              value={photoPath}
              onChange={e => setPhotoPath(e.target.value)}
              placeholder="/images/laptop-dell.jpg"
            />
            <div className={styles.hint}>Файл повинен лежати в папці public/images/</div>
          </div>
        )}

        {mode === 'edit' && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Оновити фото (окремо від тексту)</div>
            <input
              className={styles.input}
              value={photoPath}
              onChange={e => setPhotoPath(e.target.value)}
              placeholder="/images/new-photo.jpg"
            />
            <div className={styles.hint}>Залиш порожнім, щоб не змінювати фото</div>
          </div>
        )}

        <div className={styles.btnRow}>
          <button type="submit" className={styles.btnSubmit}>
            {mode === 'create' ? 'Додати' : 'Зберегти'}
          </button>
          <button type="button" className={styles.btnCancel} onClick={() => navigate('/')}>
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}