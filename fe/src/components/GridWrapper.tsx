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

function getGridCoordsString(coords: number[][]): string {
  return coords.map((coord) => `[${coord.join(", ")}]`).join(", ");
}

function GridWrapper({ content }: { content: boolean[][] }): JSX.Element {
  const gridWrapperContainerStyle: React.CSSProperties = {
    display: "inline-grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 5,
    padding: 5,
    backgroundColor: "grey",
  };
  const gridWrapperCellStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "5px",
  };
  // getGridCoords(content);
  // getGridCoords(transpose(content));
  return (
    <div style={gridWrapperContainerStyle}>
      <div style={gridWrapperCellStyle} />
      <div style={gridWrapperCellStyle}>
        {getGridCoordsString(getGridCoords(transpose(content)))}
      </div>
      <div style={gridWrapperCellStyle}>
        {getGridCoordsString(getGridCoords(content))}
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
