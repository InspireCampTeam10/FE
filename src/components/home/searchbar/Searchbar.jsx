import { BsSearch } from "react-icons/bs";
import "./Searchbar.css";
import TagItem from "./TagItem";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useSearchTagStore } from "../../../store/SearchStore";

const Searchbar = ({ handleSearchBtn }) => {
  const { tags } = useSearchTagStore();
  const textareaRef = useRef(null);
  const [inputText, setInputText] = useState("");

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "2rem";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    setInputText(e.target.value);
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-input-container">
        <div className="search-bar-tag-container">
          {tags.map((tag, idx) => (
            <TagItem key={idx} tag={tag} />
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="search-bar-input-area"
          placeholder="추가 검색어를 입력해주세요"
          onChange={handleTextareaInput}
        ></textarea>
      </div>
      <button
        className="search-bar-btn"
        onClick={() =>
          handleSearchBtn({
            league: "프리미어 리그",
            teams: tags,
            otherInput: inputText,
          })
        }
      >
        <BsSearch size={"1.2rem"} fontWeight={"bold"} />
      </button>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  handleSearchBtn: PropTypes.func.isRequired,
};
