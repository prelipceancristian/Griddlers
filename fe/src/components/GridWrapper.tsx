import React from "react";
import Grid from "./Grid";

function getArrayCoords(boolArray: boolean[]): number[] {
  const trueSequenceLengths: number[] = [];
  let currentSequenceLength = 0;
  for (let i = 0; i < boolArray.length; i += 1) {
    if (boolArray[i]) {
      // If current element is "true"
      currentSequenceLength += 1; // Increase the length of the current sequence
    } else if (currentSequenceLength > 0) {
      // If current element is "false"
      // If we were in a "true" sequence
      trueSequenceLengths.push(currentSequenceLength); // Add the length to the output array
      currentSequenceLength = 0; // Reset the length of the current sequence
    }
  }
  if (currentSequenceLength > 0) {
    // If we were in a "true" sequence at the end of the input array
    trueSequenceLengths.push(currentSequenceLength); // Add the length to the output array
  }
  return trueSequenceLengths;
}

function getGridCoords(grid: boolean[][]): number[][] {
  const gridCoords: number[][] = grid.map((arr) => getArrayCoords(arr));
  return gridCoords;
}

function transpose(matrix: any[][]): any[][] {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function getHintElements(coords: number[][], isRow: boolean = false) {
  const noWrapWhitespaceStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
  };
  const getHintKey = (index: number): string =>
    `hint-${isRow ? "row" : "column"}-${index}`;
  return coords.map((row, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div style={noWrapWhitespaceStyle} key={getHintKey(index)}>
      {row.join(", ")}
    </div>
  ));
}

function GridWrapper({ content }: { content: boolean[][] }): JSX.Element {
  const gridWrapperContainerStyle: React.CSSProperties = {
    display: "inline-grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 5,
    padding: 5,
    backgroundColor: "grey",
    width: "min-content",
  };
  const gridWrapperCellStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "5px",
    justifyContent: "space-around",
  };
  const gridWrapperHintStyle: React.CSSProperties = {
    ...gridWrapperCellStyle,
    display: "flex",
  };
  const gridWrapperVerticalHintStyle: React.CSSProperties = {
    ...gridWrapperHintStyle,
    flexDirection: "column",
  };
  return (
    <div style={gridWrapperContainerStyle}>
      <div style={gridWrapperCellStyle} />
      <div style={gridWrapperHintStyle}>
        {getHintElements(getGridCoords(transpose(content)))}
      </div>
      <div style={gridWrapperVerticalHintStyle}>
        {getHintElements(getGridCoords(content))}
      </div>
      <div style={gridWrapperCellStyle}>
        <Grid content={content} />
      </div>
    </div>
  );
}

export default GridWrapper;
// idea: do a 4x4 grid in which the top right and bottom left cells contain the actual data.
// the bottom right cell contains the grid. Make sure they match length wise.
