import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from './redux/rootReducer';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
);


