function Cell({ value }: { value: boolean }) {
  const cellStyle = {
    width: 16,
    height: 16,
    color: "blue",
  };
  return <div style={cellStyle}>{value ? 1 : 0}</div>;
}

function Row({ row }: { row: boolean[] }): JSX.Element {
  return (
    <div>
      {row.map((cell) => (
        <Cell value={cell} />
      ))}
    </div>
  );
}

function Grid({ grid }: { grid: boolean[][] }): JSX.Element {
  //   const [grid, updateGrid] = useState(props.grid);
  return (
    <div>
      {grid.map((row) => (
        <Row row={row} />
      ))}
    </div>
  );
}

// Grid.propTypes = {
//   grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool.isRequired))
//     .isRequired,
// };

export default Grid;
