class Grid {
  static buildGrid = (
    id: number,
    authorId: number,
    gridContent: string,
  ): Grid => {
    const grid = new Grid();
    grid.Id = id;
    grid.AuthorId = authorId;
    grid.GridContent = gridContent;
    return grid;
  };

  Id!: number;
  AuthorId!: number;
  GridContent!: string;

  static parseGridContent = (content: string): boolean[][] => {
    const numberMatrix: Number[][] = JSON.parse(content);
    const booleanMatrix: boolean[][] = numberMatrix.map((innerArray) =>
      innerArray.map((num) => !!num),
    );
    return booleanMatrix;
  };
}

export default Grid;
