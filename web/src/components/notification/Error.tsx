import { useErrorContext } from 'common/hooks';
import './style.scss';

const Error = () => {
    const { error } = useErrorContext();

    return (
        <div className={`error-${error.type}`}>
            <span>{error.message}</span>
        </div>
    );
};

export default Error;
