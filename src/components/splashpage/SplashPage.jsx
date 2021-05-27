import './style.scss';
import { useViewport } from 'common/hooks';


const SplashPage = ({splashHider}) => {

    const { width, height } = useViewport();

    return (
        <div id="splashwrapper" onClick={() => {splashHider()}} style ={{width: {width}, height:{height}}}>
            <h1>Where is the ISS?</h1>
            <p>Track the position of the International Space Station in real time and search for when you can see it in the sky next!</p>
            <h2>Click to enter</h2>
            <img src="https://images-assets.nasa.gov/image/0201587/0201587~orig.jpg" style ={{width: {width}, height:{height}}}></img>
        
        </div>
    )
}

export default SplashPage
