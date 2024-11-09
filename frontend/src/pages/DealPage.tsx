import React from 'react';
import { useState } from 'react';
import '../styles/DealPage.css';

const DealPage = () => {
    const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');

  const handleAddComment = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="container">
      <h1>Заголовок</h1>
      <div className="border-box">
        <div className="header">
          <h2>Тест (Название)</h2>
          <button className="delete-button">Удалить</button>
        </div>
        
        <div className="status-section">
          <span>Статус</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-field">
            <label>Статус</label>
            <input type="text" />
            <button>Изменить</button>
          </div>
          <div className="form-field">
            <label>Номер телефона</label>
            <input type="text" />
            <button>Изменить</button>
          </div>
          <div className="form-field">
            <label>Бюджет</label>
            <input type="text" />
            <button>Изменить</button>
          </div>
          <div className="form-field">
            <label>ФИО</label>
            <input type="text" />
            <button>Изменить</button>
          </div>
          <div className="form-field">
            <label>Дата создания</label>
            <input type="date" />
            <button>Изменить</button>
          </div>
        </div>

        <div className="comment-section">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введите комментарий"
          ></textarea>
          <button onClick={handleAddComment}>Добавить комментарий</button>
        </div>

        <div className="comments-list">
          {comments.map((c, index) => (
            <div key={index} className="comment-item">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealPage;