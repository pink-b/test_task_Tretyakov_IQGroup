import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { addDeal, Deal } from '../redux/features/dealsSlice';
import '../styles/AlertDialog.css';

interface AlertDialogProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose, title, message }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const deals = useSelector((state: RootState) => state.deals.deals);

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
        setInputValue('')
        handleClose()
    }

    const idGenerator = (() => {
        const dealId: number = deals.length > 0 ? deals[deals.length - 1]!.id : -1;
        return dealId + 1;
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Валидация
        if (inputValue.trim().length < 2) {
            setError('Минимум 2 символа');
            return;
        }

        // Создание нового объекта Deal
        const newDeal = new Deal(
            
                idGenerator(),
                inputValue,
                'new',
                new Date().toISOString(),
            
        );

        // Добавление новой сделки
        dispatch(addDeal(newDeal));
        handleClose();
        setInputValue('')
    };

    return (
        <div className="alert-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
            <div className="alert-dialog">
                <h2 id="dialog-title">{title}</h2>
                <p id="dialog-message">{message}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Введите значение"
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Сохранить</button>
                </form>
                <button onClick={handleCloseDialog}>Закрыть</button>
            </div>
        </div>
    );
};

export default AlertDialog;