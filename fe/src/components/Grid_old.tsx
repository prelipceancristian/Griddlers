function Cell({ value }: { value: boolean }) {
  const handleOnClick = (event: any) => {
    // eslint-disable-next-line no-console
    console.log("%cGrid.tsx line:4 event", "color: #007acc;", event);
  };
  const cellStyle = {
    width: 100,
    height: 100,
    margin: 3,
    color: "blue",
    backgroundColor: value ? "black" : "white",
  };
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      onClick={handleOnClick}
      onKeyUp={handleOnClick}
      role="button"
      style={cellStyle}
      tabIndex={0}
    />
  );
}

const getCellKey = (rowIndex: number, cellRowIndex: number): string =>
  `${rowIndex}-${cellRowIndex}`;

function Row({
  rowIndex,
  row,
}: {
  rowIndex: number;
  row: boolean[];
}): JSX.Element {
  const rowStyle = {
    display: "flex",
  };
  return (
    <div style={rowStyle}>
      {row.map((cell, index) => (
        <Cell key={getCellKey(rowIndex, index)} value={cell} />
      ))}
    </div>
  );
}

function Grid({ grid }: { grid: boolean[][] }): JSX.Element {
  const gridStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    display: "inline-block",
  };
  return (
    <div style={gridStyle}>
      {grid.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={index} rowIndex={index} row={row} />
      ))}
    </div>
  );
}

export default Grid;
