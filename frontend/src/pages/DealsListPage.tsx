import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/DealsListPage.css'
import AlertDialog from '../components/AlertDialog'

const DealsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  // const handleCreateButtonClick = () => {
  //   setOpen(!open)
  // }

  return (
    <div className="deals-container">
    <h1>Сделки</h1>
  
    <button className="create-button" onClick={handleClickOpen}>Создать</button>
    

    <div className="filter-buttons">
      <button className="filter-button">Все</button>
      <button className="filter-button">Архив</button>
    </div>
    
 
    <table className="deals-table">
      <thead>
        <tr>
          <th className="table-header">ID</th>
          <th className="table-header">Название</th>
          <th className="table-header">Статус</th>
          <th className="table-header">Дата создания</th>
          <th className="table-header"></th>
          <th className="table-header"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-cell">1</td>
          <td className="table-cell">Сделка 1</td>
          <td className="table-cell">Новый</td>
          <td className="table-cell">2023-10-01</td>
          <td className="table-cell"><button>Редактировать</button></td>
          <td className="table-cell"><button>Удалить</button></td>
        </tr>
      </tbody>
    </table>
    <AlertDialog 
                open={open} 
                handleClose={handleClose} 
                title="Внимание!" 
                message="Это ваше сообщение." 
            />
  </div>
  );
};

export default DealsListPage;