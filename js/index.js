/**
 *
 * @param {String} HTMLTag
 * @param {String} innerText
 * @param {Array} ArrClassesToAdd
 * @param {String} HtmlNodeSelector
 * @param {String} positionToInsert
 */
function createHtmlContent(
  HTMLTag,
  innerText,
  ArrClassesToAdd,
  HtmlNodeSelector,
  positionToInsert
) {
  let htmlTagCreated = document.createElement(`${HTMLTag}`);
  htmlTagCreated.innerText = `${innerText}`;
  ArrClassesToAdd.forEach((element) => {
    htmlTagCreated.classList.add(`${element}`);
  });

  let htmlNode = document.querySelector(`${HtmlNodeSelector}`);

  htmlNode.insertAdjacentElement(`${positionToInsert}`, htmlTagCreated);
}

// Generate Li content sidebar
const btnCreatePlaylist = document.querySelector(
    '#nav-sideBar > div.sub-menu.mt-4 > ul > li:nth-child(1) > button'
);
btnCreatePlaylist.addEventListener("click", function () {
  console.log("clickdsdss"),
    createHtmlContent(
      "li",
      "Text Dynamically gen",
      [`w-100`, `pl-4`],
      "#nav-sideBar #scrolling-menu .scroll > ul",
      "beforeend"
    );
});


