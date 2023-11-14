import GridWrapper from "../GridWrapper";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="HomeContainer">
      <div className="HomeHeader"> Griddlers </div>
      <div className="GridContainer">
        <GridWrapper
          content={[
            [true, false, false, false, true, true, true],
            [true, false, false, false, true, false, true],
            [true, false, false, false, true, true, true],
            [true, false, false, false, true, false, false],
            [true, true, true, false, true, false, false],
          ]}
        />
      </div>
    </div>
  );
}

export default Home;
