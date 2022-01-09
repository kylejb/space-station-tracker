import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorProvider, SearchProvider } from 'common/contexts';

import App from './App';
import './index.css';

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
