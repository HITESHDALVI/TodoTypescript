import {noDataImg} from "../../assets/imageBase64";
import "./nodata.css";
const NoDataFound = () => {
  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <img src={noDataImg} alt="" />
        </div>
        <div className="empty-state__message">
          No records has been added yet.
        </div>
        <div className="empty-state__help">
          Add a new record by simpley clicking the button on top right side.
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
