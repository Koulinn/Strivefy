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


let dataFromSearch = {}
let dataFromAlbum = {}
let aux = 0


const getDataFromAPI = async (query, endpoint = 'search?q=') => {
    try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/${endpoint}` + query)
        let dataRequested = await response.json()
        return dataRequested
    } catch (e) {
        return e
    }
}

// storeData needs to be an empty object
const sendRequestToApi = async (storeData, userSearchValue, requestedEndpoint) => {
    let tempData
    tempData = await getDataFromAPI(userSearchValue, requestedEndpoint)
    Object.assign(storeData, tempData)
}

async function loadCards(storeData, userSearchValue, requestedEndpoint) {
    await sendRequestToApi(storeData, userSearchValue)
    loadCardSections()

}


function loadCardSections() {
    generateSections('Best_Music', 0, 7)
    generateSections('Chilling', 7, 14)
    generateSections('Relax', 14, 21)

}

window.onload = () => {
    loadCards(dataFromSearch,'sun')
    let albumId = new URLSearchParams(window.location.search).get("album_Id")
    console
    let albumEndpoint = 'album/'
    if(albumId != undefined)
    loadAlbumDetails(albumId, albumEndpoint)
    
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
        <div class="row d-flex px-0 cardDeck"></div>
        `)
}

function generateCards(sectionToInsert, sliceInitial, sliceEnd) {
    let sectionContainer = document.querySelector(`#${sectionToInsert} .cardDeck`)
    let data = dataFromSearch.data.slice(sliceInitial, sliceEnd)

    data.forEach((data) => {
        sectionContainer.insertAdjacentHTML('afterbegin', `
            <div class="d-flex card col flex-nowrap card-square">
               <div class="position-relative">
                    <div class="position-absolute d-flex justify-content-center align-items-center cardPlayBtnBg" value="${data.album.id}" onclick="getTrackFromAPI(event)">
                        <div class="cardPlayBtn">
                        </div>
                    </div>
                    <a href="albumPage.html?album_Id=${data.album.id}">
                        <img src="${data.album.cover_medium}" class="card-img-top" alt="...">
                    </a>
               </div>
                <div class="card-body card-bodymod px-0">
                <a href="albumPage.html?album_Id=${data.album.id}">
                    <h5 class="card-title text-truncate card-title-mod">${data.album.title}</h5>
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





// Album page 

function setAlbumInfoHTML(albumImgSrc, albumTitle, artistName, fans, nbTracks, duration, genre){
    return `
        <section id="albumCover" class="row d-flex flex-column mt-3 py-0 px-4 m-0">
            <div class=" col-12 jumbotron jumbotron-fluid bg-transparent p-0">
                <div class="container d-flex p-0 m-0">
                    <div class="d-inline-block album-img">
                        <img src="${albumImgSrc}" alt="">
                                </div>
                        <div class="d-flex flex-column justify-content-end ml-4">
                           <div class="pb-3">
                                <span class="seeMore"> ${genre} </span>
                                <h1 class="m-0">${albumTitle}</h1>
                           </div>
                            <div class="albumStats">
                                <p class="mb-2">${artistName}</p>
                                <div class="d-flex">
                                    <p class="mb-0">
                                        <span><a>Spotify</a></span>
                                        <span>.</span>
                                        <span>${fans} fans</span>
                                        <span>.</span>
                                        <span>${nbTracks}, songs</span>
                                        <span>Songs</span>
                                        <span id="albumTotalDur"> ${duration}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>  
    `
}

function loadAlbumInfo(){
    let htmlToInsert = document.querySelector('header#topBar')
    
    let imgSrc = dataFromAlbum.cover_medium
    let albumTitle = dataFromAlbum.title
    let artistName = dataFromAlbum.artist.name
    let nbFans = dataFromAlbum.fans
    let nbTracks = dataFromAlbum.nb_tracks
    let albumDur = dataFromAlbum.duration
    let mainGenre = dataFromAlbum.genres.data[0].name
    
    htmlToInsert.insertAdjacentHTML('afterend', `${setAlbumInfoHTML(
            imgSrc, albumTitle, artistName, nbFans, nbTracks, albumDur, mainGenre
        )}`)
}

async function loadAlbumDetails(albumId, albumEndpoint){
    await sendRequestToApi(dataFromAlbum, albumId, albumEndpoint)
    loadAlbumInfo()
    loadTracksDetails()

}

function setTracksHTML(trackNumber, trackAlbumSrc, trackName, trackAuthor, trackAlbumName, trackRank, trackDur){
    return`
        <div class="row justify-content-between p-0 py-3 px-4 m-0 trackStats">
            <div class="trackNumber d-flex justify-content-center align-items-center">
                <span class=" d-flex align-items-center justify-content-center modTranslate">${trackNumber}</span>
            </div>
            <div class="col-md-5 col-8 trackName d-flex align-items-center">
                <img src="${trackAlbumSrc}" alt="">
                <div class="d-flex flex-column pl-3 tableMusicTitle ">
                    <p class="text-truncate m-0 p-0">${trackName}</p>
                    <span class="mod-font-size-small mod-text-colorFadedWhite m-0 p-0">${trackAuthor}</span>
                </div>
            </div>
            <div class="col trackAlbum d-none d-md-flex justify-content-center align-items-center mod-font-size-small mod-text-colorFadedWhite">
                ${trackAlbumName}</div>
            <div class="col trackDateAdded d-none d-lg-flex justify-content-center align-items-center mod-font-size-small mod-text-colorFadedWhite">
                ${trackRank}</div>
            <div class="col p-0 trackDuration d-flex justify-content-center align-items-center  mod-font-size-small mod-text-colorFadedWhite">
                <span>${trackDur}</span>
            </div>
        </div> 
    `
    
}

function loadTracksDetails(){
    let tableHeader = document.getElementById('tableHeader')

    
    let trackAlbumSrc = dataFromAlbum.cover_medium
    let albumName = dataFromAlbum.title
    let albumTracks = dataFromAlbum.tracks.data

    let nbTracks = dataFromAlbum.tracks.data.length

    albumTracks.forEach((track, i) =>{
        tableHeader.insertAdjacentHTML('afterend',`${setTracksHTML(nbTracks - i, trackAlbumSrc,
            track.title, track.artist.name, albumName, track.rank, track.duration
            )}` )
    })

}