import "./History.css";
import { useState } from "react";
import HistoryItem from "./view/HistoryItem";
import { historyStore } from "../../store/HistoryStore";

const History = () => {
  const [someIsClicked, setSomeIsClicked] = useState(false);
  const { histories } = historyStore();

  const handleClickSomeNews = () => {
    setSomeIsClicked(true);
  };

  const handleClickBackBtn = () => {
    setSomeIsClicked(false);
  };

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
