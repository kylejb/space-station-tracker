import { createContext, useContext, useState } from 'react';

const initialState = {
    type: null,
    message: null,
};

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(initialState);

    const setErrorHelper = (arg) => {
        setError(arg);
    }

    return (
        <ErrorContext.Provider value={{error, setErrorHelper}}>
            {children}
        </ErrorContext.Provider>
    );
}

export const useErrorContext = () => useContext(ErrorContext);

export default ErrorProvider;
