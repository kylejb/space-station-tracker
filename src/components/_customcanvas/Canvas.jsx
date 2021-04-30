// import { useEffect, forwardRef, useRef } from 'react';
// import useViewport from 'hooks/useViewport';


// function draw(ctx) {
//     const canvas = ctx.canvas;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     requestAnimationFrame(() => draw(ctx));
// }

// // const PureCanvas = forwardRef((props, ref) => <canvas id='canvasOne' ref={ref}></canvas>);


// const Canvas = ({ id, className, ...props}) => {
//     const { width, height } = useViewport();
//     const canvasRef = useRef();

//     useEffect(() => {
//       const ctx = canvasRef.current.getContext("2d");
//       requestAnimationFrame(() => draw(ctx));

//       const handleResize = e => {
//         ctx.canvas.height = window.innerHeight;
//         ctx.canvas.width = window.innerWidth;
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);

//       return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     console.log("im being rendered");

//     // return < ref={canvasRef} />;
//     // return (
//     //     <canvas
//     //         id={id}
//     //         className={className || 'canvasOne'}
//     //         width={width}
//     //         height={height}
//     //         {...props}
//     //     />
//     // );
// }

// export default Canvas;
