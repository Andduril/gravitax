import React from "react";

export interface GameData {
    // pause: boolean;
    name: string;
    mass: number;
    radius: number;
    color: string;
    fixed: boolean;

    // togglePause: () => void;
    setName: (newName: string) => void;
    setMass: (mass: number) => void;
    setRadius: (radius: number) => void;
    setColor: (color: string) => void;
    toggleFixed: () => void;
}

export const defaultGameState: GameData = {
    // pause: false,
    name: '',
    mass: 25,
    radius: 25,
    color: '#ffffff',
    fixed: false,
    // togglePause: () => {},
    setName: () => {},
    setMass: () => {},
    setRadius: () => {},
    setColor: () => {},
    toggleFixed: () => {}
}

export default React.createContext<GameData>({} as GameData);