import './App.css';
import ScatterChart from "./Components/ScatterChart"

function App() {
  return (
    <div className="App">
      <div style={{"display": "flex"}}>
        <div>
          <h3>x</h3>
          <input></input>
        </div>
        <div>
          <h3>y</h3>
          <input></input>
        </div>
        <div>
          <h3>Owner</h3>
          <input></input>
        </div>
        <div>
          <h3>Type</h3>
          <input></input>
        </div>
      </div>
      <ScatterChart data={
        [{x: 100, y:100, owner: "DWave", type: "base"},
          {x: 200, y:100, owner: "DLord", type: "base"},
          {x: 300, y:200, owner: "Chao", type: "amp"},
          {x: 400, y:300, owner: "Uratha", type: "base"},
          {x: 500, y:100, owner: "TowBoat", type: "base"}
        ]
      }/>
    </div>
  );
}

export default App;
