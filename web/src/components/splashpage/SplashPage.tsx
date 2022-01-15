import { useViewport } from 'common/hooks';
import './style.scss';

const SplashPage = ({ splashHider }) => {
    const { width, height } = useViewport();

    return (
        <div id='splashwrapper' onClick={() => splashHider()}>
            <h1>Where is the ISS?</h1>
            <p>
                Track the position of the International Space Station in real time and search for
                when you can see it in the sky!
            </p>
            <h2>Click to enter</h2>
            <span>*For best experience, use on desktop.</span>
            <div id='splashimagewrapper' style={{ width: width, height: height }}>
                <img
                    src='https://images-assets.nasa.gov/image/0201587/0201587~orig.jpg'
                    alt='ISS over earth'
                ></img>
            </div>
        </div>
    );
};

export default SplashPage;
