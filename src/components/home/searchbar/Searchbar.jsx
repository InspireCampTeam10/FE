import { BsSearch } from "react-icons/bs";
import "./Searchbar.css";
import TagItem from "./TagItem";
import searchTagStore from "../../../store/SearchStore";
import CTagItem from "./CTagItem";
import PropTypes from "prop-types";

const Searchbar = ({ handleSearchBtn }) => {
  const { tags, categoryTags } = searchTagStore();

  const requestData = {
    league: "프리미어 리그",
    team: tags,
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-input-container">
        {categoryTags && <CTagItem tag={categoryTags} />}
        {tags.map((tag, idx) => (
          <TagItem key={idx} tag={tag} />
        ))}
        <input
          className="search-bar-input-area"
          placeholder="추가 검색어를 입력해주세요"
        ></input>
      </div>
      <button
        className="search-bar-btn"
        onClick={() => handleSearchBtn(requestData)}
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
