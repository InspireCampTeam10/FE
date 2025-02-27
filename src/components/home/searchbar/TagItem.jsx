import Prototype from "prop-types";
import "./TagItem.css";
import { TiDeleteOutline } from "react-icons/ti";
import { useSearchTagStore } from "../../../store/SearchStore";

const TagItem = ({ tag }) => {
  const { removeTag } = useSearchTagStore();
  return (
    <div className="tag-item-container" onClick={() => removeTag(tag)}>
      <span>{tag}</span>
      <div className="tag-item-icon">
        <TiDeleteOutline size={"1.3rem"} />
      </div>
    </div>
  );
};

export default TagItem;

TagItem.propTypes = {
  tag: Prototype.string.isRequired,
};
