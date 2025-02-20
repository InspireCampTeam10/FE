import { BsSearch } from "react-icons/bs";
import "./Searchbar.css";
import TagItem from "./TagItem";
import searchTagStore from "../../../store/SearchStore";
import CTagItem from "./CTagItem";

const Searchbar = () => {
  const { tags, categoryTags } = searchTagStore();
  return (
    <div className="search-bar-container">
      <div className="search-bar-input-container">
        {categoryTags.map((tag, idx) => (
          <CTagItem key={idx} tag={tag} />
        ))}
        {tags.map((tag, idx) => (
          <TagItem key={idx} tag={tag} />
        ))}
        <input
          className="search-bar-input-area"
          placeholder="추가 검색어를 입력해주세요"
        ></input>
      </div>
      <button className="search-bar-btn">
        <BsSearch size={"1.2rem"} fontWeight={"bold"} />
      </button>
    </div>
  );
};

export default Searchbar;
