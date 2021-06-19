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
  "#nav-sideBar > div.sub-menu > ul > li.d-flex.align-items-center.my-2.w-100 > button"
);
btnCreatePlaylist.addEventListener("click", function () {
  console.log("clickdsdss"),
    createHtmlContent(
      "li",
      "Text Dynamically gen",
      [],
      "#nav-sideBar #scrolling-menu .scroll > ul",
      "beforeend"
    );
});


