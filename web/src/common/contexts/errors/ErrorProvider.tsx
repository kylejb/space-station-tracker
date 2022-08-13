import { useState, useCallback, ReactNode } from 'react';

import ErrorContext from './ErrorContext';

const initialState = {
    type: '',
    message: '',
};

type Props = {
    children: ReactNode;
};

function ErrorProvider({ children }: Props): JSX.Element {
    const [error, setError] = useState(initialState);

    const removeError = () => setError({ type: '', message: '' });

    const addError = (message, type) => setError({ message, type });

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        type: error.type,
        message: error.message,
        addError: useCallback((message, type) => addError(message, type), []),
        removeError: useCallback(() => removeError(), []),
    };

    return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
}

export default ErrorProvider;
