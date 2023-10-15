import { $ } from "../../../utils/dom.js";
import { category } from "../../../constants/dom.js";

//버튼 조작
export const changeNewsDetailColor = () => {
  const detailCircle = document
    .getElementById("company__view_detail")
    .contentDocument.querySelector("path");
  const logoCircle = document
    .getElementById("company__view_logo")
    .contentDocument.querySelector("path");
  detailCircle.addEventListener("click", () => {
    detailCircle.setAttribute("fill", "#4362d0");
    logoCircle.setAttribute("fill", "#d2dae0");
  });
  logoCircle.addEventListener("click", () => {
    detailCircle.setAttribute("fill", "#d2dae0");
    logoCircle.setAttribute("fill", "#4362d0");
  });
  changeNewsDetailDisplay();
};

const changeNewsDetailDisplay = () => {
  const detailCircle = document
    .getElementById("company__view_detail")
    .contentDocument.querySelector("path");
  const logoCircle = document
    .getElementById("company__view_logo")
    .contentDocument.querySelector("path");
  const allDisplay = $(".news-company__grid");
  const detailDisplay = $(".news-company__detail");
  detailCircle.addEventListener("click", () => {
    allDisplay.classList.add("none");
    detailDisplay.classList.remove("none");
  });
  logoCircle.addEventListener("click", () => {
    allDisplay.classList.remove("none");
    detailDisplay.classList.add("none");
  });
};

export const insertMediaDetailData = (mediaInfo) => {
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

const insertMediaMainData = (mainContent) => {
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

const insertHeadlineData = (subContent) => {
  const { subNewsList, noticeMessage } = subContent;
  const headLineNews = $(".display_headline-news");
  headLineNews.innerHTML = subNewsList.reduce(
    (acc, data) => acc + `<span class= "headline-news">${data}</span>`,
    ""
  );
};

const insertMainContent = ({ MediaInfo, MainContent, SubContent }) => {
  insertMediaDetailData(MediaInfo);
  insertMediaMainData(MainContent);
  insertHeadlineData(SubContent);
};

//돔 조작;

let mainContentObj = {
  currentPage: 0,
  categoryMenu: category.economy,
};
const onDetailBtnEvents = ({ rightBtn, leftBtn, categoryList, data }) => {
  categoryList.addEventListener("click", (event) => {
    mainContentObj.categoryMenu = event.target.textContent.trim();
    const { mediaInfo, mainContent, subContent } =
      data[mainContentObj.categoryMenu][mainContentObj.currentPage];
    insertMainContent({
      MediaInfo: mediaInfo,
      MainContent: mainContent,
      SubContent: subContent,
    });
  });

  rightBtn.addEventListener("click", () => {
    if (mainContentObj.currentPage === data[mainContentObj.categoryMenu].length)
      return;
    else {
      mainContentObj.currentPage += 1;
      const { mediaInfo, mainContent, subContent } =
        data[mainContentObj.categoryMenu][mainContentObj.currentPage];
      insertMainContent({
        MediaInfo: mediaInfo,
        MainContent: mainContent,
        SubContent: subContent,
      });
    }
  });

  leftBtn.addEventListener("click", () => {
    if (mainContentObj.currentPage === 0) return;
    else {
      mainContentObj.currentPage -= 1;
      const { mediaInfo, mainContent, subContent } =
        data[mainContentObj.categoryMenu][mainContentObj.currentPage];
      insertMainContent({
        MediaInfo: mediaInfo,
        MainContent: mainContent,
        SubContent: subContent,
      });
    }
  });
};

const updateMainContent = ({ interval, data }) => {
  let startTime = null;
  const { mediaInfo, mainContent, subContent } =
    data[mainContentObj.categoryMenu][mainContentObj.currentPage];
  const changeTime = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    if (progress >= interval) {
      insertMainContent({
        MediaInfo: mediaInfo,
        MainContent: mainContent,
        SubContent: subContent,
      });
      startTime = timestamp;
    }
    requestAnimationFrame(changeTime);
  };
  changeTime();
};

export const reciveDetailData = (mediaDetailData) => {
  const { mediaInfo, mainContent, subContent } =
    mediaDetailData[mainContentObj.categoryMenu][mainContentObj.currentPage];
  insertMainContent({
    MediaInfo: mediaInfo,
    MainContent: mainContent,
    SubContent: subContent,
  });
  onDetailBtnEvents({
    rightBtn: $(".detail_btn-right"),
    leftBtn: $(".detail_btn-left"),
    categoryList: $(".news_category-bar"),
    data: mediaDetailData,
  });
};
