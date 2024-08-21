import { useEffect, useState } from "react";
import Grid from "../../models/Grid";
import GridController from "../../controllers/GridController";
import { GeneralServerError } from "../../constants/ErrorConstants";

const GridList = () => {
  const [gridList, setGridList] = useState<Grid[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGrids = async () => {
    const result = await GridController.GetGridList();
    if (result.error === null) {
      setGridList(result.data);
      setError(null);
    }

    switch (result.error) {
      case GeneralServerError:
        setError("An error occurred on the server. Please try again later.");
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchGrids();
  }, []);

  if (error !== null) {
    <div> {error} </div>;
  }

  if (gridList === null) {
    return <div />;
  }

  return (
    <ol>
      {gridList.map((grid) => (
        <li>
          {grid.Id}, {grid.GridContent}
        </li>
      ))}
    </ol>
  );
};

export default GridList;
