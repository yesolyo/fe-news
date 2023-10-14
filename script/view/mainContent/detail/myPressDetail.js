import { register } from "../grid/entirePressGrid";

export const insertMyMediaDetailData = (mediaInfo) => {
  const { imgSrc, modifiedTime } = mediaInfo;
  const box = $(".news_category_display");
  box.innerHTML = `
  <div class="category-display_header">
  <img class="display_header_logo" src="${imgSrc}"></img>
  <div class="display_header_date">${modifiedTime}</div>
  <button class="display_header_btn">+구독하기</button>
  </div>
`;
};

const insertMyMediaMainData = (mainContent) => {
  const { mainImgSrc, mainTitle } = mainContent;
  const box = $(".news_category_display");
  box.innerHTML += `
  <div class="category-display_news">
  <div class="display_main-news">
  <img src="${mainImgSrc}"/>
  <div class ="main-news_headline">${mainTitle}</div>
  </div>
  <div class="display_headline-news"></div>
  </div>
  `;
};

const insertMyHeadlineData = (subContent) => {
  const { subNewsList, noticeMessage } = subContent;
  const headLineNews = $(".display_headline-news");
  headLineNews.innerHTML = subNewsList.reduce((acc, data) => acc + `<span class= "headline-news">${data}</span>`, "");
  headLineNews.innerHTML += `<span class= "notice-message">${noticeMessage}</span>`;
};

const insertMyMainContent = ({ MediaInfo, MainContent, SubContent }) => {
  insertMyMediaDetailData(MediaInfo);
  insertMyMediaMainData(MainContent);
  insertMyHeadlineData(SubContent);
};

//돔 조작;

let mainContentObj = {
  currentPage: 0,
  categoryMenu: category.economy,
};
const onMyDetailBtnEvents = ({ rightBtn, leftBtn, categoryList, data }) => {
  categoryList.addEventListener("click", (event) => {
    mainContentObj.categoryMenu = event.target.textContent.trim();
    const { mediaInfo, mainContent, subContent } = data[mainContentObj.categoryMenu][mainContentObj.currentPage];
    insertMainContent({ MediaInfo: mediaInfo, MainContent: mainContent, SubContent: subContent });
  });

  rightBtn.addEventListener("click", () => {
    if (mainContentObj.currentPage === data[mainContentObj.categoryMenu].length) return;
    else {
      mainContentObj.currentPage += 1;
      const { mediaInfo, mainContent, subContent } = data[mainContentObj.categoryMenu][mainContentObj.currentPage];
      insertMainContent({ MediaInfo: mediaInfo, MainContent: mainContent, SubContent: subContent });
    }
  });

  leftBtn.addEventListener("click", () => {
    if (mainContentObj.currentPage === 0) return;
    else {
      mainContentObj.currentPage -= 1;
      const { mediaInfo, mainContent, subContent } = data[mainContentObj.categoryMenu][mainContentObj.currentPage];
      insertMainContent({ MediaInfo: mediaInfo, MainContent: mainContent, SubContent: subContent });
    }
  });
};

const updateMyMainContent = ({ interval, data }) => {
  let startTime = null;
  const { mediaInfo, mainContent, subContent } = data[mainContentObj.categoryMenu][mainContentObj.currentPage];
  const changeTime = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    if (progress >= interval) {
      insertMainContent({ MediaInfo: mediaInfo, MainContent: mainContent, SubContent: subContent });
      startTime = timestamp;
    }
    requestAnimationFrame(changeTime);
  };
  changeTime();
};

export const init = () => {
  const box=$(".")
  console.log(register.subscribeData.showPublishData);
};
