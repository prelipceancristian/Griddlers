import { useState } from "react";

const getCellStyle = (
  baseStyle: React.CSSProperties,
  value: boolean,
): React.CSSProperties => ({
  ...baseStyle,
  backgroundColor: value ? "black" : "white",
});

const getCellKey = (rowIndex: number, cellRowIndex: number): string =>
  `${rowIndex}-${cellRowIndex}`;

function Grid({ content }: { content: boolean[][] }) {
  const [grid, setGrid] = useState(content);
  const gridStyle: React.CSSProperties = {
    // border: "1px solid black",
    // borderRadius: "10px",
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
  const handleOnCellClick = (rowIndex: number, columnIndex: number) => {
    const gridCopy = [...grid.map((row) => [...row])];
    gridCopy[rowIndex][columnIndex] = !gridCopy[rowIndex][columnIndex];
    setGrid(gridCopy);
  };
  return (
    <div style={gridStyle}>
      {grid.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex} style={rowStyle}>
          {row.map((cell, columnIndex) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
