import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DealsListPage from './pages/DealsListPage';
import DealPage from './pages/DealPage';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<DealsListPage />} />
          <Route path="/deal/:dealId" element={<DealPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;