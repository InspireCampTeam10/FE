import "./History.css";
import { useEffect, useState } from "react";
import HistoryItem from "./view/HistoryItem";
import { getHistory } from "../../api/HistoryApi";
import { useHistoryStore } from "../../store/HistoryStore";

const History = () => {
  const [someIsClicked, setSomeIsClicked] = useState(false);
  const { histories, setHistoryArr } = useHistoryStore();
  const token = sessionStorage.getItem("access-token");
  const onLogin = token && true;
  const onLoginWithData = token && histories.length !== 0;

  const handleClickSomeNews = () => {
    setSomeIsClicked(true);
  };

  const handleClickBackBtn = () => {
    setSomeIsClicked(false);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        if (!response) {
          setHistoryArr("");
          return;
        }
        setHistoryArr(response);
      } catch (err) {
        console.error("History를 가져오는데 실패했습니다:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-wrapper">
      <div className="history-title">My History News</div>
      {onLoginWithData ? (
        <div className={`history-container ${someIsClicked ? "overlay" : ""}`}>
          {histories.map((history, idx) => (
            <HistoryItem
              key={idx}
              history={history}
              someIsClicked={someIsClicked}
              handleClickSomeNews={handleClickSomeNews}
              handleClickBackBtn={handleClickBackBtn}
            />
          ))}
        </div>
      ) : onLogin ? (
        <div className="history-msg-container">
          <span>아직 생성된 히스토리가 없습니다.</span>
        </div>
      ) : (
        <div className="history-msg-container">
          <span>로그인 이후 사용 가능합니다</span>
        </div>
      )}
    </div>
  );
};

export default History;
