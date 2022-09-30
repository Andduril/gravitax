import React from "react";
import useCanvas from "../../hooks/useCanvas";

type GameViewProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void,
    handleMouseDown?: () => void,
    handleMouseUp?: () => void,
};

const GameView: React.FC<GameViewProps> = ({ draw, ...props }) => {
    const ref = useCanvas(draw);

    return (
        <canvas
            style={props.style}
            ref={ref}
        ></canvas>
    )
};

export default GameView;