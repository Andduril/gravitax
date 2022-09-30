import React from "react";
import { Astra } from "./Astra";

export interface AstraData {
    astras: Astra[];
    pause: boolean;
    setAstras: React.Dispatch<React.SetStateAction<Astra[]>>;
    togglePause: () => void;
}

export default React.createContext<AstraData>({} as AstraData);