import React, { MouseEvent, useEffect, useRef, useState } from 'react';

let direction = true;

export const HTML5Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  // const [direction, setDirection] = useState(true);
  const [{ lastX, lastY }, setLastPosition] = useState({ lastX: 0, lastY: 0 });
  const [{ lineWidth, hue }, setCanvasConfig] = useState({ lineWidth: 100, hue: 1 });

  const onDraw = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current) {
      return;
    }

    if (ctx) {
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      ctx.beginPath();
      ctx.fill();
      ctx.moveTo(lastX, lastY);
      ctx.lineWidth = lineWidth;

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      setLastPosition({ lastX: offsetX, lastY: offsetY });

      setCanvasConfig(prevState => ({
        ...prevState,
        hue: prevState.hue + 1,
      }));

      if (hue >= 360) {
        setCanvasConfig(prevState => ({
          ...prevState,
          hue: 0,
        }));
      }

      if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        console.log(ctx.lineWidth, ctx.lineWidth, direction);

        direction = !direction;
      }

      if (direction) {
        setCanvasConfig(prevState => ({
          ...prevState,
          lineWidth: prevState.lineWidth + 1,
        }));
      } else {
        setCanvasConfig(prevState => ({
          ...prevState,
          lineWidth: prevState.lineWidth - 1,
        }));
      }
    }
  };

  const startDraw = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setLastPosition({ lastX: offsetX, lastY: offsetY });
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