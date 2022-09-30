import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Astra } from "../../utils/Astra";
import AstraContext from "../../utils/AstraContext";
import GameContext, { defaultGameState } from "../../utils/GameContext";
import CheckBox from "../CheckBox/CheckBox";
import Menu from "../Menu/Menu";
import Slider from "../Slider/Slider";
import './style.css';

const UserInterface = () => {
    const astrasCtx = useContext(AstraContext);

    const [mass, setMass] = useState<number>(defaultGameState.mass);
    const [radius, setRadius] = useState<number>(defaultGameState.radius);
    const [fixed, setFixed] = useState<boolean>(defaultGameState.fixed);
    const [color, setColor] = useState<string>(defaultGameState.color);
    const [mousePress, setMousePress] = useState<{ x: number, y: number } | null>(null);
    const [drag, setDrag] = useState<boolean>(false);

    const toggleFixed = () => {
        setFixed(!fixed);
    }

    const handleMassChange = (newMass: number) => {
        setMass(newMass);
    }

    const handleRadiusChange = (newRadius: number) => {
        setRadius(newRadius);
    }

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
    }

    const handleMouseDown = (x: number, y: number) => {
        setMousePress({ x, y });
        setDrag(true);
    }

    const handleMouseUp = (x: number, y: number) => {
        if (drag && mousePress) {
            const newAstra = new Astra(mousePress.x, mousePress.y, fixed, mass, color, radius, (x - mousePress.x) / 100, (y - mousePress.y) / 100);
            astrasCtx.setAstras([...astrasCtx.astras, newAstra]);
            setDrag(false);
        }
    }

    const handleReset = () => {
        astrasCtx.setAstras([]);
    }

    return (
        <GameContext.Provider value={{
            mass: mass,
            radius: radius,
            fixed: fixed,
            color: color,
            setMass: handleMassChange,
            setRadius: handleRadiusChange,
            toggleFixed: toggleFixed,
            setColor: handleColorChange,
        }}>
            <div
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent', position: 'absolute', top: 0 }}
                onMouseDown={(event) => handleMouseDown(event.clientX, event.clientY)}
                onMouseUp={(event) => handleMouseUp(event.clientX, event.clientY)}
            ></div>
            <Menu>
                <div className="navigation">
                    <div className="navigation-main">
                        <h1>Gravitax</h1>
                        <Slider label="mass" min={1} max={50} value={mass} onChange={e => handleMassChange(e.x)} />
                        <Slider label="radius" min={1} max={50} value={radius} onChange={e => handleRadiusChange(e.x)} />
                        <HexColorPicker color={color} onChange={handleColorChange} />
                        <CheckBox label="fixed" value={fixed} onChange={toggleFixed} />
                        <button style={{ pointerEvents: 'all' }} onClick={handleReset}>reset</button>
                        <button style={{pointerEvents: 'all'}} onClick={astrasCtx.togglePause}>{astrasCtx.pause ? 'play' : 'pause'}</button>
                    </div>
                    <div className="navigation-footer">
                        <span>Made by Anddy Labrut</span>
                    </div>
                </div>
            </Menu>
        </GameContext.Provider>
    )
};

export default UserInterface;