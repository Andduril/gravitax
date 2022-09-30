import { useEffect, useRef } from "react";

const useCanvas = (draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void) => {
    const ref = useRef<HTMLCanvasElement>(null);

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        const { width, height } = canvas.getBoundingClientRect();

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio: ratio = 1 } = window;
            const ctx = canvas.getContext('2d');
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            ctx?.scale(ratio, ratio);
        }
    }

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let frameCount: number = 0;

        const render = () => {
            frameCount++;
            resizeCanvas(canvas);
            draw(ctx!, frameCount);
            animationId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationId)
        }
    }, [draw])

    return ref;
};

export default useCanvas;