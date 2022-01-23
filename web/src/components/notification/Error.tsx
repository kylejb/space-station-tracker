import { useErrorContext } from 'common/hooks';

const Error = () => {
    const { message } = useErrorContext();

    return (
        <div className='text-right'>
            {message && (
                <span className='z-20 text-amber-800 border-amber-800 border-2 text-center font-basier rounded-md px-4 mt-4'>
                    {message}
                </span>
            )}
        </div>
    );
};

export default Error;
