import { useState } from "react";
import './App.css';
import { Astra } from "./utils/Astra";
import AstraContext from "./utils/AstraContext";
import GameView from "./components/GameView/GameView";
import UserInterface from "./components/UserInterface/UserInterface";
import DisplayContext from "./utils/DisplayContext";

function App() {

  const [pause, setPause] = useState<boolean>(false);
  const [astras, setAstras] = useState<Astra[]>([]);

  const [showNames, setShowNames] = useState<boolean>(true);

  const update = () => {
    astras.forEach((astra) => {
      let others = astras.filter((value) => value !== astra);
      astra.gravitate(others);
      astra.update();
    });
  }

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    if (!pause) update();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    astras.forEach(astra => {
      ctx.fillStyle = astra.color;
      ctx.beginPath();
      ctx.arc(astra.x, astra.y, astra.radius, 0, 2 * Math.PI);
      ctx.fill();

      if (showNames) {
        ctx.font = '14px Roboto';
        ctx.fillText(astra.name, astra.x + astra.radius + 12, astra.y - astra.radius - 4);
        ctx.fill();
      }
    });
  };

  const togglePause = () => {
    setPause(!pause);
  }

  const toggleShowNames = () => {
    setShowNames(!showNames);
  };


  return (
    <AstraContext.Provider value={{
      astras: astras,
      pause: pause,
      setAstras: setAstras,
      togglePause: togglePause,
    }}>
      <DisplayContext.Provider value={{
        showNames: showNames,
        toggleShowNames: toggleShowNames,
      }}>
        <GameView style={{ width: '100%', height: '100%', background: '#000000' }} draw={draw} />
        <UserInterface />
      </DisplayContext.Provider>
    </AstraContext.Provider>
  );
}

export default App;
