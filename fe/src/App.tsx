import "./App.css";
// import Grid from "./components/Grid";
import GridWrapper from "./components/GridWrapper";

function App() {
  // return (
  //   <Grid
  //     content={[
  //       [true, true, false],
  //       [false, true, false],
  //       [false, false, true],
  //     ]}
  //   />
  // );
  return (
    <GridWrapper
      content={[
        [true, true, false, true, true, true],
        [false, true, false, false, true, true],
        [false, false, true, true, false, true],
      ]}
    />
  );
}

export default App;
