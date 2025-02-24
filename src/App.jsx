import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routerInfo } from "./router/RouterInfo";

function App() {
  return <RouterProvider router={routerInfo} />;
}

export default App;
