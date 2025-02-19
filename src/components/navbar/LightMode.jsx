import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import "./LightMode.css";

const LightMode = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="light-mode-container" onClick={() => toggleTheme()}>
      {theme == "light" ? <CiLight /> : <FaMoon />}
    </div>
  );
};

export default LightMode;
