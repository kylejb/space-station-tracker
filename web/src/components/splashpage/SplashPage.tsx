import { useViewport } from 'common/hooks';

// TODO: Add animations
const SplashPage = ({ splashHider }) => {
    const { width, height } = useViewport();
    return (
        <div className='w-full h-full overflow-hidden cursor-pointer' onClick={() => splashHider()}>
            <img
                alt='ISS orbiting Earth'
                className='fixed left-0 top-0 bg-cover bg-center delay-150 animate-fade-in'
                style={{
                    backgroundImage: `url(splash.jpeg)`,
                    height,
                    width,
                }}
            ></img>
            <div className='z-40 flex flex-col text-stone-50 delay-50 animate-fade-in'>
                <h1 className='z-20 font-garet text-4xl'>Where is the ISS?</h1>
                <h2 className='z-20 w-96 font-basier text-xl text-justify'>
                    Track the position of the International Space Station in real time and search
                    for when you can see it in the sky!
                </h2>
                <span className='z-20 fixed bottom-2 right-2 font-basier text-base animate-pulse'>
                    Click to enter
                </span>
                <span className='z-20 fixed bottom-2 left-2 font-basier text-base'>
                    <em>⚠️ Best experienced on desktop.</em>
                </span>
            </div>
        </div>
    );
};

export default SplashPage;
// transition duration-150 ease-in-out
