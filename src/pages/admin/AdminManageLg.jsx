import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./AdminManageLg.css";

const AdminManageLg = () => {
  return (
    <div className="admin-m-league-wrapper">
      <div className="admin-m-league-content">
        <div className="admin-m-league-card-container">
          <div className="admin-m-league-content-info-card">
            <span className="title">등록된 리그</span>
            <span className="number">1</span>
          </div>
        </div>
        <div className="admin-m-league-table-container">
          <div className="admin-m-league-table-content-header">
            {/* <button className="filter-button">Filter</button> */}
          </div>
          <div className="admin-m-league-table-content">
            <table>
              <colgroup>
                <col width={50} />
                <col width={50} />
                <col width="15%" />
                <col width="*" />
                <col width="15%" />
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
                  <th scope="col">리그 이름</th>
                  <th scope="col">리그 기간</th>
                  <th scope="col">생성자</th>
                  <th scope="col">생성 날짜</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>1</td>
                  <td>2024 봄 리그</td>
                  <td>2024.03.01 - 2024.05.31</td>
                  <td>관리자</td>
                  <td>2024.02.20</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageLg;
