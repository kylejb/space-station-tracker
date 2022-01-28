import { useState, useCallback, FC } from 'react';

import ErrorContext from './ErrorContext';

const initialState = {
    type: '',
    message: '',
};

const ErrorProvider: FC = ({ children }) => {
    const [error, setError] = useState(initialState);

    const removeError = () => setError({ type: '', message: '' });

    const addError = (message, type) => setError({ message, type });

    const contextValue = {
        type: error.type,
        message: error.message,
        addError: useCallback((message, type) => addError(message, type), []),
        removeError: useCallback(() => removeError(), []),
    };

    return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
};

export default ErrorProvider;
