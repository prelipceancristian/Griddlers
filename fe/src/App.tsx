import "./App.css";
import Grid from "./components/Grid";

function App() {
  return (
    <Grid
      grid={[
        [true, true, false],
        [false, true, false],
        [false, false, true],
      ]}
    />
  );
}

export default App;
