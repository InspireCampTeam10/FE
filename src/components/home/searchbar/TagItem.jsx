import Prototype from "prop-types";
import "./TagItem.css";
import { TiDeleteOutline } from "react-icons/ti";
import searchTagStore from "../../../store/SearchStore";

const TagItem = ({ tag }) => {
  const { removeTag } = searchTagStore();
  return (
    <div className="tag-item-container">
      {tag}
      <div className="tag-item-icon" onClick={() => removeTag(tag)}>
        <TiDeleteOutline size={"1.3rem"} />
      </div>
    </div>
  );
};

export default TagItem;

TagItem.propTypes = {
  tag: Prototype.string.isRequired,
};
