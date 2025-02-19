import { useEffect, useRef, useState } from "react";
import "./LeagueBoard.css";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LeagueBoardItem from "./LeagueBoardItem";

const LeagueBoard = ({ dashboardMockData }) => {
  // isOpen = "wide" or "fold"
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(250);
  const [clickedRow, setClickedRow] = useState(null);

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.scrollHeight);
      console.log(tableRef.current.scrollHeight);
    }
  }, []);

  const onClickAnyRow = (rowNum) => {
    setClickedRow(rowNum);
  };

  return (
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
                rowIdx={idx}
                team={team}
                clickedRow={clickedRow}
                onClickAnyRow={onClickAnyRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isOpen ? (
        <IoIosArrowUp
          onClick={() => {
            setIsOpen(false);
            setClickedRow(null);
          }}
          size={32}
          style={{ color: "var(--text-primary)" }}
        />
      ) : (
        <IoIosArrowDown
          onClick={() => {
            setIsOpen(true);
            setClickedRow(null);
          }}
          size={32}
          style={{ color: "var(--text-primary)" }}
        />
      )}
    </div>
  );
};

export default LeagueBoard;

LeagueBoard.propTypes = {
  dashboardMockData: PropTypes.object.isRequired,
};
