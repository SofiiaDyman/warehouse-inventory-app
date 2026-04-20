import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInventory, updateInventory, updateInventoryPhoto } from '../../services/inventoryApi';
import styles from '../../styles/form.module.css';

export default function InventoryForm({ initial = null, mode = 'create' }) {
  const navigate = useNavigate();
  const [name, setName]   = useState(initial?.inventory_name || '');
  const [desc, setDesc]   = useState(initial?.description || '');
  const [photo, setPhoto] = useState(null);       // файл для create
  const [newPhoto, setNewPhoto] = useState(null); // файл для edit/photo
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Назва обов'язкова";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);

    try {
      if (mode === 'create') {
        // multipart/form-data
        const fd = new FormData();
        fd.append('inventory_name', name.trim());
        fd.append('description', desc.trim());
        if (photo) fd.append('photo', photo);
        await createInventory(fd);

      } else {
        // Частина 1: PUT /inventory/:id — JSON
        await updateInventory(initial.id, {
          inventory_name: name.trim(),
          description:    desc.trim(),
        });

        // Частина 2: PUT /inventory/:id/photo — multipart/form-data (тільки якщо обрали файл)
        if (newPhoto) {
          const fd = new FormData();
          fd.append('photo', newPhoto);
          await updateInventoryPhoto(initial.id, fd);
        }
      }

      navigate('/');
    } catch (err) {
      alert('Помилка: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {mode === 'create' ? 'Додати товар' : 'Редагувати товар'}
      </div>

      <form onSubmit={handleSubmit}>

        {/* Назва */}
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

        {/* Опис */}
        <div className={styles.field}>
          <label className={styles.label}>Опис</label>
          <textarea
            className={styles.textarea}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Короткий опис товару..."
          />
        </div>

        {/* Фото при створенні */}
        {mode === 'create' && (
          <div className={styles.field}>
            <label className={styles.label}>Фото</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setPhoto(e.target.files[0] || null)}
            />
            {photo && <div className={styles.hint}>Обрано: {photo.name}</div>}
          </div>
        )}

        <div className={styles.btnRow}>
          <button type="submit" className={styles.btnSubmit} disabled={saving}>
            {saving ? 'Збереження...' : mode === 'create' ? 'Додати' : 'Зберегти текст'}
          </button>
          <button type="button" className={styles.btnCancel} onClick={() => navigate('/')}>
            Скасувати
          </button>
        </div>
      </form>

      {/* Блок оновлення фото — тільки при редагуванні, окремо від форми тексту */}
      {mode === 'edit' && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Оновити фото (незалежно від тексту)</div>
          {initial?.photo && (
            <img
              src={`http://localhost:3002${initial.photo}`}
              alt="поточне фото"
              className={styles.currentPhoto}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setNewPhoto(e.target.files[0] || null)}
          />
          {newPhoto && <div className={styles.hint}>Обрано: {newPhoto.name}</div>}
          <button
            type="button"
            className={styles.btnSubmit}
            style={{ marginTop: 12 }}
            disabled={!newPhoto || saving}
            onClick={async () => {
              if (!newPhoto) return;
              setSaving(true);
              try {
                const fd = new FormData();
                fd.append('photo', newPhoto);
                await updateInventoryPhoto(initial.id, fd);
                navigate('/');
              } catch (err) {
                alert('Помилка: ' + err.message);
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'Завантаження...' : 'Оновити фото'}
          </button>
        </div>
      )}
    </div>
  );
}