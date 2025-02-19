import { useEffect, useRef, useState } from "react";
import "./LeagueBoard.css";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LeagueBoard = ({ dashboardMockData }) => {
  // isOpen = "wide" or "fold"
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(250);

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.scrollHeight);
      console.log(tableRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="league-board-container">
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
            {dashboardMockData.teams.map((team) => (
              <tr className="league-board-line" key={team.rank}>
                <td>{team.rank}</td>
                <td>{team.name}</td>
                <td>{team.points}</td>
                <td>{team.played}</td>
                <td>{team.win}</td>
                <td>{team.draw}</td>
                <td>{team.lose}</td>
                <td>{team.goals.for}</td>
                <td>{team.goals.against}</td>
                <td>{Number(team.goals.for) - Number(team.goals.against)}</td>
                <td>
                  <div className="form-container">
                    {team.form.split("").map((result, index) => (
                      <span
                        key={index}
                        className={`form-result ${
                          result === "W"
                            ? "win"
                            : result === "D"
                              ? "draw"
                              : "lose"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen ? (
        <IoIosArrowUp onClick={() => setIsOpen(false)} size={32} />
      ) : (
        <IoIosArrowDown onClick={() => setIsOpen(true)} size={32} />
      )}
    </div>
  );
};

export default LeagueBoard;

LeagueBoard.propTypes = {
  dashboardMockData: PropTypes.object.isRequired,
};
