import React from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorProvider, SearchProvider } from '@common/contexts';

import App from './App';
import './index.css';

const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv!);
root.render(
    <React.StrictMode>
        <SearchProvider>
            <ErrorProvider>
                <App />
            </ErrorProvider>
        </SearchProvider>
    </React.StrictMode>,
);
