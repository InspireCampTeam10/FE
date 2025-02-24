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
      <h1 className="admin-title">관리자 조회</h1>
      <div className="admin-card-container">
        <div className="admin-card">
          <h2>리그 정보 조회</h2>
          <p className="admin-content">현재 등록된 리그 정보를 조회합니다.</p>
          <button
            className="admin-button"
            onClick={handleViewLeague}
            disabled={loading}
          >
            {loading ? "조회 중..." : "조회"}
          </button>
        </div>
        <div className="admin-card">
          <h2>팀 정보 조회</h2>
          <p className="admin-content">
            팀 아이디를 입력하여 해당 팀의 정보를 조회합니다.
          </p>
          <div className="admin-form-group">
            <label htmlFor="teamIdQuery">팀 ID</label>
            <input
              id="teamIdQuery"
              className="admin-input"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              placeholder="팀 아이디를 입력해주세요"
            />
          </div>
          <button
            className="admin-button"
            onClick={handleViewTeam}
            disabled={loading}
          >
            {loading ? "조회 중..." : "조회"}
          </button>
        </div>
      </div>
      <div className="admin-info">
        <p>
          ※ 데이터 변경 시 주의: 리그와 팀 정보를 정확하게 입력해주세요. 잘못된
          정보는 통계 데이터에 영향을 줄 수 있습니다.
        </p>
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
