import { useRef } from 'react';

function Canvas(props: any): JSX.Element {
    const canvasRef = useRef();

    return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
