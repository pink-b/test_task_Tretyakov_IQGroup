import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
import '../styles/DealsListPage.css';
import AlertDialog from '../components/AlertDialog';

const DealsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'archive'>('all'); // Состояние для фильтрации
  const deals = useSelector((state: RootState) => state.deals.deals);

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
      <h1>Сделки</h1>

      <button className="create-button" onClick={handleClickOpen}>Создать</button>

      <div className="filter-buttons">
        <button className="filter-button" onClick={() => handleFilterChange('all')}>Все</button>
        <button className="filter-button" onClick={() => handleFilterChange('archive')}>Архив</button>
      </div>

      <table className="deals-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Название</th>
            <th className="table-header">Статус</th>
            <th className="table-header">Дата создания</th>
          </tr>
        </thead>
        <tbody>
          {displayedDeals.map(deal => (
            <tr key={deal.id} onClick={() => handleRowClick(deal.id)} style={{ cursor: 'pointer' }}>
              <td className="table-cell">{deal.id}</td>
              <td className="table-cell">{deal.title}</td>
              <td className="table-cell">{deal.status}</td>
              <td className="table-cell">{deal.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDialog 
        open={open}
        handleClose={handleClose}
        title="Создать сделку"
        message="Название"
      />
    </div>
  );
};

export default DealsListPage;