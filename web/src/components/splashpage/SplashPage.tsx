const SplashPage = ({ splashHider }) => {
    return (
        <div className='w-full h-full overflow-hidden cursor-pointer' onClick={() => splashHider()}>
            <div
                className='fixed w-full h-full left-0 top-0 bg-cover bg-center animate-fade-in'
                style={{
                    backgroundImage: `url(splash.jpeg)`,
                }}
            ></div>
            <div className='z-40 flex flex-col text-stone-50 animate-fade-in'>
                <h1 className='z-20 font-garet text-4xl ml-5 mt-5 md:text-left md:ml-20 md:mt-20'>
                    Where is the ISS?
                </h1>
                <h2 className='z-20 w-96 font-basier text-xl text-left ml-5 mt-5 md:ml-20'>
                    Track the position of the International Space Station in real time and search
                    for when you can see it in the sky!
                </h2>
                <span className='z-20 fixed bottom-8 right-8 font-basier text-base animate-custom-pulse'>
                    Click to enter
                </span>
                <span className='z-20 fixed bottom-8 left-8 font-basier text-base'>
                    <em>⚠️ Best experienced on desktop.</em>
                </span>
            </div>
        </div>
    );
};

export default SplashPage;
