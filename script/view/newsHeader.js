const insertDate = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" };
  return `<span class="date_text">${today.toLocaleDateString("ko-KO", options)}</span>`;
};
const newsHeaderTemplate = () =>
  `<div class="news__header">
  <div class="heder__logo">
  <a onClick="window.location.reload()" style="cursor: pointer;">
  <img class = "logo_img" src="assets/newsPaper.svg"></a>
  <span class= "logo_text">뉴스스탠드</span>
  </div>
  <div class="header__date">${insertDate()}</div>
  </div>`;

const viewNewsHeader = () => {
  const root = document.querySelector(".root");
  const newsHeader = document.createElement("header");
  root.appendChild(newsHeader);
  newsHeader.innerHTML = newsHeaderTemplate();
};

export { viewNewsHeader };
