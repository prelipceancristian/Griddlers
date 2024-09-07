class Grid {
  Id!: string;
  AuthorId!: string | null;
  GridContent!: string;
  Title!: string;
  CreatedAt!: string;

  constructor(
    id: string,
    authorId: string | null,
    gridContent: string,
    title: string,
    createdAt: string,
  ) {
    this.Id = id;
    this.AuthorId = authorId;
    this.GridContent = gridContent;
    this.Title = title;
    this.CreatedAt = createdAt;
  }

  static parseGridContent = (content: string): boolean[][] => {
    const numberMatrix: Number[][] = JSON.parse(content);
    const booleanMatrix: boolean[][] = numberMatrix.map((innerArray) =>
      innerArray.map((num) => !!num),
    );
    return booleanMatrix;
  };
}

export default Grid;
