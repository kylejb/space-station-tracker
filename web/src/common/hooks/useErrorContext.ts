import { useContext } from 'react';

import { ErrorContext } from '@common/contexts/errors';

const useErrorContext = () => useContext(ErrorContext);

export default useErrorContext;
