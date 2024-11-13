import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DealPage.css';
import { updateCompleteDeal } from '../redux/features/dealsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IDeal } from '../redux/features/dealsSlice';
import { IComment, Status, Comment, selectDeals } from '../redux/features/dealsSlice';
import { RootState } from '../redux/store/store';

const DealPage: React.FC = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state: RootState) => selectDeals(state));
  const { dealId } = useParams<{ dealId: string }>();

  // const [deals, setDeals] = useState<IDeal[]>([]);
  const [formData, setFormData] = useState<Omit<IDeal, 'comments'>>({
    id: 0,
    title: '',
    status: 'Новый',
    phoneNumber: '',
    budget: 0,
    fullName: '',
    createdAt: new Date().toISOString(),
  });

  const idGenerator = (() => {
    console.log(deals)
    console.log(dealId)
    const comments = deals[Number(dealId)].comments
    const commentId: number = comments.length > 0 ? comments[comments.length - 1]!.id : -1;
    return commentId + 1;
});

  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  useEffect(() => {
    const hasChanges = Object.values(formData).some(value => value !== '') || comments.length > 0 || comment !== '';
    setIsFormDirty(hasChanges);
  }, [formData, comments, comment]);

  const handleAddComment = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  

  const handleCancel = () => {
    clearFields();
  };

  const clearFields = () => {
    setFormData({
      id: 0,
      title: '',
      status: 'Новый',
      phoneNumber: '',
      budget: 0,
      fullName: '',
      createdAt: new Date().toISOString(),
    });
    setComments([]);
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
    const newComment: IComment = {
      id: idGenerator(),
      dealId: Number(dealId),
      text: comment,
      createdAt: new Date().toISOString()
  };
  console.log(formData)
  console.log(newComment)
    const newDeal = {
      ...formData,
      comments: [...deals[Number(dealId)].comments, newComment]
    }
    console.log(newDeal)
    dispatch(updateCompleteDeal(newDeal))
    clearFields();
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
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Выберите статус</option>
              <option value="active">Активный</option>
              <option value="inactive">Неактивный</option>
              <option value="pending">В ожидании</option>
              <option value="completed">Завершен</option>
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
                {c}
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