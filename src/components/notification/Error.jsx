import { useErrorContext } from 'common/hooks';

import './style.scss'

const Error = () => {
    const { error } = useErrorContext();

    return (
        <>
            <div className={`error-${error.type}`}>
                <h1>{error.message}</h1>
            </div>
        </>
    )
}

export default Error
