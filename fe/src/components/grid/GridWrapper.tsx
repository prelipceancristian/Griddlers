import React, { useState } from "react";
import Grid from "./Grid";

/**
 * Builds the coordonate array for a given boolean array by counting the lengths of
 * contiguous "true" sequences, resetting when meeting a "false" value.
 * @param boolArray the given boolean array
 * @returns the lengths of the contiguous "true" segments
 */
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

/**
 * For each line in a grid, this function calculates its coordonates.
 *
 * Example: [true, false, true, true] -> [1, 2]
 * @param grid the given grid
 * @returns an array of coordonate arrays (one for each line of the grid)
 */
function getGridCoords(grid: boolean[][]): number[][] {
  const gridCoords: number[][] = grid.map((arr) => getArrayCoords(arr));
  return gridCoords;
}

/**
 * Transposes a matrix of any type of elements
 * @param matrix the given matrix
 * @returns the transposed matrix
 */
const transpose = (matrix: any[][]): any[][] =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

/**
 * This method creates the actual HTML elements necessary for the hints
 *
 * Based on the ``isRow``, the method can create a key for each div (e.g. "hint-row-1", "hint-column-3")
 *
 * After this, since each line in the ``coords`` is associated for a certain row/column in the grid,
 * the method creates a div for each, with the content being the coordinates joined by a comma
 *
 * Example: ``[[1, 2], [3]] -> <div> 1, 2 </div> <div> 3 </div>``
 * @param coords the coordinates for the grid
 * @param isRow shows whether the generated keys for the hints should be for rows or columns
 * @returns The JSX element of the hints for the given coords
 */
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

const getDefaultGrid = (grid: boolean[][]): boolean[][] =>
  Array.from({ length: grid.length }, () =>
    new Array(grid[0].length).fill(false),
  );

function GridWrapper({
  content,
  title,
}: {
  content: boolean[][];
  title: string;
}): JSX.Element {
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
  const bigWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  };
  const titleStyle: React.CSSProperties = {
    fontSize: 40,
    textAlign: "center",
  };
  // TODO: should add a control bar beneath the grid.
  // Fill modes -> filled, x, clear
  // Reset (?)
  const defaultGrid = getDefaultGrid(content);
  const [grid, setGrid] = useState(defaultGrid);
  return (
    <>
      <div style={titleStyle}>{title}</div>
      <div style={bigWrapper}>
        <div style={gridWrapperContainerStyle}>
          <div style={gridWrapperCellStyle} />
          <div style={gridWrapperHintStyle}>
            {getHintElements(getGridCoords(transpose(content)))}
          </div>
          <div style={gridWrapperVerticalHintStyle}>
            {getHintElements(getGridCoords(content))}
          </div>
          <div style={gridWrapperCellStyle}>
            <Grid content={content} grid={grid} setGrid={setGrid} />
          </div>
        </div>
        <div>
          <button type="button" onClick={() => setGrid(defaultGrid)}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default GridWrapper;
// idea: do a 4x4 grid in which the top right and bottom left cells contain the actual data.
// the bottom right cell contains the grid. Make sure they match length wise.
