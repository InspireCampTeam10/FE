import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import { dashboardMockData } from "../../mock/DashboardMockData";
import Searchbar from "../../components/home/searchbar/Searchbar";
import searchTagStore from "../../store/SearchStore";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState([]);
  const { setCategoryTags } = searchTagStore();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedSearchBtn, setIsClickedSearchBtn] = useState(false);

  const searchBarRef = useRef(null);

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab((prev) =>
      prev.includes(clickedTab)
        ? prev.filter((tab) => tab !== clickedTab)
        : [...prev, clickedTab]
    );
  };

  const handleSearchBtn = async (userInput) => {
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsClickedSearchBtn(true);

    try {
      // TODO : API 호출 로직으로 변경 필요
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Data
      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...\n이것은 AI의 응답입니다...",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickResetBtn = () => {
    setIsClickedSearchBtn(false);
  };

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setCategoryTags(selectedTab);
  }, [selectedTab]);

  return (
    <div className="home-container">
      {!isClickedSearchBtn ? (
        <div className="home-board-content-container">
          <SelectMenu
            toggleSelectTab={toggleSelectTab}
            selectedTab={selectedTab}
          />
          <div className="home-board-content">
            {(selectedTab.includes("팀 뉴스") ||
              selectedTab.includes("경기 뉴스")) && (
              <LeagueBoard dashboardMockData={dashboardMockData} />
            )}
            <Searchbar handleSearchBtn={handleSearchBtn} />
          </div>
        </div>
      ) : (
        <div className="home-board-msg-container">
          <div className="home-board-msg-content">
            {messages.map((m, idx) =>
              m.type === "user" ? (
                <div
                  className="home-board-msg-user"
                  key={idx}
                  ref={searchBarRef}
                >
                  {m.content}
                </div>
              ) : (
                <div className="home-board-msg-ai" key={idx}>
                  {m.content}
                </div>
              )
            )}
          </div>
          <div className="home-board-msg-search-container">
            <Searchbar handleSearchBtn={handleSearchBtn} />
            <div className="home-board-reset-btn" onClick={onClickResetBtn}>
              이전 페이지로
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
