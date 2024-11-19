import React from 'react';
import { Status } from '../redux/features/dealsSlice';

interface IStatusProps {
    status: Status;
}

export const StatusBar: React.FC<IStatusProps> = ({ status }) => {
    let width: string;
    let backgroundColor: string;

    switch (status) {
        case 'new':
            width = '23%';
            backgroundColor = 'rgb(210, 154, 0)';
            break;
        case 'in_progress':
            width = '45%';
            backgroundColor = 'rgb(202, 202, 0)';
            break;
        case 'almost_done':
            width = '68%';
            backgroundColor = 'rgb(105, 210, 0)';
            break;
        case 'successful':
            width = '100%';
            backgroundColor = 'rgb(0, 201, 7)';
            break;
        case 'failed':
            width = '100%';
            backgroundColor = 'rgb(237, 0, 0)';
            break;
        default:
            width = '0%';
            backgroundColor = 'transparent';
            break;
    }

    return (
        <div className="status-section">
            <span>Статус</span>
            <div className="progress-bar" style={{ backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ width, backgroundColor, height: '20px' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <span>{status}</span>
            </div>
        </div>
    );
};