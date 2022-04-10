import { useErrorContext } from 'common/hooks';

const Error = () => {
    const { message } = useErrorContext();

    return (
        <>
            {message && (
                <div className='text-left mt-5'>
                    <span className='z-20 flex justify-center text-emerald-600 border-emerald-600 border-2 font-basier rounded-md py-2 px-4'>
                        {message}
                    </span>
                </div>
            )}
        </>
    );
};

export default Error;
