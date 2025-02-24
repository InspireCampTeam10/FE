import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import { dashboardMockData } from "../../mock/DashboardMockData";
import Searchbar from "../../components/home/searchbar/Searchbar";
import searchTagStore from "../../store/SearchStore";
// import { historyStore } from "../../store/HistoryStore";
import { IoIosArrowBack } from "react-icons/io";
import { postSearchApi } from "../../api/SearchApi";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { setCategoryTags } = searchTagStore();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedSearchBtn, setIsClickedSearchBtn] = useState(false);

  const searchBarRef = useRef(null);

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab(clickedTab);
  };

  const handleSearchBtn = async ({ teams, league, otherInput }) => {
    const content =
      teams && league
        ? `[${league}] ${teams.map((t) => t)} 팀과 관련된 리포트를 작성해줘`
        : otherInput;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsClickedSearchBtn(true);

    try {
      const response = await postSearchApi([league, ...teams, otherInput]);

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
          <div className="home-board-msg-header">
            <div
              className="home-board-msg-header-back"
              onClick={() => onClickResetBtn()}
            >
              <IoIosArrowBack size={"1.5rem"} />
              Back
            </div>
          </div>
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
                      <span>{m.news.title}</span>
                      <p>{m.news.content}</p>
                    </div>
                  }
                </div>
              )
            )}
          </div>
          <Searchbar handleSearchBtn={handleSearchBtn} />
        </div>
      )}
    </div>
  );
};

export default Home;
