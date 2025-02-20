import { useEffect, useRef, useState } from "react";
import "./LeagueBoard.css";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LeagueBoardItem from "./LeagueBoardItem";
import searchTagStore from "../../../store/SearchStore";

const LeagueBoard = ({ dashboardMockData }) => {
  // isOpen = "wide" or "fold"
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
    const lastTd = tr.lastElementChild;
    const rect = lastTd.getBoundingClientRect();

    setButtonPosition({
      x: rect.right,
      y: rect.top,
    });
    setClickedTeamName(teamName);
  };

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.scrollHeight);
    }
  }, []);

  return (
    <>
      <div className="league-board-container" id="league-board">
        <span className="league-title">{dashboardMockData.league}</span>
        <div
          ref={tableRef}
          className={`league-board-contents ${isOpen ? "wide" : "fold"}`}
          style={{ height: isOpen ? `${tableHeight}px` : "250px" }}
        >
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>팀명</th>
                <th>승점</th>
                <th>경기</th>
                <th>승</th>
                <th>무</th>
                <th>패</th>
                <th>득점</th>
                <th>실점</th>
                <th>득실</th>
                <th>최근 5경기</th>
              </tr>
            </thead>
            <tbody>
              {dashboardMockData.teams.map((team, idx) => (
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
          <div className="league-board-arrow-btn">
            <IoIosArrowUp
              onClick={() => {
                setIsOpen(false);
                setShowButtons(false);
              }}
              size={32}
              style={{ color: "var(--text-primary)" }}
            />
          </div>
        ) : (
          <div className="league-board-arrow-btn">
            <IoIosArrowDown
              onClick={() => {
                setIsOpen(true);
                setShowButtons(false);
              }}
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
  dashboardMockData: PropTypes.object.isRequired,
};
