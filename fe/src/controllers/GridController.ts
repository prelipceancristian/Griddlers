import axios from "axios";
import gridApiRoute from "../constants/RouteConstants";
import Grid from "../models/Grid";
import {
  GeneralServerError,
  ResourceNotFound,
  UnexpectedError,
} from "../constants/ErrorConstants";

// how can I make invalid states unrepresentable
interface SuccessResponse<T> {
  data: T;
  error: null;
}

interface ErrorResponse {
  data: null;
  error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

class GridController {
  static GetGrid = async (id: Number): Promise<ApiResponse<Grid>> => {
    const gridUri: string = `${gridApiRoute}/${id}`;
    try {
      const response = await axios.get(gridUri);

      const grid = new Grid();
      grid.Id = response.data.id;
      grid.AuthorId = response.data.authorId;
      grid.GridContent = response.data.gridContent;

      return { data: grid, error: null };
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return { data: null, error: UnexpectedError };
      }

      if (!error.response) {
        return { data: null, error: UnexpectedError };
      }

      if (error.response.status === 404) {
        console.log(error.response);
        return { data: null, error: ResourceNotFound };
      }

      return {
        data: null,
        error: GeneralServerError,
      };
    }
  };
}

export default GridController;
