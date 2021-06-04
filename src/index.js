import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'styles/base.scss';
import { ErrorProvider, SearchProvider } from 'common/contexts';

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
