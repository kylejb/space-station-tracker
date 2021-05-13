import { useState, useCallback } from 'react';
import ErrorContext from './ErrorContext';

// TODO - refactor logic to flatten error to contain only msg
const initialState = {
    type: null,
    message: null,
};


const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(initialState);

    const removeError = () => setError({ type: false, message: false });

    const addError = (message, status) => setError({ message, status });

    const contextValue = {
        error,
        addError: useCallback((message, status) => addError(message, status), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
}


export default ErrorProvider;
