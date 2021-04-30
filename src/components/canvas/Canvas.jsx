import useViewport from 'hooks/useViewport';
import './style.scss';


const Canvas = ({id, ...props}) => {
    const {width, height} = useViewport();

    return (
        <div class="canvas-wrapper" width={width} height={height} style={{ position: "fixed" }}>
            <canvas
                id={id}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}

export default Canvas;
