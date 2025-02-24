import PropTypes from "prop-types";
import "./LeagueBoardItem.css";

const LeagueBoardItem = ({ team, handleRowClick, idx }) => {
  return (
    <tr
      className="league-board-line"
      key={team.rank}
      onClick={(e) => handleRowClick(e, team.teamName, idx)}
    >
      <td>{team.ranking}</td>
      <td className="team-info">
        <img src={team.logo} alt={team.teamName} className="team-logo" />
        <span>{team.teamName}</span>
      </td>
      <td>{team.points}</td>
      <td>{team.totalPlayed}</td>
      <td>{team.totalWin}</td>
      <td>{team.totalDraw}</td>
      <td>{team.totalLose}</td>
      <td>{team.goalFor}</td>
      <td>{team.goalAgainst}</td>
      <td>{team.goalDifference}</td>
      <td>
        <div className="recent-results">
          {team.form.split("").map((result, index) => (
            <span
              key={index}
              className={`result-item ${
                result === "W" ? "win" : result === "D" ? "draw" : "lose"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default LeagueBoardItem;

LeagueBoardItem.propTypes = {
  team: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};
