import { useEffect } from "react";

const getCellStyle = (
  baseStyle: React.CSSProperties,
  value: boolean,
): React.CSSProperties => ({
  ...baseStyle,
  backgroundColor: value ? "black" : "white",
});

const getCellKey = (rowIndex: number, cellRowIndex: number): string =>
  `${rowIndex}-${cellRowIndex}`;

function isGridSolved(grid: boolean[][], solution: boolean[][]): boolean {
  if (
    grid.length !== solution.length ||
    grid[0].length !== solution[0].length
  ) {
    return false;
  }

  // Check if each element in the matrices is equal
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[0].length; j += 1) {
      if (grid[i][j] !== solution[i][j]) {
        return false;
      }
    }
  }

  return true;
}

// const getDefaultGrid = (grid: boolean[][]): boolean[][] =>
//   Array.from({ length: grid.length }, () =>
//     new Array(grid[0].length).fill(false),
//   );

function Grid({
  grid,
  setGrid,
  content,
}: {
  grid: boolean[][];
  setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
  content: boolean[][];
}) {
  // const defaultGrid = getDefaultGrid(content);
  // const [grid, setGrid] = useState(defaultGrid);
  const handleOnCellClick = (rowIndex: number, columnIndex: number) => {
    const gridCopy = [...grid.map((row) => [...row])];
    gridCopy[rowIndex][columnIndex] = !gridCopy[rowIndex][columnIndex];
    setGrid(gridCopy);
  };
  useEffect(() => {
    if (isGridSolved(grid, content)) {
      const timer = setTimeout(
        () => window.alert("You won! Press reset to try again"),
        100,
      );
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [grid]);

  const gridStyle: React.CSSProperties = {
    display: "inline-block",
    userSelect: "none",
    backgroundColor: "#D3D3D3",
  };
  const rowStyle: React.CSSProperties = {
    display: "flex",
    userSelect: "none",
    justifyContent: "space-evenly",
  };
  const baseCellStyle: React.CSSProperties = {
    width: 60,
    height: 60,
    margin: 1.5,
    color: "blue",
    userSelect: "none",
  };

  return (
    <div style={gridStyle}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((cell, columnIndex) => (
            <div
              key={getCellKey(rowIndex, columnIndex)}
              style={getCellStyle(baseCellStyle, cell)}
              onClick={() => handleOnCellClick(rowIndex, columnIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
