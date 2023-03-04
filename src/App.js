import "./App.css";
import RacingBars from "./components/RacingBars";
import { data } from "./data/standing";
function App() {
  return (
    <div className="App">
      <RacingBars
        data={data}
        time="round"
        title="team"
        value="score"
        barHeight={30}
        topN={4}
        topNColor="lime"
        lastN={3}
        lastNColor="red"
      />
    </div>
  );
}

export default App;
