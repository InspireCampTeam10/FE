import PropTypes from "prop-types";
import "./HistoryItem.css";
import { useState } from "react";
import { historyStore } from "../../../store/HistoryStore";

const HistoryItem = ({
  history,
  someIsClicked,
  handleClickSomeNews,
  handleClickBackBtn,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const { removeHistory } = historyStore();

  const handleBackClick = (e) => {
    e.stopPropagation();
    setIsClicked(false);
    handleClickBackBtn();
  };

  const wide = isClicked && someIsClicked;
  const fold = !isClicked && someIsClicked;
  const none = !someIsClicked;

  return (
    <>
      <div
        className={`history-item-container ${none ? "none" : wide ? "wide" : fold && "fold"}`}
        onClick={() => {
          if (!someIsClicked) {
            setIsClicked(true);
            handleClickSomeNews();
          }
        }}
      >
        {wide && (
          <div className="history-item-container-header">
            <button className="back-button" onClick={handleBackClick}>
              뒤로가기
            </button>
            <button
              className="delete-button"
              onClick={(e) => {
                removeHistory(history.id);
                handleBackClick(e);
              }}
            >
              삭제하기
            </button>
          </div>
        )}
        <div
          className={`history-item-header ${none ? "none" : wide ? "wide" : fold && "fold"}`}
        >
          <span
            className={`history-item-title ${none ? "none" : wide ? "wide" : fold && "fold"}`}
          >
            {history.title}
          </span>
          <span
            className={`history-item-date ${none ? "none" : wide ? "wide" : fold && "fold"}`}
          >
            {history.timestamp}
          </span>
        </div>
        <div
          className={`history-item-body ${none ? "none" : wide ? "wide" : fold && "fold"}`}
        >
          <p
            className={`history-item-content ${none ? "none" : wide ? "wide" : fold && "fold"}`}
          >
            {history.summary}
          </p>
        </div>
      </div>
    </>
  );
};

export default HistoryItem;

HistoryItem.propTypes = {
  history: PropTypes.object.isRequired,
  someIsClicked: PropTypes.bool.isRequired,
  handleClickSomeNews: PropTypes.func.isRequired,
  handleClickBackBtn: PropTypes.func.isRequired,
};
