import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="HomeContainer">
      <div className="HomeHeader"> Griddlers </div>
      <div className="GridContainer">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
