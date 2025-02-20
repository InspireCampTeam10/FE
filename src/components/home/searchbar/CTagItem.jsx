import Prototype from "prop-types";
import "./CTagItem.css";
import { TiDeleteOutline } from "react-icons/ti";
import searchTagStore from "../../../store/SearchStore";

const CTagItem = ({ tag }) => {
  const { removeCtag } = searchTagStore();
  return (
    <div className="ctag-item-container">
      {tag}
      <div className="ctag-item-icon" onClick={() => removeCtag(tag)}>
        <TiDeleteOutline size={"1.3rem"} />
      </div>
    </div>
  );
};

export default CTagItem;

CTagItem.propTypes = {
  tag: Prototype.string.isRequired,
};
