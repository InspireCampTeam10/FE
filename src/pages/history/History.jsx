import "./History.css";
import { useEffect, useState } from "react";
import HistoryItem from "./view/HistoryItem";
import { historyStore } from "../../store/HistoryStore";
import { getHistory } from "../../api/HistoryApi";

const History = () => {
  const [someIsClicked, setSomeIsClicked] = useState(false);
  const { histories, setHistoryArr } = historyStore();

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
        console.log("여기로 넘어오는 데이터 : ", response);
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
    </div>
  );
};

export default History;
