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
 */

let test
function generateSections(sectionIdName) {
    const sectionClasses = ['row', 'd-flex', 'flex-column', 'mt-3', 'py-0', 'px-4', 'm-0']
    let newSection = createHtmlContent('section', '', sectionClasses,
        'main', 'beforeend')
    newSection.id = sectionIdName
    generateSectionTitle(sectionIdName)
}

generateSections('Best_Music')

function generateSectionTitle(sectionTitle){
    let sectionContainer = document.querySelector(`#${sectionTitle}`)
    let sectionTitleRemoved_ = sectionTitle.replace('_', ' ')
  


    sectionContainer.insertAdjacentHTML('afterbegin', `
         <div class="col-12 p-0 d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column">
            <h2 class="m-0">
              <a>${sectionTitleRemoved_}</a>
            </h2>
            <span class="section-text-aux mt-1 mb-2">Latest music</span>
             </div>

          <span class="seeMore">SEE ALL</span>
        </div>
        <div class="col-12 d-flex px-0 card-decker"></div>
        `)
}

function generateCards(sectionToInsert){
    let sectionContainer = document.querySelector(`#${sectionToInsert} .card-decker`)
    sectionContainer.insertAdjacentHTML('afterbegin',`
            <div class="card col d-flex flex-nowrap card-square">
                <img src="https://images.squarespace-cdn.com/content/v1/57a5229820099e8bfa2664b8/1582922019177-R5SJ6SKIQANSSBC989W2/ke17ZwdGBToddI8pDm48kJe0qEoc2cIEoNCZEG6czGwUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcNi17y6wQb1iplGo-NkoX1FIVeq1dKD15mhhBTseqgkUqQgLJ-z95FSy_0lgEAXPe/bossa-nova.JPG?format=500w" class="card-img-top" alt="...">
                <div class="card-body card-bodymod px-0">
                <h5 class="card-title card-title-mod">Card title</h5>
                <p class="card-text card-text-mod">Some quick example text to build on the card title and make up the bulk
                    of the card's content.</p>
                </div>
            </div>
    
    `)

}


















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