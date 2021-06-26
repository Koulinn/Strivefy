let musicPaths = [
  // "./tracks/Cirque du Soleil - Vai Vedrai.mp3",
  // "./tracks/Marisa Monte - Waters Of March.mp3",
  // "./tracks/Nara Leão - O Barquinho.mp3",
  // "./tracks/Vasco Rossi - La Verità.mp3",
];
const player = document.getElementsByTagName("audio")[0];

let trackIndex = 0;






// To validate Icons
let pauseIcon = document.getElementById('pause-icon')


// To update time

const playerCommands = {
  nextMusic: function nextMusic() {
    trackIndex++;
    this.checkTrackPosition();
    player.pause();
    player.src = musicPaths[trackIndex];
    this.changeIconToPauseIcon()
    return player.play();
  },

  previousMusic: function prevMusic() {
    trackIndex--;
    this.checkTrackPosition();
    player.pause();
    player.src = musicPaths[trackIndex];
    this.changeIconToPauseIcon()
    return player.play();
  },

  shuffle: function shuffleArray() {
    for (let i = musicPaths.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i - 1));
      aux = musicPaths[i];
      musicPaths[i] = musicPaths[j];
      musicPaths[j] = aux;
    }
  },

  play: function play() {
    if (player.paused === true) {
      playBTN.innerHTML = pauseSVG;
      player.play();
      this.changeIconToPauseIcon()
      return
      
    } else {
      playerCommands.pause();
      playBTN.innerHTML = playSVG;
    }
  },

  pause: function pause() {
    player.pause();
  },
  checkTrackPosition: function checkTrackPosition() {
    if (trackIndex === musicPaths.length) {
      trackIndex = 0;
    }
    if (trackIndex < 0) {
      trackIndex = musicPaths.length - 1;
    }
  },
  mute: function mute() {
    if (player.volume > 0.05) {
      player.volume = 0;
      return;
    } else {
      player.volume = 0.5;
    }
  },
  volumeIncrease: function volumeIncrease() {
    if (player.volume > 0.9) {
      player.volume = 1;
      return;
    }
    player.volume = player.volume + 0.1;
  },

  volumeDecrease: function volumeDecrease() {
    player.volume = player.volume.toFixed(2);
    player.volume = parseFloat(player.volume);
    if (player.volume < 0.05) {
      player.volume = 0;
      return;
    }

    console.log(player.volume, "before change");
    player.volume = player.volume - 0.05;
    console.log(player.volume, "after change");
  },
  isPaused: player.paused,

  progressBarProportion: function progressBarProportion() {
    let currMusicDur = player.duration;
    let currMusicTime = player.currentTime;
    let musicDurProportion = (currMusicTime / currMusicDur) * 100;
    return musicDurProportion;
  },

  changeIconToPauseIcon: function changeIconToPauseIcon() {
    if(pauseIcon === null){
      playBTN.innerHTML = pauseSVG
    }
    
  },
};

function updateProgressBarWidth(){

  let musicBar = document.querySelector(".progress-bar-indicator");
  setInterval(() => {
    musicBar.style.width = `${playerCommands.progressBarProportion()}%`;
    document.querySelector('.timeInitial > span').innerText = `${parseFloat(player.currentTime.toFixed())}`;
    document.querySelector('.timeRemaining > span').innerText = `${(parseFloat(player.duration - player.currentTime).toFixed(2)/60).toFixed(2)}`;
  }, 500);
}

updateProgressBarWidth()

// Player controls HTML Elements
let playBTN = document.getElementById("player-play-music");
let previousBTN = document.getElementById("player-previous-music");
let nextBTN = document.getElementById("player-next-music");
let shuffleBTN = document.getElementById("player-repeat-music");

// Progress bar
let progressBar = document.getElementById("progress-bar");
let progressBarIndicator = document.getElementById("progress-bar-wrapper");

// Volume controls HTML Elements

let increaseVolBTN = document.getElementById("increase-vol-BTN");
let decreaseVolBTN = document.getElementById("decrease-vol-BTN");
let muteBTN = document.getElementById("volume-icon");

// Aux Elements
let pauseSVG = `<svg id="pause-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>`;
let playSVG = `<svg id="play-Icon" role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-ulyrgf-0 ghlXvf">
<path d="M4.018 14L14.41 8 4.018 2z"></path>
</svg>`;

