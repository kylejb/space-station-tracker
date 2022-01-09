import { useErrorContext } from 'common/hooks';

const Error = () => {
    const { error } = useErrorContext();

    return (
        <div className='text-right mt-2'>
            {error.message && (
                <span className='z-20 text-amber-800 border-amber-800 border-2 text-center font-basier rounded-md px-4 py-1'>
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default Error;
