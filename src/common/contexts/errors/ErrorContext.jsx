import { createContext } from 'react';

const defaultValue = {
    type: null,
    message: null,
};

const ErrorContext = createContext(defaultValue);

export default ErrorContext;
