import PropTypes from "prop-types";
import "./FitNewsItem.css";
import { useState } from "react";

// {
//     title:
//       "손흥민, EPL 이달의 선수상 후보 선정... 리버풀전 해트트릭 등 5골 기록",
//     date: "2024-02-20",
//     content:
//       "토트넘 홋스퍼의 손흥민이 2월 프리미어리그 이달의 선수상 후보에 올랐다. 손흥민은 2월 한 달간 리그에서 5골을 기록했으며, 특히 리버풀과의 경기에서 해트트릭을 달성하며 팀의 4-2 승리를 이끌었다. 현재 시즌 18호 골을 기록 중인 손흥민은 득점 순위 3위를 기록하고 있다.",
//     source: "스포츠조선",
//   },

// const FitNewsItem = ({
//   news,
//   someIsClicked,
//   handleClickSomeNews,
//   handleClickBackBtn,
// }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const handleBackClick = (e) => {
//     e.stopPropagation();
//     setIsClicked(false);
//     handleClickBackBtn();
//   };

//   const wide = isClicked && someIsClicked;
//   const fold = !isClicked && someIsClicked;
//   const none = !someIsClicked;

//   return (
//     <div
//       className={`fit-news-item-container ${none ? "none" : wide ? "wide" : fold && "fold"}`}
//       onClick={() => {
//         setIsClicked(true);
//         handleClickSomeNews();
//       }}
//     >
//       {wide && <div onClick={handleBackClick}>뒤로가기</div>}
//       <div className="fit-news-item-image">
//         {/* <img src={news.image} alt={news.title} /> */}
//         이미지
//       </div>
//       <div className="fit-news-item-header">
//         <span className="fit-news-item-title">{news.title}</span>
//         <span className="fit-news-item-date">{news.date}</span>
//       </div>
//       <div className="fit-news-item-body">
//         <p className="fit-news-item-content">{news.content}</p>
//       </div>
//       <div className="fit-news-item-footer">
//         <span className="fit-news-item-source">{news.source}</span>
//       </div>
//     </div>
//   );
// };

const FitNewsItem = ({
  news,
  someIsClicked,
  handleClickSomeNews,
  handleClickBackBtn,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleBackClick = (e) => {
    e.stopPropagation();
    setIsClicked(false);
    handleClickBackBtn();
  };

  const wide = isClicked && someIsClicked;
  const fold = !isClicked && someIsClicked;
  const none = !someIsClicked;

  return (
    <>
      {wide && <div className="overlay show" onClick={handleBackClick} />}
      <div
        className={`fit-news-item-container ${none ? "none" : wide ? "wide" : fold && "fold"}`}
        onClick={() => {
          if (!someIsClicked) {
            setIsClicked(true);
            handleClickSomeNews();
          }
        }}
      >
        {wide && (
          <button className="back-button" onClick={handleBackClick}>
            뒤로가기
          </button>
        )}
        <div className="fit-news-item-image">
          {/* <img src={news.image} alt={news.title} /> */}
          이미지
        </div>
        <div className="fit-news-item-header">
          <span className="fit-news-item-title">{news.title}</span>
          <span className="fit-news-item-date">{news.date}</span>
        </div>
        <div className="fit-news-item-body">
          <p className="fit-news-item-content">{news.content}</p>
        </div>
        <div className="fit-news-item-footer">
          <span className="fit-news-item-source">{news.source}</span>
        </div>
      </div>
    </>
  );
};

export default FitNewsItem;

FitNewsItem.propTypes = {
  news: PropTypes.object.isRequired,
  someIsClicked: PropTypes.bool.isRequired,
  handleClickSomeNews: PropTypes.func.isRequired,
  handleClickBackBtn: PropTypes.func.isRequired,
};