playBTN.addEventListener("click", function (event) {
    playerCommands.play();
});

previousBTN.addEventListener("click", function (event) {
  playerCommands.previousMusic();
});
nextBTN.addEventListener("click", function (event) {
  playerCommands.nextMusic();
});
shuffleBTN.addEventListener("click", function (event) {
  playerCommands.shuffle();
});
increaseVolBTN.addEventListener("click", function (event) {
  playerCommands.volumeIncrease();
});
decreaseVolBTN.addEventListener("click", function (event) {
  playerCommands.volumeDecrease();
});
muteBTN.addEventListener("click", function (event) {
  playerCommands.mute();
});

let progressBarClickedPointFoward
// Progress bar (Forward time)
progressBar.addEventListener("click", function (event) {
  // pick total width (responsive)
  progressBarClickedPointFoward = event.offsetX;
  console.log(progressBarClickedPointFoward, '<<<<<----- event.offsetX')
  // Get container dimensions
  let progressBarDimensions = progressBar.getBoundingClientRect();
  console.log(progressBarDimensions, '<---------------- getBoundingClintrect')
  let progressBarTotalWidth = parseInt(progressBarDimensions.width.toFixed(0));
  let musicPointSelected = parseFloat(
    (progressBarClickedPointFoward / progressBarTotalWidth).toFixed(2)
  );

  // Calculate Music time
  let currMusicDur = player.duration;
  let currMusicTime = player.currentTime;
  currMusicTime = currMusicDur * musicPointSelected;
console.log(currMusicTime, ' forward')
  // Change player currentMusic duration
  player.currentTime = currMusicDur * musicPointSelected;

  playerCommands.changeIconToPauseIcon()
  playerCommands.play()
});

// Progress bar return (Previous time)
let progressBarBackwards
progressBarIndicator.addEventListener("click", function (event) {
  let progressBarBackwards = event.offsetX;
 

  if((parseInt(progressBarBackwards) > parseInt(progressBarClickedPointFoward) + 1) && (parseInt(progressBarBackwards) < parseInt(progressBarClickedPointFoward) + 1) ){
    return
  }


  let progressBarDimensions = progressBar.getBoundingClientRect();
  let progressBarTotalWidth = parseInt(progressBarDimensions.width.toFixed(0));
  let musicPointSelected = parseFloat(
    (progressBarBackwards / progressBarTotalWidth).toFixed(2)
  );

  let currMusicDur = player.duration;
  let currMusicTime = player.currentTime;
  currMusicTime = currMusicDur * musicPointSelected;

  player.currentTime = currMusicDur * musicPointSelected;
  playerCommands.changeIconToPauseIcon()
  player.play()
});


// Fetch Music from API
async function getTrackFromAPI(e){
  let albumId = e.target.parentElement.getAttribute('value')
  let currentAlbum = await getAlbumFromAPI(albumId)

    // Set track to the player
  let currentTrack = currentAlbum.tracks.data[0].preview
  musicPaths.push(currentTrack)
  playerCommands.nextMusic()

  // Change footer Current Music info
  let currentMusicTitle = currentAlbum.tracks.data[0].title
  let albumCover = currentAlbum.cover_small
  let currentArtist = currentAlbum.tracks.data[0].artist.name


  changeBandInfo(albumCover, currentMusicTitle, currentArtist)
}


// Request data from API
const getAlbumFromAPI = async (query) => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + query)
      let dataRequested = await response.json()
      return dataRequested
    } catch (e) {
      return e
    }
  }
  
// Change player Author Data
  
// let test
function changeBandInfo(imgSrc, footerMusicTitle, footerArtistName){
  let albumCover = document.querySelector('.footer-album-cover > img')
  albumCover.src = imgSrc

  let footerMusicName = document.querySelector('.footer-music-name > p')
  footerMusicName.innerText = footerMusicTitle
  
  let footerArtistNameSpan = document.querySelector('.footer-music-name > span')
  footerArtistNameSpan.innerHTML = ''
  footerArtistNameSpan.insertAdjacentHTML('afterbegin', `
    <a>${footerArtistName}</a>
  `)
}