import PropTypes from "prop-types";
import "./SelectMenu.css";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const SelectMenu = ({ toggleSelectTab, selectedTab }) => {
  return (
    <div className="select-menu-container">
      <div
        className={`select-menu-tab ${selectedTab.includes("리그 뉴스") ? "active" : ""}`}
        onClick={() => {
          toggleSelectTab("리그 뉴스");
        }}
      >
        <MdOutlineSportsSoccer color="#ea8344" />
        리그 뉴스
      </div>
      <div
        className={`select-menu-tab ${selectedTab.includes("팀 뉴스") ? "active" : ""}`}
        onClick={() => toggleSelectTab("팀 뉴스")}
      >
        <RiTeamFill color="#e2c540" />팀 뉴스
      </div>
    </div>
  );
};

SelectMenu.propTypes = {
  toggleSelectTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default SelectMenu;
