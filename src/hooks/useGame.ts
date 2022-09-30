import { useContext } from "react";
import { Astra } from "../utils/Astra";
import AstraContext from "../utils/AstraContext";
import GameContext from "../utils/GameContext";

const useGame = () => {
    const astras = useContext(AstraContext);
    const gameStatus = useContext(GameContext);

    const addAstra = (x: number, y: number, vx: number, vy: number) => {
        astras.setAstras([...astras.astras, new Astra(x, y, gameStatus.fixed, gameStatus.mass, gameStatus.color, gameStatus.radius, vx, vy)]);
    }

    const reset = () => {
        astras.setAstras([]);
    }

    return {addAstra, reset};
};

export default useGame;