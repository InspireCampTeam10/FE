import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import { dashboardMockData } from "../../mock/DashboardMockData";
import Searchbar from "../../components/home/searchbar/Searchbar";
import searchTagStore from "../../store/SearchStore";
import { postSearchApi } from "../../api/SearchApi";
import { historyStore } from "../../store/HistoryStore";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { setCategoryTags } = searchTagStore();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedSearchBtn, setIsClickedSearchBtn] = useState(false);
  const { addHistory } = historyStore();

  // For Test
  sessionStorage.setItem("token", "test");

  const searchBarRef = useRef(null);

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab(clickedTab);
  };

  const handleSearchBtn = async (userInput) => {
    const token = sessionStorage.getItem("token");
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: `[${userInput.league}] ${userInput.team.map((t) => t)} 팀과 관련된 리포트를 작성해줘`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsClickedSearchBtn(true);

    try {
      // TODO : API 호출 로직으로 변경 필요
      const response = await postSearchApi(token, userInput);
      addHistory(response);

      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        news: response,
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
            {selectedTab.includes("팀 뉴스") && (
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
                  {
                    <div key={idx}>
                      {/* TODO : 기사 형식으로 UI 수정 필요 */}
                      <span>{m.news.title}</span>
                      <p>{m.news.timestamp}</p>
                      <div>{m.news.content}</div>
                    </div>
                  }
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
