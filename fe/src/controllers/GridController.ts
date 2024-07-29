import axios from "axios";
import gridApiRoute from "../constants/RouteConstants";
import { Ok } from "../constants/StatusCodes";
import Grid from "../models/Grid";

class GridController {
  static GetGrid = async (id: Number): Promise<Grid> => {
    const gridUri: string = `${gridApiRoute}/${id}`;
    const response = await axios.get(gridUri);
    if (response.status !== Ok) {
      window.alert("Could not retrieve the grid");
    }

    const grid = new Grid();
    grid.Id = response.data.id;
    grid.AuthorId = response.data.authorId;
    grid.GridContent = response.data.gridContent;
    return grid;
  };
}

export default GridController;
