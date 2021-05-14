import { useState, useCallback } from 'react';
import ErrorContext from './ErrorContext';

const initialState = {
    type: null,
    message: null,
};


const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(initialState);

    const removeError = () => setError({ type: false, message: false });

    const addError = (message, type) => setError({ message, type });

    const contextValue = {
        error,
        addError: useCallback((message, type) => addError(message, type), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
}


export default ErrorProvider;
