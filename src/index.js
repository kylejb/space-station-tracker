import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from 'app/store';
import App from 'app';
import 'styles/base.scss';
// import { ErrorProvider, SearchProvider } from 'common/contexts';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
