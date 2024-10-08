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
  const [gridMatrix, setGridMatrix] = useState<boolean[][] | null>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { gridId } = useParams();

  const fetchData = async (idForGrid: string | undefined) => {
    if (idForGrid === undefined) {
      return;
    }
    const result = await GridController.GetGrid(idForGrid);

    if (result.error === null) {
      console.log(result);
      const data = Grid.parseGridContent(result.data.GridContent);
      setGrid(result.data);
      setGridMatrix(data);
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

  if (gridMatrix === null || grid === null) {
    return <div />;
  }

  return <GridWrapper content={gridMatrix} title={grid.Title} />;
}

export default GridContainer;
