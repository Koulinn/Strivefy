
function setAlbumInfoHTML(albumImgSrc, albumTitle, artistName, fans, nbTracks, duration, genre){
    return `
        <section id="albumCover" class="row d-flex flex-column mt-3 py-0 px-4 m-0">
            <div class=" col-12 jumbotron jumbotron-fluid bg-transparent p-0">
                <div class="container d-flex p-0 m-0">
                    <div class="d-inline-block album-img">
                        <img src="${albumImgSrc}" alt="">
                                </div>
                        <div class="d-flex flex-column justify-content-between mt-myMod ml-4">
                            <span class="seeMore"> ${genre} </span>
                            <h1 class="m-0">${albumTitle}</h1>
                            <div class="albumStats">
                                <p class="mb-2">${artistName}</p>
                                <div class="d-flex">
                                    <p class="mb-0">
                                        <span><a>Spotify</a></span>
                                        <span>.</span>
                                        <span>${fans}</span>
                                        <span>.</span>
                                        <span>${nbTracks},</span>
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
    let albumTitle = dataFromAlbum.albumTitle
    let artistName = dataFromAlbum.contributors[0].name
    let nbFans = dataFromAlbum.fans
    let nbTracks = dataFromAlbum.nb_tracks
    let albumDur = dataFromAlbum.duration
    let mainGenre = dataFromAlbum.genres.data[0].name

    htmlToInsert.insertAdjacentHTML('afterend', `${setAlbumInfoHTML(
            imgSrc, albumTitle, artistName, nbFans, nbTracks, albumDur, mainGenre
        )}`)
}

async function loadAlbumDetails(albumId, albumEndpoint){
    sendRequestToApi(dataFromAlbum, albumId, albumEndpoint)
    loadAlbumInfo()

}
