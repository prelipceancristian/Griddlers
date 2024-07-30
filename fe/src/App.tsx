import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/main/Layout";
import GridContainer from "./components/grid/GridContainer";
import GridList from "./components/grid_list/GridList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GridList />}></Route>
          <Route path=":gridId" element={<GridContainer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
