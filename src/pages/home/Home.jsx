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
  // const [userMessages, setUserMessages] = useState([]);

  const containerRef = useRef(null);
  const messageEndRef = useRef(null);

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

    try {
      // TODO : API 호출 로직으로 변경 필요
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Data
      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: "이것은 AI의 응답입니다...",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setCategoryTags(selectedTab);
  }, [selectedTab]);

  return (
    <div className="home-container" ref={containerRef}>
      <div className="home-content-container">
        {messages.length === 0 ? (
          <div
            className={`home-initial-content ${messages.length > 0 ? "slide-up" : ""}`}
          >
            <SelectMenu
              toggleSelectTab={toggleSelectTab}
              selectedTab={selectedTab}
            />
            <div className="content-container">
              {(selectedTab.includes("팀 뉴스") ||
                selectedTab.includes("경기 뉴스")) && (
                <LeagueBoard dashboardMockData={dashboardMockData} />
              )}
              <Searchbar handleSearchBtn={handleSearchBtn} />
            </div>
          </div>
        ) : (
          <>
            <div className="home-msg-container">
              <div className="home-msg-user">
                {messages.map((msg) =>
                  msg.type === "user" ? (
                    <div key={msg.id} className={`user-message`}>
                      {msg.content}
                    </div>
                  ) : (
                    <div key={msg.id} className={`message`}>
                      {msg.content}
                    </div>
                  )
                )}
              </div>
              {isLoading && (
                <div className="message-loading">
                  답변을 생성하고 있습니다...
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
            <Searchbar handleSearchBtn={handleSearchBtn} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
