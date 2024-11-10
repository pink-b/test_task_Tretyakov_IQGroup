import React, { useState } from 'react';
import '../styles/DealPage.css';

interface IDeal {
  status: string;
  phoneNumber: string;
  budget: string;
  fullName: string;
  createdAt: string;
  comments: string[];
}

const DealPage: React.FC = () => {
  const [deals, setDeals] = useState<IDeal[]>([]); // Состояние для сделок
  const [formData, setFormData] = useState<Omit<IDeal, 'comments'>>({
    status: '',
    phoneNumber: '',
    budget: '',
    fullName: '',
    createdAt: '',
  });
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);

  const handleSave = () => {
    const newDeal: IDeal = {
      ...formData,
      comments,
    };
    setDeals([...deals, newDeal]);
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  const clearFields = () => {
    setFormData({
      status: '',
      phoneNumber: '',
      budget: '',
      fullName: '',
      createdAt: '',
    });
    setComments([]);
    setComment('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

        <div className="form-comments-container">
          <div className="form-section">
            <div className="form-field">
              <label>Статус</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Номер телефона</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Бюджет</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>ФИО</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Дата создания</label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="comment-section">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Введите комментарий"
            ></textarea>
            <div className="comments-list">
            {comments.map((c, index) => (
              <div key={index} className="comment-item">
                {c}
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className="action-buttons">
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={handleCancel}>Отменить</button>
          </div>
      </div>
    </div>
  );
};

export default DealPage;