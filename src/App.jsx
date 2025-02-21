import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routerInfo } from "./router/RouterInfo";
import { historyStore } from "./store/HistoryStore";
import { useEffect } from "react";
import { getHistory } from "./api/HistoryApi";

function App() {
  const { setHistoryArr } = historyStore();

  useEffect(() => {
    const response = getHistory();
    setHistoryArr(response);
  }, []);

  return <RouterProvider router={routerInfo} />;
}

export default App;
