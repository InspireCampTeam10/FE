import PropTypes from "prop-types";
import "./LeagueBoardItem.css";

const LeagueBoardItem = ({ team, handleRowClick, idx }) => {
  return (
    <tr
      className="league-board-line"
      key={team.rank}
      onClick={(e) => handleRowClick(e, team.name, idx)}
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
  );
};

export default LeagueBoardItem;

LeagueBoardItem.propTypes = {
  team: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};
