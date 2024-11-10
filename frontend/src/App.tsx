import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DealsListPage from './pages/DealsListPage';
import DealPage from './pages/DealPage';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<DealsListPage />} />
          <Route path="/deal/:id" element={<DealPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;