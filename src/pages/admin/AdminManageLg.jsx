import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./AdminManageLg.css";
import { useEffect, useState } from "react";
import { viewFootballLeague } from "../../api/AdminApi";

const AdminManageLg = () => {
  const [leagueInfos, setleagueInfos] = useState([]);

  useEffect(() => {
    const getLeagueInfo = async () => {
      const response = await viewFootballLeague();
      setleagueInfos([response.message]);
    };
    getLeagueInfo();
  }, []);

  return (
    <div className="admin-m-league-wrapper">
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
                <col width={50} />
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
                    <td>
                      <button className="icon-button delete">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageLg;
