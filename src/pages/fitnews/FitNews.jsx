import { newsMockData } from "../../mock/NewsMockData";
import FitNewsItem from "./view/FitNewsItem";
import "./FitNews.css";
import { useState } from "react";

const FitNews = () => {
  const [someIsClicked, setSomeIsClicked] = useState(false);

  const handleClickSomeNews = () => {
    setSomeIsClicked(true);
  };

  const handleClickBackBtn = () => {
    setSomeIsClicked(false);
  };

  return (
    <div className="fit-news-wrapper">
      <div className="fit-news-title">Fit News</div>
      <div className="fit-news-container">
        {newsMockData.map((news, idx) => (
          <FitNewsItem
            key={idx}
            news={news}
            someIsClicked={someIsClicked}
            handleClickSomeNews={handleClickSomeNews}
            handleClickBackBtn={handleClickBackBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default FitNews;
