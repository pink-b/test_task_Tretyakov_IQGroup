import React from 'react';
import { Status} from'../redux/features/dealsSlice'; 

interface IStatusProps {
    status: Status;
}

export const StatusBar: React.FC<IStatusProps> = ({ status }) => {
    let width: string;
    let backgroundColor: string;

    switch (status) {
        case 'new':
            width = '10%';
            backgroundColor = 'gray';
            break;
        case 'in_progress':
            width = '50%';
            backgroundColor = 'blue';
            break;
        case 'almost_done':
            width = '75%';
            backgroundColor = 'orange';
            break;
        case 'successful':
            width = '100%';
            backgroundColor = 'green';
            break;
        case 'failed':
            width = '0%';
            backgroundColor = 'red';
            break;
        default:
            width = '0%';
            backgroundColor = 'transparent';
            break;
    }

    return (
        <div className="status-section">
            <span>Статус: {status}</span>
            <div className="progress-bar" style={{ backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ width, backgroundColor, height: '20px' }}></div>
            </div>
        </div>
    );
};
