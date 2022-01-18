import './App.css';
import Map from "./page"

function App() {
  return (
    <div className="App">
      <Map data={
        [{x: 100, y:100},
          {x: 200, y:100},
          {x: 300, y:200},
          {x: 400, y:300},
          {x: 500, y:100}
        ]
      }/>
    </div>
  );
}

export default App;
