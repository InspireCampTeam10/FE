import { useEffect, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import { dashboardMockData } from "../../mock/DashboardMockData";
import Searchbar from "../../components/home/searchbar/Searchbar";
import searchTagStore from "../../store/SearchStore";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState([]);
  const { setCategoryTags } = searchTagStore();

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab((prev) =>
      prev.includes(clickedTab)
        ? prev.filter((tab) => tab !== clickedTab)
        : [...prev, clickedTab]
    );
  };

  useEffect(() => {
    setCategoryTags(selectedTab);
  }, [selectedTab]);

  return (
    <div className="home-container">
      <SelectMenu toggleSelectTab={toggleSelectTab} selectedTab={selectedTab} />
      <div className="content-container">
        {(selectedTab.includes("팀 뉴스") ||
          selectedTab.includes("경기 뉴스")) && (
          <LeagueBoard dashboardMockData={dashboardMockData} />
        )}
        <Searchbar />
      </div>
    </div>
  );
};

export default Home;
