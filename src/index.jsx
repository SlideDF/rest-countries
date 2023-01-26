import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import './index.css';
import Home from './pages/Home/Home';
import Info from './pages/Info/Info';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/:id`} element={<Info />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);