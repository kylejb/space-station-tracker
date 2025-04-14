import { type JSX, useRef } from 'react';

function Canvas(props: Record<string, unknown>): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
