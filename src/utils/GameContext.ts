import React from "react";
import { Astra } from "./Astra";

export interface GameData {
    pause: boolean;
    mass: number;
    radius: number;
    color: string;
    fixed: boolean;
    astras: Astra[];

    togglePause: () => void;
    setMass: (mass: number) => void;
    setRadius: (radius: number) => void;
    setColor: (color: string) => void;
    toggleFixed: () => void;
    setAstras: React.Dispatch<React.SetStateAction<Astra[]>>;
}

export const defaultGameState: GameData = {
    pause: false,
    mass: 25,
    radius: 25,
    color: '#ffffff',
    fixed: false,
    astras: [],
    togglePause: () => {},
    setMass: () => {},
    setRadius: () => {},
    setColor: () => {},
    toggleFixed: () => {},
    setAstras: () => {}
}

export default React.createContext<GameData>({} as GameData);