import React, { useEffect } from 'react';
import '../styles/AlertDialog.css'; // Подключите файл стилей

interface AlertDialogProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    message: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, handleClose, title, message }) => {
    if (!open) return null;

    // Закрытие диалога при нажатии клавиши "Escape"
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]);

    return (
        <div className="alert-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
            <div className="alert-dialog">
                <h2 id="dialog-title">{title}</h2>
                <p id="dialog-message">{message}</p>
                <button onClick={handleClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default AlertDialog;