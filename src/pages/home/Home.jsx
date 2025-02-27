import { useEffect, useRef, useState } from "react";
import "./Home.css";
import SelectMenu from "./view/SelectMenu";
import LeagueBoard from "../../components/home/leagueboard/LeagueBoard";
import Searchbar from "../../components/home/searchbar/Searchbar";
import { IoIosArrowBack } from "react-icons/io";
import { postSearchApi } from "../../api/SearchApi";
import Loading from "../../components/loading/Loading";
import { useSearchTagStore } from "../../store/SearchStore";
import { useLeagueBoardStore } from "../../store/LeagueBoardStore";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { setCategoryTags, resetTags } = useSearchTagStore();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedSearchBtn, setIsClickedSearchBtn] = useState(false);
  const { leagueBoardData, setLeagueBoardData } = useLeagueBoardStore();

  const searchBarRef = useRef(null);

  useEffect(() => {
    if (!leagueBoardData) {
      setLeagueBoardData();
    }
    return () => {
      resetTags();
    };
  }, []);

  const toggleSelectTab = (clickedTab) => {
    setSelectedTab(clickedTab);
  };

  const handleSearchBtn = async ({ teams, league, otherInput }) => {
    const token = sessionStorage.getItem("access-token");
    if (!token) {
      alert("로그인 이후 사용해주세요");
      return;
    }

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
      if (response === false) {
        alert("사용 권한 확인 필요");
        return;
      }

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
      {leagueBoardData ? (
        !isClickedSearchBtn ? (
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
                ) : m.type === "assistant" ? (
                  <div className="home-board-msg-ai" key={idx}>
                    <span>{m.news.title}</span>
                    <p>{m.news.content}</p>
                  </div>
                ) : null
              )}
              {isLoading && (
                <div className="home-board-msg-ai">
                  <Loading text="답변을 생성하는 중입니다." />
                </div>
              )}
            </div>
            <Searchbar handleSearchBtn={handleSearchBtn} />
          </div>
        )
      ) : (
        <div className="home-no-data-container">
          <h2>초기 데이터가 세팅되지 않았습니다.</h2>
          <span>관리자 페이지에서 초기화 API를 호출해주세요</span>
        </div>
      )}
    </div>
  );
};

export default Home;
