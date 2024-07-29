class Grid {
  Id!: Number;

  AuthorId!: Number;

  GridContent!: string;

  // dunno why this is static
  static parseGridContent = (content: string): boolean[][] => {
    console.log("here");
    const numberMatrix: Number[][] = JSON.parse(content);
    const booleanMatrix: boolean[][] = numberMatrix.map((innerArray) =>
      innerArray.map((num) => !!num),
    );
    return booleanMatrix;
  };
}

export default Grid;
