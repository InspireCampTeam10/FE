import { useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/leagueboard/LeagueBoard";
import { dashboardMockData } from "../../mock/DashboardMockData";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState([]);

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab((prev) =>
      prev.includes(clickedTab)
        ? prev.filter((tab) => tab !== clickedTab)
        : [...prev, clickedTab]
    );
  };

  return (
    <div className="home-container">
      <SelectMenu toggleSelectTab={toggleSelectTab} selectedTab={selectedTab} />
      {(selectedTab.includes("팀 뉴스") ||
        selectedTab.includes("경기 뉴스")) && (
        <LeagueBoard dashboardMockData={dashboardMockData} />
      )}
    </div>
  );
};

export default Home;
