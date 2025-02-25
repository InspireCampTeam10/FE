import { useState } from "react";
import "./AdminHome.css";
import {
  footBallInit,
  footBallTeamInit,
  footBallUpdate,
  viewFootballLeague,
  viewFootballTeam,
} from "../../api/AdminApi";

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [msgBoxShow, setMsgBoxShow] = useState(false);
  const [msgContent, setMsgContent] = useState("");

  const [teamInfo, setTeamInfo] = useState({
    id: "",
    name: "",
    country: "",
    logo: null,
    city: "",
    venueName: "",
    venueImage: "",
  });

  const [leagueInfo, setLeagueInfo] = useState({
    name: "",
    country: "",
    logo: "",
    season: "",
  });

  const handleInitFootBall = async () => {
    const { isSuccess, message } = await footBallInit();
    setMsgBoxShow(true);
    setMsgContent(message);
  };

  const handleUpdateFootBall = async () => {
    const { isSuccess, message } = await footBallUpdate();
    setMsgBoxShow(true);
    setMsgContent(message);
  };

  const handleInitTeam = async () => {
    const { isSuccess, message } = await footBallTeamInit();
    setMsgBoxShow(true);
    setMsgContent(message);
  };

  const handleViewLeague = async () => {
    const { isSuccess, message } = await viewFootballLeague();
    setMsgBoxShow(true);
    setLeagueInfo({ ...message });
  };

  const handleViewTeam = async () => {
    if (teamId === "") {
      alert("팀 아이디를 입력해주세요");
      return;
    }
    const { isSuccess, message } = await viewFootballTeam(teamId);
    if (!isSuccess) {
      setMsgContent(message);
      setMsgBoxShow(true);
      return;
    }
    setMsgBoxShow(true);
    setTeamInfo({ ...message });
  };

  return (
    <div className="admin-home-wrapper">
      <h1 className="admin-title">초기화 API 호출</h1>
      <div className="admin-card-container">
        <div className="admin-card">
          <h2>데이터 초기화</h2>
          <p className="admin-content">
            리그, 팀, 순위 정보를 초기화하는 API를 호출합니다.
          </p>
          <button
            className="admin-button"
            onClick={handleInitFootBall}
            disabled={loading}
          >
            {loading ? "처리 중..." : "실행"}
          </button>
        </div>
        <div className="admin-card">
          <h2>팀 상세정보 초기화</h2>
          <p className="admin-content">
            팀의 상세 정보를 초기화하는 API를 호출합니다.
          </p>
          <button
            className="admin-button"
            onClick={handleInitTeam}
            disabled={loading}
          >
            {loading ? "처리 중..." : "실행"}
          </button>
        </div>
        <div className="admin-card">
          <h2>리그 순위 / 통계 최신화</h2>
          <p className="admin-content">
            RapidAPI를 호출하여 최신 통계 정보를 반영합니다.
          </p>
          <button
            className="admin-button"
            onClick={handleUpdateFootBall}
            disabled={loading}
          >
            {loading ? "처리 중..." : "실행"}
          </button>
        </div>
      </div>
      {msgBoxShow && (
        <>
          <div
            className="admin-home-msg-box-overlay"
            onClick={() => setMsgBoxShow(false)}
          ></div>
          <div className="admin-home-msg-box-container">
            <div className="admin-home-msg-title">작업 결과</div>
            <div className="admin-home-msg-content">
              {msgContent !== "" ? (
                msgContent
              ) : leagueInfo !== "" ? (
                <div className="admin-home-msg-league">
                  <span>{leagueInfo.name}</span>
                  <span>{leagueInfo.country}</span>
                  <span>{leagueInfo.season}</span>
                </div>
              ) : (
                <div className="admin-home-msg-league">
                  <span>{teamInfo.name}</span>
                  <span>{teamInfo.city}</span>
                  <span>{teamInfo.country}</span>
                  <span>{teamInfo.venueName}</span>
                </div>
              )}
            </div>
            <button
              className="admin-home-msg-close"
              onClick={() => {
                setMsgBoxShow(false);
                setMsgContent("");
                setLeagueInfo("");
                setTeamInfo("");
              }}
            >
              확인
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
