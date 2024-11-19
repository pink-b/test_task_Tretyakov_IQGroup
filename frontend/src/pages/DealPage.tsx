import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DealPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { IDeal } from '../redux/features/dealsSlice';
import { IComment, selectDeals } from '../redux/features/dealsSlice';
import { StatusBar } from '../components/StatusBar';
import { deleteDealAsyncAction, fetchDealsById } from '../redux/asyncActions/dealsAsyncActions';
import { AppDispatch } from '../redux/store/store';
import { updateExistingDeal } from '../redux/asyncActions/dealsAsyncActions';

const DealPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deals = useSelector(selectDeals);
  const navigate = useNavigate();
  const { dealId } = useParams<{ dealId: string }>();

  useEffect(() => {
    if (dealId) {
      dispatch(fetchDealsById(Number(dealId)));
    }
  }, [dispatch, dealId]);

  const deal = deals.find(deal => deal.id === Number(dealId));

  if (!deal) {
    return (
      <div>
        <h2>Сделка не найдена</h2>
        <button onClick={() => navigate('/')}>Вернуться на главную</button>
      </div>
    );
  }

  const comments = (deal.comments || []);
  const [originalData, setOriginalData] = useState<Omit<IDeal, 'comments'>>(deal);
  const [formData, setFormData] = useState<Omit<IDeal, 'comments'>>(deal);
  const [comment, setComment] = useState<string>('');
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  
  // State to manage edit mode for each field
  const [editModes, setEditModes] = useState({
    status: false,
    phoneNumber: false,
    budget: false,
    fullName: false,
    createdAt: false,
  });

  useEffect(() => {
    const hasChanges = Object.keys(formData).some(key => formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]) || comment !== '';
    setIsFormDirty(hasChanges);
  }, [formData, comment, originalData]);

  const handleCancel = () => {
    resetForm();
    setEditModes({
      status: false,
      phoneNumber: false,
      budget: false,
      fullName: false,
      createdAt: false,
    });
  };

  const resetForm = () => {
    setFormData(originalData);
    setComment('');
    setIsFormDirty(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedDeal: Partial<IDeal> = { ...formData };

    if (comment) {
      const newComment: IComment = {
        id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 0,
        dealId: Number(dealId),
        text: comment,
        createdAt: new Date().toISOString(),
      };
      updatedDeal.comments = [...comments, newComment];
    }

    try {
      await dispatch(updateExistingDeal({ ...deal, ...updatedDeal }));
      resetForm();
      setEditModes({
        status: false,
        phoneNumber: false,
        budget: false,
        fullName: false,
        createdAt: false,
      });
    } catch (error) {
      console.error('Ошибка при обновлении сделки:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      try {
        await dispatch(deleteDealAsyncAction(Number(dealId)));
        navigate(`/`);
      } catch (error) {
        console.error('Ошибка при удалении сделки:', error);
      }
    }
  };

  const toggleEditMode = (field: keyof typeof editModes) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [field]: !prevModes[field],
    }));
  };

  return (
    <div className="container">
      <div className="border-box">
        <div className="deal-header">
          <h2>{deal.title}</h2>
          <button className="delete-button" onClick={handleDelete}>Удалить</button>
        </div>
        <StatusBar status={deal.status} />
        <div className="form-comments-container">
          <div className="form-section">
            <div className="form-field">
              <div className='form-field-title-container'>
                <label>Статус</label>
                <button type="button" className="edit-button" onClick={() => toggleEditMode('status')}>
                  {editModes.status ? 'Отменить' : 'Изменить'}
                </button>
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-background"
                disabled={!editModes.status} // Доступность поля
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
              <div className='form-field-title-container'>
                <label>Номер телефона</label>
                <button type="button" className="edit-button" onClick={() => toggleEditMode('phoneNumber')}>
                  {editModes.phoneNumber ? 'Отменить' : 'Изменить'}
                </button>
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-background"
                disabled={!editModes.phoneNumber} // Доступность поля
              />
            </div>
            <div className="form-field">
              <div className='form-field-title-container'>
                <label>Бюджет</label>
                <button type="button" className="edit-button" onClick={() => toggleEditMode('budget')}>
                  {editModes.budget ? 'Отменить' : 'Изменить'}
                </button>
              </div>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="input-background"
                disabled={!editModes.budget} // Доступность поля
              />
            </div>
            <div className="form-field">
              <div className='form-field-title-container'>
                <label>ФИО</label>
                <button type="button" className="edit-button" onClick={() => toggleEditMode('fullName')}>
                  {editModes.fullName ? 'Отменить' : 'Изменить'}
                </button>
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input-background"
                disabled={!editModes.fullName} // Доступность поля
              />
            </div>
            <div className="form-field">
              <div className='form-field-title-container'>
                <label>Дата создания</label>
                <button type="button" className="edit-button" onClick={() => toggleEditMode('createdAt')}>
                  {editModes.createdAt ? 'Отменить' : 'Изменить'}
                </button>
              </div>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className="input-background"
                disabled={!editModes.createdAt} // Доступность поля
              />
            </div>
          </div>

          <div className="comment-section">
            <div className="comments-input-section">
              <h3 className="comments-header">Комментарий</h3>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите комментарий"
                className="comments-input"
              />
            </div>
            <div className="comment-list-section">
              <div className="comments-list">
                {comments.map((c, index) => (
                  <div key={index} className="comment-item">
                    {c.text}
                  </div>
                ))}
              </div>
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