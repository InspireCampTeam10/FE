import "./DashBoard.css";

const dashboardMockData = {
  league: "프리미어 리그",
  teams: [
    {
      name: "리버풀",
      rank: "1",
      points: "60",
      played: "25",
      win: "18",
      draw: "6",
      lose: "1",
      goals: {
        for: "60",
        against: "24",
      },
      form: "WDWWW",
    },
    {
      name: "아스널",
      rank: "2",
      points: "53",
      played: "25",
      win: "15",
      draw: "8",
      lose: "2",
      goals: {
        for: "51",
        against: "22",
      },
      form: "WWWDW",
    },
    {
      name: "노팅엄 포레스트",
      rank: "3",
      points: "47",
      played: "25",
      win: "14",
      draw: "5",
      lose: "6",
      goals: {
        for: "41",
        against: "29",
      },
      form: "LWLWD",
    },
    {
      name: "맨체스터 시티",
      rank: "4",
      points: "44",
      played: "25",
      win: "13",
      draw: "5",
      lose: "7",
      goals: {
        for: "52",
        against: "35",
      },
      form: "WLWWD",
    },
    {
      name: "본머스",
      rank: "5",
      points: "43",
      played: "25",
      win: "12",
      draw: "7",
      lose: "6",
      goals: {
        for: "44",
        against: "29",
      },
      form: "WLWWD",
    },
  ],
};

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <span className="league-title">{dashboardMockData.league}</span>
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
            <tr className="dashboard-line" key={team.rank}>
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
  );
};

export default DashBoard;
