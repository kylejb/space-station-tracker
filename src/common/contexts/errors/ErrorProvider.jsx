import { useState, useCallback } from 'react';
import ErrorContext from './ErrorContext';

const initialState = {
    type: null,
    message: null,
};


const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(initialState);

    const setErrorHelper = useCallback((arg) => {
        setError(arg);
    }, []);

    return (
        <ErrorContext.Provider value={{error, setErrorHelper}}>
            {children}
        </ErrorContext.Provider>
    );
}


export default ErrorProvider;
