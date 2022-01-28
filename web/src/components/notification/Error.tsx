import { useErrorContext } from 'common/hooks';

const Error = () => {
    const { message } = useErrorContext();

    return (
        <>
            {message && (
                <div className='text-right mt-5'>
                    <span className='z-20 text-emerald-600 border-emerald-600 border-2 text-center font-basier rounded-md py-2 px-4'>
                        {message}
                    </span>
                </div>
            )}
        </>
    );
};

export default Error;
