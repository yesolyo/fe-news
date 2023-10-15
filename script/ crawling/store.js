//// 해당 코드는 크롤링을 위한 코드입니다.
const getRollingData = () => {
  const dataList = [];
  const rollingData = document.querySelectorAll(".type02 li a strong");
  rollingData.forEach((data) => {
    dataList.push(data.innerText);
  });
  console.log(dataList);
};

const getNewsData = () => {
  const nextButton = document.querySelector(
    ".ContentPagingView-module__btn_next___ZBhby"
  );
  let result = [];
  let id = 1;

  nextButton.addEventListener("click", () => {
    const alt = document.querySelector(
      ".MediaNewsView-module__news_top___KTy0M img"
    ).alt;
    const src = document.querySelector(
      ".MediaNewsView-module__news_top___KTy0M img"
    ).src;
    const time = document.querySelector(
      ".MediaNewsView-module__news_top___KTy0M span"
    ).innerText;
    const mainNews = document.querySelector(
      ".MediaNewsView-module__news_desc___a55y9"
    );
    const mainNewsImg = mainNews.querySelector("img");
    const mainTitle = mainNews.querySelector(
      ".MediaNewsView-module__desc_title___IObEv"
    );
    let subNewsList = document.querySelectorAll(
      ".MediaNewsView-module__desc_list___uQ3r1 li"
    );
    const mediaType = document.querySelector(
      '.MediaOptionView-module__option_item___TytUT [aria-selected="true"]'
    ).textContent;

    subNewsList = Array.from(subNewsList).map((item) => item.textContent);
    const obj = {
      mediaId: id,
      mediaInfo: {
        type: mediaType,
        name: alt,
        imgSrc: src,
        modifiedTime: time,
      },
      mainContent: {
        mainImgSrc: mainNewsImg.src,
        mainTitle: mainTitle.textContent,
      },
      subContent: {
        subNewsList: subNewsList,
      },
    };
    result.push(obj);
    console.log(result);
    id++;
  });
};
