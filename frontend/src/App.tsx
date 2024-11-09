import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DealsListPage from './pages/DealsListPage';
import DealPage from './pages/DealPage';
import { Provider } from 'react-redux';
import {store} from './redux/store/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<DealsListPage />} />
          {/* <Route path="/deal/:id" element={<DealPage />} /> */}
          <Route path="/deal/:id" element={<DealPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;