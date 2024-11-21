import { useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    const location = useLocation();
    const isDealsListPage = location.pathname === '/';
    const headerText = isDealsListPage ? 'cделки' : 'Сделки';

    return (
        <div className="header">
            <h1 className="header-title">Заголовок</h1>
            <div className="header-right">{headerText}</div>
        </div>
    );
};

export default Header;