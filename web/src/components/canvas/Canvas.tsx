import { type JSX, useRef } from 'react';

function Canvas(props: any): JSX.Element {
    const canvasRef = useRef(undefined);

    return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
