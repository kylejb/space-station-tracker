import { createContext } from 'react';

const defaultState = {
    type: '',
    message: '',
    addError: (message, type) => null,
    removeError: () => null,
};

interface IErrorContext {
    type: string;
    message: string;
    addError: (message, type) => void;
    removeError: () => void;
}

const ErrorContext = createContext<IErrorContext>(defaultState);

export default ErrorContext;
