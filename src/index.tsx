import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ErrorProvider, SearchProvider } from 'common/contexts';

import 'styles/base.scss';

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
