import { useEffect, useState } from "react";
import GridController from "../../controllers/GridController";
import GridWrapper from "../GridWrapper";
import "./Home.css";
import Grid from "../../models/Grid";

function Home(): JSX.Element {
  const offlineGrid = [
    [true, false, false, false, true, true, true],
    [true, false, false, false, true, false, true],
    [true, false, false, false, true, true, true],
    [true, false, false, false, true, false, false],
    [true, true, true, false, true, false, false],
  ];
  const [grid, setGrid] = useState<boolean[][]>([[]]);

  const fetchData = async () => {
    try {
      const gridResponse = await GridController.GetGrid(3);
      const data = Grid.parseGridContent(gridResponse.GridContent);
      setGrid(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGrid(offlineGrid);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="HomeContainer">
      <div className="HomeHeader"> Griddlers </div>
      <div className="GridContainer">
        {/* todo: fix this check. It's used so that the component does not mount before loading the grid */}
        {grid[0].length === 0 ? <div /> : <GridWrapper content={grid} />}
      </div>
    </div>
  );
}

export default Home;
