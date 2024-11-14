import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DealPage.css';
import { updateCompleteDeal, updatePartialDeal, deleteDeal } from '../redux/features/dealsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IDeal } from '../redux/features/dealsSlice';
import { IComment, Status, Comment, selectDeals } from '../redux/features/dealsSlice';
import { RootState } from '../redux/store/store';
import { StatusBar } from '../components/StatusBar';

const DealPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deals = useSelector((state: RootState) => selectDeals(state));
  const { dealId } = useParams<{ dealId: string }>();
  const deal = deals.find(deal => deal.id === Number(dealId));

  if (!deal) {
    return (
      <div>
        <h2>Сделка не найдена</h2>
        <button onClick={() => navigate('/')}>Вернуться на главную</button>
      </div>
    );
  }
  const comments = (deal.comments || [])

  const [formData, setFormData] = useState<Omit<IDeal, 'comments'>>({
    id: deal.id,
    title: deal.title,
    status: deal.status,
    phoneNumber: deal.phoneNumber,
    budget: deal.budget,
    fullName: deal.fullName,
    createdAt: deal.createdAt,
  });

  const [comment, setComment] = useState<string>('');
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  useEffect(() => {
    const hasChanges = Object.values(formData).some(value => value !== '') || comments.length > 0 || comment !== '';
    setIsFormDirty(hasChanges);
  }, [formData, comment]);

  const handleCancel = () => {
    clearFields();
  };

  const clearFields = () => {
    setFormData({
      id: 0,
      title: '',
      status: 'new',
      phoneNumber: '',
      budget: 0,
      fullName: '',
      createdAt: new Date().toISOString(),
    });
    setComment('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as Status,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const updatedDeal: Partial<IDeal> = {};
  
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      const originalValue = deal[key as keyof IDeal];
  
      if (value !== originalValue) {
        if (value !== undefined) {
          updatedDeal[key as keyof IDeal] = value as any;
        }
      }
    });
  
    if (comment) {
      const newComment: IComment = {
        id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 0,
        dealId: Number(dealId),
        text: comment,
        createdAt: new Date().toISOString(),
      };
      updatedDeal.comments = [...comments, newComment];
    }
  
    dispatch(updatePartialDeal({ id: Number(dealId), ...updatedDeal }));
    setComment('');
    setIsFormDirty(false);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      dispatch(deleteDeal(Number(dealId)));
      navigate(`/`);
    }
  };

  return (
    <div className="container">
      <h1>Заголовок</h1>
      <div className="border-box">
        <div className="header">
          <h2>Тест (Название)</h2>
          <button className="delete-button" onClick={handleDelete}>Удалить</button>
        </div>
        <StatusBar status={deal.status} />
        <div className="form-comments-container">
          <div className="form-section">
          <div className="form-field">
            <label>Статус</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Выберите статус</option>
              <option value="new">Новый</option>
              <option value="in_progress">В работе</option>
              <option value="almost_done">Почти завершен</option>
              <option value="successful">Успешно</option>
              <option value="failed">Провал</option>
            </select>
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
                {c.text}
              </div>
            ))}
          </div>
          </div>
        </div>
        {isFormDirty && (
  <div className="action-buttons">
    <button onClick={handleSave}>Сохранить</button>
    <button onClick={handleCancel}>Отменить</button>
  </div>
)}
      </div>
    </div>
  );
};

export default DealPage;