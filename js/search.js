
async function getSearchValue(e){
    e.preventDefault()
    let userInput = e.target.value
    await sendRequestToApi(dataFromSearch, userInput)

    let sections = document.querySelectorAll('section')
    sections.forEach(section => section.remove())
    createSearchSection()
    createCardFromSearchSectionHTML(0, 16)
}

function createSearchSection(){
    let getHeader = document.querySelector('header#topBar')
    getHeader.insertAdjacentHTML('afterend',`
        <section class="row d-flex flex-wrap mt-3 py-0 px-4 m-0" id="show_Results">
            <div class="col-12 p-0 d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                <h2 class="m-0">
                Show Results:
                </h2>
                <span class="section-text-aux mt-1 mb-2">Latest music</span>
                </div>
                <span class="seeMore">SEE ALL</span>
                </div>
            </div>
            <div class="row d-flex flex-wrap justify-content-between px-0 cardDeck">
            </div>
        </section> 
    `)

}







function createCardFromSearchSectionHTML(sliceInitial, sliceEnd){
    let getSearchSection = document.querySelector('section#show_Results .cardDeck')
    let data = dataFromSearch.data.slice(sliceInitial, sliceEnd)
    
    data.forEach((data) => {
        getSearchSection.insertAdjacentHTML('afterbegin', `
            <div class="d-flex card flex-nowrap card-square">
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

}
      
           


        