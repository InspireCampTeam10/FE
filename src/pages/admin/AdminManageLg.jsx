import { FiEdit } from "react-icons/fi";
import "./AdminManageLg.css";
import { useEffect, useState } from "react";
import { viewFootballLeague } from "../../api/AdminApi";
import { FaDownload } from "react-icons/fa";

const AdminManageLg = () => {
  const [leagueInfos, setleagueInfos] = useState([]);
  const [isExistLeagueBoard, setIsExistLeagueBoard] = useState(false);

  useEffect(() => {
    const getLeagueInfo = async () => {
      try {
        const response = await viewFootballLeague();
        if (response.isSuccess === false) {
          setIsExistLeagueBoard(false);
          return;
        }
        setIsExistLeagueBoard(true);
        setleagueInfos([response.message]);
      } catch (err) {
        throw new Error(err.message || "에러 발생");
      }
    };
    getLeagueInfo();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch("/team_kor.csv");
      if (!response.ok) {
        throw new Error("CSV 파일을 찾을 수 없습니다");
      }
      const csvText = await response.text();

      const blob = new Blob([csvText], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "team_kor.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV 다운로드 실패:", error);
    }
  };

  return (
    <>
      <div className="admin-m-league-wrapper">
        <div className="admin-m-league-file-download-container">
          <span>Current League Info</span>
          <button className="download-button" onClick={() => handleDownload()}>
            <span>Download</span>
            <FaDownload />
          </button>
        </div>
        {isExistLeagueBoard ? (
          <div className="admin-m-league-content">
            <div className="admin-m-league-table-container">
              <div className="admin-m-league-table-content-header"></div>
              <div className="admin-m-league-table-content">
                <table>
                  <colgroup>
                    <col width={50} />
                    <col width={50} />
                    <col width={80} />
                    <col width="*" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width={70} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <input type="checkbox" />
                      </th>
                      <th scope="col">No.</th>
                      <th scope="col">로고</th>
                      <th scope="col">리그 이름</th>
                      <th scope="col">국가</th>
                      <th scope="col">시즌</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueInfos.map((league, idx) => (
                      <tr key={idx}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{idx + 1}</td>
                        <td>
                          <img
                            src={league.logo}
                            alt={`${league.name} 로고`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                        <td>{league.name}</td>
                        <td>{league.country}</td>
                        <td>{league.season}</td>
                        <td>
                          <button className="icon-button edit">
                            <FiEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-m-league-no-data">
            <h2>Admin Home 페이지에서 데이터를 패치해주세요</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminManageLg;
