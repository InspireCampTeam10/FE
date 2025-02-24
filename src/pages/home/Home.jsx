import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import Searchbar from "../../components/home/searchbar/Searchbar";
import searchTagStore from "../../store/SearchStore";
import { IoIosArrowBack } from "react-icons/io";
import { postSearchApi } from "../../api/SearchApi";
import { getLeagueBoard } from "../../api/HomeApi";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { setCategoryTags } = searchTagStore();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedSearchBtn, setIsClickedSearchBtn] = useState(false);
  const [leagueBoardData, setLeagueboardData] = useState(null);

  const searchBarRef = useRef(null);

  useEffect(() => {
    const setLeagueBoard = async () => {
      try {
        const response = await getLeagueBoard();
        setLeagueboardData(response);
      } catch (err) {
        throw new Error(err.messages || "리그 보드를 가져오는데 실패했습니다.");
      }
    };

    setLeagueBoard();
  }, []);

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
              <LeagueBoard leagueBoardData={leagueBoardData} />
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
