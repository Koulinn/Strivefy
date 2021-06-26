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


let dataFromAPI


const getDataFromAPI = async (query) => {
    try {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
        let dataRequested = await response.json()
        return dataRequested
    } catch (e) {
        return e
    }
}

const sendRequestToApi = async (userSearchValue) => {
    dataFromAPI = await getDataFromAPI(userSearchValue)
    loadPageHTML()
}


function loadPageHTML() {
    generateSections('Best_Music', 0, 7)
    generateSections('Chilling', 7, 14)
    generateSections('Relax', 14, 21)

}

window.onload = () => {
    sendRequestToApi('sun')
}









// Generate Sections
/** 
 * @param {String} sectionIdName , should has no space
 */

function generateSections(sectionIdName, sliceInitial, sliceFinal) {
    const sectionClasses = ['row', 'd-flex', 'flex-column', 'mt-3', 'py-0', 'px-4', 'm-0']
    let newSection = createHtmlContent('section', '', sectionClasses,
        'main', 'beforeend')
    newSection.id = sectionIdName
    generateSectionTitle(sectionIdName)
    generateCards(sectionIdName, sliceInitial, sliceFinal)
}


function generateSectionTitle(sectionTitle) {
    let sectionContainer = document.querySelector(`#${sectionTitle}`)
    let sectionTitleRemoved_ = sectionTitle.replace('_', ' ')



    sectionContainer.insertAdjacentHTML('afterbegin', `
         <div class="col-12 p-0 d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column">
            <h2 class="m-0">
              ${sectionTitleRemoved_}
            </h2>
            <span class="section-text-aux mt-1 mb-2">Latest music</span>
             </div>

          <span class="seeMore">SEE ALL</span>
        </div>
        <div class="col-12 d-flex px-0 cardDeck"></div>
        `)
}

function generateCards(sectionToInsert, sliceInitial, sliceEnd) {
    let sectionContainer = document.querySelector(`#${sectionToInsert} .cardDeck`)
    let data = dataFromAPI.data.slice(sliceInitial, sliceEnd)
    test = data

    data.forEach((data) => {
        sectionContainer.insertAdjacentHTML('afterbegin', `
            <div class="d-flex card col flex-nowrap card-square">
               <a class="position-relative" href="albumPage.html?album_Id=${data.album.id}">
                    <img src="${data.album.cover_medium}" class="card-img-top" alt="...">
                    <div class="position-absolute d-flex justify-content-center align-items-center cardPlayBtnBg">
                        <div class="cardPlayBtn">
                    
                         </div>
                    </div>
                </a>
                <div class="card-body card-bodymod px-0">
                <a href="albumPage.html?album_Id=${data.album.id}">
                    <h5 class="card-title card-title-mod">${data.album.title}</h5>
                </a>
                <a href="artistPage.html?album_Id=${data.album.id}">
                     <p class="card-text card-text-mod">${data.artist.name}</p>
                </a>
                </div>
            </div>
        `)
    })
    addColClassesToCards(sectionToInsert)

}


function addColClassesToCards(sectionTitle) {
    let allCards = document.querySelectorAll(`#${sectionTitle} .cardDeck > div`)
    allCards.forEach((card, index) => {

        if (index === 2) {
            card.classList.remove(`d-flex`)
            card.classList.add(`d-none`)
            card.classList.add(`d-md-flex`)
        }

        if (index >= 3 & index <= 4) {
            card.classList.remove(`d-flex`)
            card.classList.add(`d-none`)
            card.classList.add(`d-lg-flex`)
        }

        if (index >= 4) {
            card.classList.remove(`d-flex`)
            card.classList.add(`d-none`)
            card.classList.add(`d-xxl-flex`)
        }
    })
}


//card col flex-nowrap card-square d-none d-md-flex

//card col flex-nowrap d-none d-xxl-flex card-square














// Generate Li content sidebar
const btnCreatePlaylist = document.querySelector(
    "#nav-sideBar > div.sub-menu.mt-4 > ul > li:nth-child(1) > button"
);
btnCreatePlaylist.addEventListener("click", function () {
    createHtmlContent(
        "li",
        "Text Dynamically gen", [`w-100`, `pl-4`],
        "#nav-sideBar #scrolling-menu .scroll > ul",
        "beforeend"
    );
});