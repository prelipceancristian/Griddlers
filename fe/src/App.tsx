import "./App.css";
// import Grid from "./components/Grid";
// import GridWrapper from "./components/GridWrapper";
import Home from "./components/main/Home";

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
  // return (
  //   <GridWrapper
  //     content={[
  //       [true, true, false, true, true, true],
  //       [false, true, false, false, true, true],
  //       [false, false, true, true, false, true],
  //     ]}
  //   />
  // );
  return Home();
}

export default App;
