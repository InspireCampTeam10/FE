import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./LeagueBoardItem.css";

const LeagueBoardItem = ({ team, rowIdx, clickedRow, onClickAnyRow }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  console.log("clickedRow : ", clickedRow);

  const handleRowClick = (e) => {
    const tr = e.currentTarget;
    const lastTd = tr.lastElementChild;
    const rect = lastTd.getBoundingClientRect();

    setButtonPosition({
      x: rect.right,
      y: rect.top,
    });
    setShowButtons(true);
    onClickAnyRow(rowIdx);
  };

  useEffect(() => {
    clickedRow !== rowIdx && setShowButtons(false);
  }, [clickedRow, rowIdx]);

  return (
    <>
      <tr
        className="league-board-line"
        key={team.rank}
        onClick={handleRowClick}
      >
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
                  result === "W" ? "win" : result === "D" ? "draw" : "lose"
                }`}
              >
                {result}
              </span>
            ))}
          </div>
        </td>
      </tr>
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
              // 추가 로직 작성 필요
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

export default LeagueBoardItem;

LeagueBoardItem.propTypes = {
  team: PropTypes.object.isRequired,
  rowIdx: PropTypes.number.isRequired,
  clickedRow: PropTypes.any.isRequired,
  onClickAnyRow: PropTypes.func.isRequired,
};
