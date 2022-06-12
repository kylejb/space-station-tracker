import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ErrorProvider, SearchProvider } from 'common/contexts';

import { ErrorProvider, SearchProvider } from '@common/contexts';

import App from './App';
import './index.css';

const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv!);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <ErrorProvider>
                    <App />
                </ErrorProvider>
            </SearchProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
