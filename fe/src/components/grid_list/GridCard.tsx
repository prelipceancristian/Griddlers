import { useNavigate } from "react-router-dom";
import Grid from "../../models/Grid";
import "./GridCard.css";

const gridCard = ({ grid }: { grid: Grid }) => {
  const navigate = useNavigate();
  const openGrid = () => {
    navigate(`/${grid.Id}`);
  };

  return (
    <div className="GridCardContainer" onClick={openGrid}>
      <div className="GridCardImageDataContainer">
        <img
          className="GridCardImage"
          src="/logo192.png"
          alt="grid image"
        ></img>
      </div>
      <div className="GridCardDataContainerContainer">
        <div className="GridCardDataContainer">
          <div>
            <div className="GridCardTitle">{grid.Title}</div>
            <div className="GridCardSubtextContainer">
              <div className="GridCardAuthor">By {grid.AuthorId}</div>
            </div>
          </div>
          <div className="GridCardFooter">
            <div>★ ★ ★ ★ ☆</div>
            <div>3 x 6</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gridCard;