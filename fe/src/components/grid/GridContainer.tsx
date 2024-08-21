import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridController from "../../controllers/GridController";
import GridWrapper from "./GridWrapper";
import Grid from "../../models/Grid";
import "./GridContainer.css";
import {
  GeneralServerError,
  ResourceNotFound,
} from "../../constants/ErrorConstants";

function GridContainer(): JSX.Element {
  const [grid, setGrid] = useState<boolean[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { gridId } = useParams();

  const fetchData = async (idForGrid: string | undefined) => {
    const gridIdAsNumber = Number(idForGrid);
    const result = await GridController.GetGrid(gridIdAsNumber);

    if (result.error === null) {
      const data = Grid.parseGridContent(result.data.GridContent);
      setGrid(data);
      setError(null);
      return;
    }

    switch (result.error) {
      case ResourceNotFound:
        setError("The requested grid was not found.");
        break;
      case GeneralServerError:
        setError("An error occurred on the server. Please try again later.");
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchData(gridId);
  }, [gridId]);

  if (error !== null) {
    return <div> {error} </div>;
  }

  return (
    <div className="GridContainer">
      {grid === null ? <div /> : <GridWrapper content={grid} />}
    </div>
  );
}

export default GridContainer;
