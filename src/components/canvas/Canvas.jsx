import { forwardRef, useState, useEffect, useRef } from 'react';
import useViewport from 'hooks/useViewport';

const scaleWidth = 500;
const scaleHeight = 500;

function draw(canvas, scaleX, scaleY) {
    const context = canvas.getContext("2d");
    context.scale(scaleX, scaleY);
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // context.beginPath();
    // context.setLineDash([]);
    // context.lineWidth = 2;
    // context.strokeStyle = "red";
    // context.moveTo(0, 100);
    // context.lineTo(scaleWidth, 100);
    // context.moveTo(0, 400);
    // context.lineTo(scaleWidth, 400);
    // context.stroke();
    // context.lineWidth = 1;
    // context.strokeStyle = "blue";
    // context.fillStyle = "blue";
    // context.rect(200, 200, 100, 100);
    // context.fill();
    // context.closePath();
}

const PureCanvas = forwardRef(({id, ...props}, ref) => {
    return <canvas id={id || 'canvasOne'} ref={ref} {...props}/>;
});

const Canvas = ({id, ...props}) => {
    const canvasRef = useRef();
    const {width, height} = useViewport();
    const [canvasDims, setCanvasDims] = useState({ width: window.innerWidth, height: window.innerHeight});

    const [scale, setScale] = useState({ x: 1, y: 1 });

    const calculateScaleX = () => (!canvasRef.current ? 0 : canvasRef.current.clientWidth / scaleWidth);
    const calculateScaleY = () => (!canvasRef.current ? 0 : canvasRef.current.clientHeight / scaleHeight);

    const resized = () => {
        setCanvasDims({ width: width, height: height });

        setScale({ x: calculateScaleX(), y: calculateScaleY() });
    };

    useEffect(() => resized(), []);

    useEffect(() => {
        const currentCanvas = canvasRef.current;
        currentCanvas.addEventListener("resize", resized);
        return () => currentCanvas.removeEventListener("resize", resized);
    });

    useEffect(() => {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
    });

    useEffect(() => {
        if (canvasRef.current.getContext('2d')){
            draw(canvasRef.current, scale.x, scale.y);
        }
    }, [scale]);
    return (
        <canvas
            {...props}
            id={id}
            ref={canvasRef}
            style={{ width: "100%", height: "auto" }}

        />
    );
}

export default Canvas;
