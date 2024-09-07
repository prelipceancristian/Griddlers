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
      const grid = new Grid(
        response.data.id,
        response.data.authorId,
        response.data.gridContent,
        response.data.title,
        response.data.createAt,
      );

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

  static GetGridList = async (): Promise<ApiResponse<Grid[]>> => {
    try {
      const response = await axios.get(gridApiRoute);
      const grids = response.data.map(
        (gridData: any) =>
          new Grid(
            gridData.id,
            gridData.authorId,
            gridData.gridContent,
            gridData.title,
            gridData.createdAt,
          ),
      );
      return { data: grids, error: null };
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return { data: null, error: UnexpectedError };
      }

      if (!error.response) {
        return { data: null, error: UnexpectedError };
      }

      return {
        data: null,
        error: GeneralServerError,
      };
    }
  };
}

export default GridController;
