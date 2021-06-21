/**
 *
 * @param {String} HTMLTag
 * @param {String} innerText
 * @param {Array} ArrClassesToAdd
 * @param {String} HtmlNodeSelector
 * @param {String} positionToInsert
 * if no value is needed pass an empty typeof that param
 * 
 */
function createHtmlContent(HTMLTag, innerText, ArrClassesToAdd, HtmlNodeSelector, positionToInsert) {
    let htmlTagCreated = document.createElement(`${HTMLTag}`)
    htmlTagCreated.innerText = `${innerText}`

    if (ArrClassesToAdd.length != [])
        ArrClassesToAdd.forEach((element) => {
            htmlTagCreated.classList.add(`${element}`)
        })
    let htmlNode = document.querySelector(`${HtmlNodeSelector}`)
    return htmlNode.insertAdjacentElement(`${positionToInsert}`, htmlTagCreated)
}



// Generate Sections
/** 
 * @param {String} sectionIdName , should has no space
 * @param {Array} arrWithClasses
 */

const sectionClasses = ['row', 'd-flex', 'flex-column', 'mt-3', 'py-0', 'px-4', 'm-0']

function generateSections(sectionIdName, arrWithClasses) {
    let newSection = createHtmlContent('section', '', arrWithClasses,
        'main', 'beforeend')
    newSection.id = sectionIdName
}

generateSections('newSection', sectionClasses)

// Generate Divs
/** 
 * @param {Array} divClasses
 * @param {String} nodeToInsertQSelector
 */

function generateDivs(divClasses, nodeToInsertQSelector) {
    let newDiv = createHtmlContent('div', '', divClasses, nodeToInsertQSelector, 'beforeend')
}

const classesFromFirstDivSection = ['col-12', 'p-0', 'd-flex', 'justify-content-between', 'align-items-center']
const sectionSelector = `#newSection`

generateDivs(classesFromFirstDivSection, sectionSelector)






// Generate Li content sidebar
const btnCreatePlaylist = document.querySelector(
    "#nav-sideBar > div.sub-menu.mt-4 > ul > li:nth-child(1) > button"
);
btnCreatePlaylist.addEventListener("click", function() {
    console.log("clickdsdss"),
        createHtmlContent(
            "li",
            "Text Dynamically gen", [`w-100`, `pl-4`],
            "#nav-sideBar #scrolling-menu .scroll > ul",
            "beforeend"
        );
});