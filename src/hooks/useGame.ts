import { useContext } from "react";
import { Astra } from "../utils/Astra";
import AstraContext from "../utils/AstraContext";
import GameContext from "../utils/GameContext";

const useGame = () => {
    const astrasStatus = useContext(AstraContext);
    const gameStatus = useContext(GameContext);

    const addAstra = (x: number, y: number, vx: number, vy: number) => {
        astrasStatus.setAstras([...astrasStatus.astras, new Astra(x, y, gameStatus.fixed, gameStatus.mass, gameStatus.color, gameStatus.radius, vx, vy, gameStatus.name)]);
    };

    const removeAstra = (astra: Astra) => {
        let astras = astrasStatus.astras.filter((value) => value !== astra);
        astrasStatus.setAstras(astras);
    };

    const reset = () => {
        astrasStatus.setAstras([]);
    };

    const togglePause = () => {
        astrasStatus.togglePause();
    };

    return {addAstra, reset, togglePause, removeAstra};
};

export default useGame;