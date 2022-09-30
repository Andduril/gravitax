import { useState } from "react";
import './App.css';
import { Astra } from "./utils/Astra";
import AstraContext from "./utils/AstraContext";
import GameView from "./components/GameView/GameView";
import UserInterface from "./components/UserInterface/UserInterface";

function App() {

  const [pause, setPause] = useState<boolean>(false);
  const [astras, setAstras] = useState<Astra[]>([]);

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

  return (
    <AstraContext.Provider value={{
      astras: astras,
      pause: pause,
      setAstras: setAstras,
      togglePause: togglePause,
    }}>
      <GameView style={{ width: '100%', height: '100%', background: '#000000'}} draw={draw}/>
      <UserInterface/>
    </AstraContext.Provider>
  );
}

export default App;
