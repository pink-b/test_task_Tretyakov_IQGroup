import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/DealsListPage.css';
import AlertDialog from '../components/AlertDialog';
import { selectDeals, selectLoading, selectError } from '../redux/features/dealsSlice'
import { fetchAllDeals } from '../redux/asyncActions/dealsAsyncActions';
import { AppDispatch } from '../redux/store/store';

const DealsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'archive'>('all'); // Состояние для фильтрации
  // const deals = useSelector((state: RootState) => state.deals.deals);
  const dispatch = useDispatch<AppDispatch>();
  const deals = useSelector(selectDeals);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const statusTranslations: { [key: string]: string } = {
    new: 'Новый',
    in_progress: 'В работе',
    almost_done: 'Почти завершен',
    successful: 'Успешно',
    failed: 'Провал'
};

  useEffect(() => {
    dispatch(fetchAllDeals());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleRowClick = (id: number) => {
    navigate(`/deal/${id}`);
  };

  const filteredDeals = deals.filter(deal => deal.status === 'successful' || deal.status === 'failed');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (filterType: 'all' | 'archive') => {
    setFilter(filterType);
  };

  const displayedDeals = filter === 'archive' ? filteredDeals : deals;

  return (
    <div className="deals-container">
      <div className='main-content'>
      <button className="create-button" onClick={handleClickOpen}>Создать</button>

<div className="filter-buttons">
  <button className="filter-button-save" onClick={() => handleFilterChange('all')}>Все</button>
  <button className="filter-button-archive" onClick={() => handleFilterChange('archive')}>Архив</button>
</div>

<table className="deals-table">
  <thead>
    <tr>
      <th className="table-header-id">ID</th>
      <th className="table-header-title">Название</th>
      <th className="table-header-status">Статус</th>
      <th className="table-header-date">Дата создания</th>
    </tr>
  </thead>
  <tbody>
    {displayedDeals.map(deal => (
      <tr key={deal.id} onClick={() => handleRowClick(deal.id)} style={{ cursor: 'pointer' }}>
        <td className="table-cell">{deal.id}</td>
        <td className="table-cell">{deal.title}</td>
        <td className="table-cell">{statusTranslations[deal.status]}</td>
        <td className="table-cell">
            {new Date(deal.updatedAt).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
        </td>
      </tr>
    ))}
  </tbody>
</table>
<AlertDialog 
  open={open}
  handleClose={handleClose}
  title="Создать сделку"
  message="название"
/>
        </div>

      
    </div>
  );
};

export default DealsListPage;