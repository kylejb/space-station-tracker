import { useRef } from 'react';

const Canvas = (props) => {
    const canvasRef = useRef();

    return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
