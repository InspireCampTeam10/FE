import { useEffect, useRef, useState } from "react";
import "./LeagueBoard.css";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LeagueBoardItem from "./LeagueBoardItem";
import searchTagStore from "../../../store/SearchStore";

const LeagueBoard = ({ leagueBoardData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(250);
  const [showButtons, setShowButtons] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [clickedTeamName, setClickedTeamName] = useState("");
  const { addTag } = searchTagStore();

  const handleRowClick = (e, teamName) => {
    setShowButtons(true);

    const tr = e.currentTarget;
    const secondId = tr.children[1];
    const rect = secondId.getBoundingClientRect();

    setButtonPosition({
      x: rect.right,
      y: rect.top,
    });
    setClickedTeamName(teamName);
  };

  const handleClickPosition = (e) => {
    const inX =
      e.clientX >= buttonPosition.x && e.clientX <= buttonPosition.x + 100;
    const inY =
      e.clientY >= buttonPosition.y && e.clientY <= buttonPosition.y + 50;

    if (!inX && !inY) {
      setShowButtons(false);
    }
  };

  useEffect(() => {
    if (showButtons) {
      document.addEventListener("click", handleClickPosition);
      document.addEventListener("scroll", handleClickPosition);

      return () => {
        document.removeEventListener("click", handleClickPosition);
        document.removeEventListener("scroll", handleClickPosition);
      };
    }
  }, [showButtons, buttonPosition]);

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.scrollHeight);
    }
  }, []);

  return (
    <>
      <div className="league-board-container" id="league-board">
        <div className="league-title-container">
          <img
            src={leagueBoardData.leagueLogo}
            alt={leagueBoardData.leagueName}
            className="league-logo"
          />
          <span className="league-title">{leagueBoardData.leagueName}</span>
        </div>
        <div
          ref={tableRef}
          className={`league-board-contents ${isOpen ? "wide" : "fold"}`}
          style={{ height: isOpen ? `${tableHeight}px` : "250px" }}
        >
          <table>
            <colgroup>
              <col width={70} />
              <col width="*" />
              <col width={70} />
              <col width={70} />
              <col width={70} />
              <col width={70} />
              <col width={70} />
              <col width={70} />
              <col width={70} />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">팀</th>
                <th scope="col">승점</th>
                <th scope="col">경기</th>
                <th scope="col">승</th>
                <th scope="col">무</th>
                <th scope="col">패</th>
                <th scope="col">득점</th>
                <th scope="col">실점</th>
                <th scope="col">득실</th>
                <th scope="col">최근 5경기</th>
              </tr>
            </thead>
            <tbody>
              {leagueBoardData.standingResponseDTOList.map((team, idx) => (
                <LeagueBoardItem
                  key={idx}
                  idx={idx}
                  team={team}
                  handleRowClick={handleRowClick}
                />
              ))}
            </tbody>
          </table>
        </div>
        {isOpen ? (
          <div
            className="league-board-arrow-btn"
            onClick={() => {
              setIsOpen(false);
              setShowButtons(false);
            }}
          >
            <IoIosArrowUp size={32} style={{ color: "var(--text-primary)" }} />
          </div>
        ) : (
          <div
            className="league-board-arrow-btn"
            onClick={() => {
              setIsOpen(true);
              setShowButtons(false);
            }}
          >
            <IoIosArrowDown
              size={32}
              style={{ color: "var(--text-primary)" }}
            />
          </div>
        )}
      </div>
      {showButtons && (
        <div
          className="action-buttons"
          style={{
            position: "fixed",
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            zIndex: 1000,
          }}
        >
          <button
            className="add-button"
            onClick={() => {
              addTag(clickedTeamName);
              setShowButtons(false);
            }}
          >
            추가
          </button>
          <button
            className="favorite-button"
            onClick={() => {
              // 찜하기 로직 작성 필요
              setShowButtons(false);
            }}
          >
            찜하기
          </button>
        </div>
      )}
    </>
  );
};

export default LeagueBoard;

LeagueBoard.propTypes = {
  leagueBoardData: PropTypes.object.isRequired,
};
