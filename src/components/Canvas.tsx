import React, { useState } from "react";
import useCanvas from "../hooks/useCanvas";
import useGame from "../hooks/useGame";

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void,
    handleMouseDown?: () => void,
    handleMouseUp?: () => void,
};

const Canvas: React.FC<CanvasProps> = ({ draw, ...props }) => {

    const game = useGame();
    const ref = useCanvas(draw);

    const [mousePress, setMousePress] = useState<{x: number, y: number} | null>(null);
    const [drag, setDrag] = useState<boolean>(false);

    const handleMouseDown = (x: number, y: number) => {
        setMousePress({x,y});
        setDrag(true);
    }

    const handleMouseUp = (x: number, y: number) => {
        if(drag) {
            game.addAstra(mousePress!.x, mousePress!.y, (x - mousePress!.x) / 100, (y - mousePress!.y) / 100);
            setDrag(false);
        }
    }

    return (
        <canvas
            style={props.style}
            ref={ref}
            onMouseDown={(event) => handleMouseDown(event.clientX, event.clientY)}
            onMouseUp={(event) => handleMouseUp(event.clientX, event.clientY)}
        ></canvas>
    )
};

export default Canvas;