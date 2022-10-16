import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Astra } from "../../utils/Astra";
import AstraContext from "../../utils/AstraContext";
import DisplayContext from "../../utils/DisplayContext";
import GameContext, { defaultGameState } from "../../utils/GameContext";
import CheckBox from "../CheckBox/CheckBox";
import Menu from "../Menu/Menu";
import Slider from "../Slider/Slider";
import './style.css';
import { ReactComponent as PauseLogo } from '../../assets/pause.svg';
import { ReactComponent as PlayLogo } from '../../assets/play.svg';
import { ReactComponent as RestartLogo } from '../../assets/restart.svg';

const UserInterface = () => {
    const astrasCtx = useContext(AstraContext);
    const displayCtx = useContext(DisplayContext);

    const [name, setName] = useState<string>(defaultGameState.name);
    const [mass, setMass] = useState<number>(defaultGameState.mass);
    const [radius, setRadius] = useState<number>(defaultGameState.radius);
    const [fixed, setFixed] = useState<boolean>(defaultGameState.fixed);
    const [color, setColor] = useState<string>(defaultGameState.color);
    const [mousePress, setMousePress] = useState<{ x: number, y: number } | null>(null);
    const [drag, setDrag] = useState<boolean>(false);

    const toggleFixed = () => {
        setFixed(!fixed);
    };

    const handleMassChange = (newMass: number) => {
        setMass(newMass);
    };

    const handleRadiusChange = (newRadius: number) => {
        setRadius(newRadius);
    };

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
    };

    const handleMouseDown = (x: number, y: number) => {
        setMousePress({ x, y });
        setDrag(true);
    };

    const handleMouseUp = (x: number, y: number) => {
        if (drag && mousePress) {
            let newAstra: Astra;
            if (name.length === 0) {
                let astraName = `astra n°${astrasCtx.astras.length}`;
                newAstra = new Astra(mousePress.x, mousePress.y, fixed, mass, color, radius, (x - mousePress.x) / 100, (y - mousePress.y) / 100, astraName);
            } else {
                newAstra = new Astra(mousePress.x, mousePress.y, fixed, mass, color, radius, (x - mousePress.x) / 100, (y - mousePress.y) / 100, name);
                setName('');
            }
            astrasCtx.setAstras([...astrasCtx.astras, newAstra]);
            setDrag(false);
        }
    };

    const handleReset = () => {
        astrasCtx.setAstras([]);
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
    };

    return (
        <GameContext.Provider value={{
            name: name,
            mass: mass,
            radius: radius,
            fixed: fixed,
            color: color,
            setName: handleNameChange,
            setMass: handleMassChange,
            setRadius: handleRadiusChange,
            toggleFixed: toggleFixed,
            setColor: handleColorChange,
        }}>
            <div
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent', position: 'absolute', top: 0 }}
                onMouseDown={(event) => handleMouseDown(event.clientX, event.clientY)}
                onMouseUp={(event) => handleMouseUp(event.clientX, event.clientY)}
            >
            </div>
            <div style={{width: '50%', height: '10%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
                <button className="controls-btn" onClick={astrasCtx.togglePause}>
                    {astrasCtx.pause ? <PlayLogo fill="white" /> : <PauseLogo fill="white" />}
                </button>
                <button className="controls-btn" onClick={handleReset}>
                    <RestartLogo fill="white" />
                </button>
            </div>
            <Menu>
                <div className="navigation">
                    <h1 className="navigation-title">Gravitax</h1>
                    <div className="creator-options">
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', alignItems: 'center' }}>
                            <label style={{ color: 'white', paddingBottom: '5px' }}>Name (optional)</label>
                            <input style={{ borderRadius: '15px', padding: '8px', width: '100%', background: 'white', color: 'black'}} type={'text'} value={name} onChange={e => handleNameChange(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', alignItems: 'center' }}>
                            <label style={{ color: 'white', paddingBottom: '8px' }}>Mass : {mass} kg</label>
                            <Slider min={1} max={200} value={mass} onChange={e => handleMassChange(e.x)} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', alignItems: 'center' }}>
                            <label style={{ color: 'white', paddingBottom: '8px' }}>Radius : {radius}</label>
                            <Slider min={1} max={150} value={radius} onChange={e => handleRadiusChange(e.x)} />
                        </div>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <label style={{ color: 'white', paddingBottom: '8px', }}>Color</label>
                            <HexColorPicker color={color} onChange={handleColorChange} />
                        </div>
                        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <CheckBox label="fixed" value={fixed} onChange={toggleFixed} />
                        </div>
                    </div>
                    <div className="display-options">
                        <CheckBox label="Show Names" value={displayCtx.showNames} onChange={displayCtx.toggleShowNames} />
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