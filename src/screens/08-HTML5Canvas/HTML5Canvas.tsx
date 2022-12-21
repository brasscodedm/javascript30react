import React, { MouseEvent, useEffect, useRef, useState } from 'react';

export const HTML5Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [{ lineWidth, hue, lastX, lastY, direction }, setCanvasConfig] = useState({
    lineWidth: 100,
    hue: 1,
    lastX: 0,
    lastY: 0,
    direction: false,
  });

  const onDraw = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !ctx) {
      return;
    }

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    ctx.fill();
    ctx.moveTo(lastX, lastY);
    ctx.lineWidth = lineWidth;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setCanvasConfig(prevState => ({
      ...prevState,
      hue: hue >= 360 ? 0 : prevState.hue + 1,
      lineWidth: prevState.lineWidth + (direction ? 1 : -1),
      lastX: offsetX,
      lastY: offsetY,
      direction:
        (ctx.lineWidth >= 100 && direction) || (ctx.lineWidth <= 1 && !direction)
          ? !prevState.direction
          : prevState.direction,
    }));
  };

  const startDraw = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setCanvasConfig(prevState => ({
      ...prevState,
      lastX: offsetX,
      lastY: offsetY,
    }));
  };

  const stopDraw = () => {
    if (ctx) {
      ctx.closePath();
    }
    setDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCtx(canvas.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
    }
  }, [ctx]);

  return (
    <canvas
      onMouseMove={onDraw}
      onMouseDown={startDraw}
      onMouseUp={stopDraw}
      onMouseOut={stopDraw}
      ref={canvasRef}
    />
  );
};
