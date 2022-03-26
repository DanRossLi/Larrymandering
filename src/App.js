import './App.css';
import GeoMap from "./Components/GeoMap"
import data from './cali.json'

function App() {
  return (
    <div className="App">
      <div style={{"display": "flex"}}>
        <h1>THIS IS LARRYMANDERING</h1>
      </div>
      <div style={{"display": "flex", 'alignItems': 'stretch', 'margin': 'auto', 'flexDirection': 'column', 'height': "1000px", 'width': "1000px"}}>
        <GeoMap data={data}/>
      </div>
    </div>
  );
}

export default App;
