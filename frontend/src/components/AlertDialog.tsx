import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { addDeal, Deal,  } from '../redux/features/dealsSlice';
import '../styles/AlertDialog.css';
import { createNewDeal } from '../redux/asyncActions/dealsAsyncActions';
import { AppDispatch } from '../redux/store/store';

interface AlertDialogProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose, title, message }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const deals = useSelector((state: RootState) => state.deals.deals);
    const loading = useSelector((state: RootState) => state.deals.loading);
    const serverError = useSelector((state: RootState) => state.deals.error);

    // Закрытие диалога при нажатии клавиши "Escape"
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
                setInputValue('')
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]);

    if (!open) return null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError('');
    };

    const handleCloseDialog = () => {
        setInputValue('');
        handleClose();
    };

    const idGenerator = (() => {
        const dealId: number = deals.length > 0 ? deals[deals.length - 1]!.id : -1;
        return dealId + 1;
    });

    const handleClick = async () => {

        // Валидация
        if (inputValue.trim().length < 2) {
            setError('Минимум 2 символа');
            return;
        }

        // Создание нового объекта Deal
        const newDeal: Deal = {
            id: idGenerator(),
            title: inputValue,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await dispatch(createNewDeal(newDeal));

        if (serverError) {
            setError(serverError);
            return;
        }

        handleClose();
        setInputValue('');
    };

    return (
        <div className="alert-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
            <div className="alert-dialog">
                <h2 id="dialog-title" className="dialog-title">{title}</h2>
                <p id="dialog-message" className="dialog-message">{message}</p>
                <form>
                    <input
                    className="alert-dialog-input"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Введите название"
                        disabled={loading}
                    />
                    {error && <div className="error">{error}</div>}
                </form>
                <button type="submit" disabled={loading} className="alert-dialog-save-button" onClick={handleClick}>Создать</button>
                <button onClick={handleCloseDialog} disabled={loading} className="alert-dialog-cancel-button">Отмена</button>
                {loading && <div className="loading">Сохранение...</div>}
            </div>
        </div>
    );
};

export default AlertDialog;