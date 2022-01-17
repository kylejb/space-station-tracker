import './index.css';

import { ErrorProvider, SearchProvider } from 'common/contexts';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <SearchProvider>
            <ErrorProvider>
                <App />
            </ErrorProvider>
        </SearchProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
