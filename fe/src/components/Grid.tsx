import { useState } from "react";

const getCellStyle = (baseStyle: object, value: boolean): object => ({
  ...baseStyle,
  backgroundColor: value ? "black" : "white",
});

const getCellKey = (rowIndex: number, cellRowIndex: number): string =>
  `${rowIndex}-${cellRowIndex}`;

function Grid({ content }: { content: boolean[][] }) {
  const [grid, setGrid] = useState(content);
  const gridStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    display: "inline-block",
  };
  const rowStyle = {
    display: "flex",
  };
  const baseCellStyle = {
    width: 100,
    height: 100,
    margin: 3,
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
