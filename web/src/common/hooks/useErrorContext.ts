import { ErrorContext } from 'common/contexts/errors';
import { useContext } from 'react';

const useErrorContext = () => useContext(ErrorContext);

export default useErrorContext;
