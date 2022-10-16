import React from "react";

export interface DisplayData {
    showNames: boolean,
    toggleShowNames: () => void;
};

export default React.createContext<DisplayData>({} as DisplayData);