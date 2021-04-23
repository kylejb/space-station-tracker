import { forwardRef } from 'react';
import useViewport from 'common/hooks/useViewport';
import './style.scss';


const Canvas = forwardRef(({ id, ...props }, ref) => {
    const {width, height} = useViewport();

    return (
        <div className="canvas-wrapper" width={width} height={height} style={{ position: "fixed" }}>
            <canvas
                id={id}
                ref={ref}
                style={{ width: "100%", height: "100%" }}
            >Your browser does not support HTML5 Canvas.</canvas>
        </div>
    );
});

Canvas.displayName = "Canvas";

export default Canvas;
