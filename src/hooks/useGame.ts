import { useContext } from "react";
import { Astra } from "../utils/Astra";
import GameContext from "../utils/GameContext";

const useGame = () => {
    const gameStatus = useContext(GameContext);

    const addAstra = (x: number, y: number, vx: number, vy: number) => {
        gameStatus.setAstras([...gameStatus.astras, new Astra(x, y, gameStatus.fixed, gameStatus.mass, gameStatus.color, gameStatus.radius, vx, vy)]);
    }

    const reset = () => {
        gameStatus.setAstras([]);
    }

    return {addAstra, reset};
};

export default useGame;