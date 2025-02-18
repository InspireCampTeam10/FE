import PropTypes from "prop-types";
import "./SelectMenu.css";

const SelectMenu = ({ toggleSelectTab, selectedTab }) => {
  console.log(selectedTab);
  return (
    <div className="select-menu-container">
      <div
        className={`select-menu-tab ${selectedTab.includes("리그 뉴스") ? "active" : ""}`}
        onClick={() => {
          toggleSelectTab("리그 뉴스");
        }}
      >
        리그 뉴스
      </div>
      <div
        className={`select-menu-tab ${selectedTab.includes("팀 뉴스") ? "active" : ""}`}
        onClick={() => toggleSelectTab("팀 뉴스")}
      >
        팀 뉴스
      </div>
      <div
        className={`select-menu-tab ${selectedTab.includes("경기 뉴스") ? "active" : ""}`}
        onClick={() => toggleSelectTab("경기 뉴스")}
      >
        경기 뉴스
      </div>
    </div>
  );
};

SelectMenu.propTypes = {
  toggleSelectTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.array.isRequired,
};

export default SelectMenu;
