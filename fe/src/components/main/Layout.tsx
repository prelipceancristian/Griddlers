import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="HomeContainer">
      <div className="HomeHeader">
        <img src="logo.png" alt="logo" height={55} /> {"  "} Griddlers
      </div>
      <div className="GridContainer">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
