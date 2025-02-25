import PropTypes from "prop-types";
import "./Loading.css";

const Loading = ({ text }) => (
  <div className="loading-wrapper">
    <div className="loading-text">{text}</div>
    <div className="loading-opacity-box"></div>
  </div>
);

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loading;
