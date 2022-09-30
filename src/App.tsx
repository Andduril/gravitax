import { useState } from "react";
import Canvas from "./components/Canvas";
import './App.css';
import Menu from "./components/Menu";
import GameContext, { defaultGameState } from "./utils/GameContext";
import Slider from "./components/Slider";
import CheckBox from "./components/CheckBox";
import { HexColorPicker } from "react-colorful";
import { Astra } from "./utils/Astra";

function App() {

  console.log('render')

  const [pause, setPause] = useState<boolean>(defaultGameState.pause);
  const [mass, setMass] = useState<number>(defaultGameState.mass);
  const [radius, setRadius] = useState<number>(defaultGameState.radius);
  const [fixed, setFixed] = useState<boolean>(defaultGameState.fixed);
  const [color, setColor] = useState<string>(defaultGameState.color);

  const [astras, setAstras] = useState<Astra[]>(defaultGameState.astras);

  const removeAstra = (astra: Astra) => {
    let index = astras.findIndex((value) => value === astra);
    astras.splice(index, 1);
  }

  const fusion = (astra1: Astra, astra2: Astra) => {
    if(astra1.fixed || astra2.fixed) {
      if(astra1.fixed) {
        astra1.mass += astra2.mass;
        removeAstra(astra2);
      } else {
        astra2.mass += astra1.mass;
        removeAstra(astra1);
      }
    } else {
      if(astra1.mass >= astra2.mass) {
        astra1.mass += astra2.mass;
        removeAstra(astra2);
      } else {
        astra2.mass += astra1.mass;
        removeAstra(astra1);
      }
    }
  }

  const checkColision = (astra: Astra, others: Astra[]) => {
    others.forEach((obj) => {
      let dist = Math.sqrt(((Math.pow(obj.x - astra.x, 2) + Math.pow(obj.y - astra.y, 2))));
      if(dist <= astra.radius + obj.radius) {
        fusion(astra, obj);
      }
    })
  }

  const update = () => {
    astras.forEach((astra) => {
      let others = astras.filter((value) => value !== astra);
      checkColision(astra, others);
      astra.gravitate(others);
      astra.update();
    })
  }

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (!pause) update();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    astras.forEach(astra => {
      ctx.fillStyle = astra.color;
      ctx.beginPath();
      ctx.arc(astra.x, astra.y, astra.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = '14px Roboto';
      ctx.fillText('Amogus', astra.x + astra.radius + 12, astra.y - astra.radius - 4);
      ctx.fill();
    });
  };

  const togglePause = () => {
    setPause(!pause);
  }

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

  const handleReset = () => {
    setAstras([]);
  }

  return (
    <GameContext.Provider value={{
      pause: pause,
      mass: mass,
      radius: radius,
      color: color,
      fixed: fixed,
      astras: astras,
      togglePause: togglePause,
      toggleFixed: toggleFixed,
      setMass: handleMassChange,
      setColor: handleColorChange,
      setRadius: handleRadiusChange,
      setAstras: setAstras
    }}>
      <Menu>
        <div className="navigation">
          <div className="navigation-main">
            <h1>Gravitax</h1>
            <Slider label="mass" min={1} max={50} value={mass} onChange={e => handleMassChange(e.x)} />
            <Slider label="radius" min={1} max={50} value={radius} onChange={e => handleRadiusChange(e.x)} />
            <HexColorPicker color={color} onChange={handleColorChange}/>
            <CheckBox label="fixed" value={fixed} onChange={toggleFixed} />
            <button style={{ pointerEvents: 'all' }} onClick={handleReset}>reset</button>
            <button style={{pointerEvents: 'all'}} onClick={togglePause}>{pause ? 'play' : 'pause'}</button>
          </div>
          <div className="navigation-footer">
            <span>Made by Anddy Labrut</span>
          </div>
        </div>
      </Menu>
      <Canvas style={{ width: '100%', height: '100%', background: '#000000' }} draw={draw} />
    </GameContext.Provider>
  );
}

export default App;
