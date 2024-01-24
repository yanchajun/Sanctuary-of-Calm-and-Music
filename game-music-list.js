// Music Player List
let allGame = [
    {
      nameGame: "Lofi Video Game Beats",
      artistGame: "Helynt",
      imgGame: "game-1",
      srcGame: "game-1",
    },
    {
      nameGame: "Pokemon - HeartGold/SoulSilver",
      artistGame: "Pokemon",
      imgGame: "game-2",
      srcGame: "game-2",
    },
    {
      nameGame: "Video Game Music ",
      artistGame: "Stardew Valley",
      imgGame: "game-3",
      srcGame: "game-3",
    }
  ];
  
  // JAVASCRIPT FOR MUSIC PLAYER
  
  const wrapperGame = document.querySelector(".wrapper-game"),
    musicImgGame = wrapperGame.querySelector(".img-area-game img"),
    musicNameGame = wrapperGame.querySelector(".song-details-game .name-game"),
    musicArtistGame = wrapperGame.querySelector(".song-details-game .artist-game"),
    mainAudioGame = wrapperGame.querySelector("#main-audio-game"),
    playPauseBtnGame = wrapperGame.querySelector(".play-pause-game"),
    prevBtnGame = wrapperGame.querySelector("#prev-game"),
    nextBtnGame = wrapperGame.querySelector("#next-game"),
    progressAreaGame = wrapperGame.querySelector(".progress-area-game"),
    progressBarGame = wrapperGame.querySelector(".progress-bar-game"),
    musicListGame = wrapperGame.querySelector(".music-list-game"),
    showMoreBtnGame = wrapperGame.querySelector("#more-music-game"),
    hideMusicBtnGame = musicListGame.querySelector("#close-game");
  
  let songIndexGame = Math.floor(Math.random() * allGame.length) + 1;
  
  window.addEventListener("load", () => {
    loadMusicGame(songIndexGame);
    playingNowGame();
  });
  
  function loadMusicGame(indexNumbGame) {
    musicNameGame.innerText = allGame[indexNumbGame - 1].nameGame;
    musicArtistGame.innerText = allGame[indexNumbGame - 1].artistGame;
    musicImgGame.src = `./images/${allGame[indexNumbGame - 1].imgGame}.gif`;
    mainAudioGame.src = `./musics/${allGame[indexNumbGame - 1].srcGame}.mp3`;
  }
  
  function playMusicGame() {
    wrapperGame.classList.add("paused");
    playPauseBtnGame.querySelector("i").innerText = "pause";
    mainAudioGame.play();
  }
  
  function pauseMusicGame() {
    wrapperGame.classList.remove("paused");
    playPauseBtnGame.querySelector("i").innerText = "play_arrow";
    mainAudioGame.pause();
  }
  
  function nextMusicGame() {
    songIndexGame++;
    songIndexGame > allGame.length ? (songIndexGame = 1) : (songIndexGame = songIndexGame);
    loadMusicGame(songIndexGame);
    playMusicGame();
    playingNowGame();
  }
  
  function prevMusicGame() {
    songIndexGame--;
    songIndexGame < 1 ? (songIndexGame = allGame.length) : (songIndexGame = songIndexGame);
    loadMusicGame(songIndexGame);
    playMusicGame();
    playingNowGame();
  }
  
  playPauseBtnGame.addEventListener("click", () => {
    const isMusicPlayGame = wrapperGame.classList.contains("paused");
    isMusicPlayGame ? pauseMusicGame() : playMusicGame();
    playingNowGame();
  });
  
  nextBtnGame.addEventListener("click", () => {
    nextMusicGame();
  });
  
  prevBtnGame.addEventListener("click", () => {
    prevMusicGame();
  });
  
  mainAudioGame.addEventListener("timeupdate", (e) => {
    const currentTimeGame = e.target.currentTime;
    const durationGame = e.target.duration;

    let progressWidthGame = (currentTimeGame / durationGame) * 100;
    progressBarGame.style.width = `${progressWidthGame}%`;
  
    let musicCurrentTimeGame = wrapperGame.querySelector(".current-game"),
      musicDurationGame = wrapperGame.querySelector(".duration-game");
  
    mainAudioGame.addEventListener("loadeddata", () => {
      let audioDurationGame = mainAudioGame.duration;
      let totalMinGame = Math.floor(audioDurationGame / 60);
      let totalSecGame = Math.floor(audioDurationGame % 60);
      if (totalSecGame < 10) {
        totalSecGame = `0${totalSecGame}`;
      }
      musicDurationGame.innerText = `${totalMinGame}:${totalSecGame}`;
    });
  
    let currentMinGame = Math.floor(currentTimeGame / 60);
    let currentSecGame = Math.floor(currentTimeGame % 60);
    if (currentSecGame < 10) {
      currentSecGame = `0${currentSecGame}`;
    }
    musicCurrentTimeGame.innerText = `${currentMinGame}:${currentSecGame}`;
  });
  
  progressAreaGame.addEventListener("click", (e) => {
    let progressWidthvalGame = progressAreaGame.clientWidth;
    let clickedOffSetXGame = e.offsetX;
    let songDurationGame = mainAudioGame.duration;
  
    mainAudioGame.currentTime = (clickedOffSetXGame / progressWidthvalGame) * songDurationGame;
    playMusicGame();
  });

//change loop, shuffle, repeat icon onclick
const repeatBtnGame = wrapperGame.querySelector("#repeat-plist-game");
repeatBtnGame.addEventListener("click", ()=>{
  let getTextGame = repeatBtnGame.innerText; //getting this tag innerText
  switch(getTextGame){
    case "repeat":
      repeatBtnGame.innerText = "repeat_one";
      repeatBtnGame.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtnGame.innerText = "shuffle";
      repeatBtnGame.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtnGame.innerText = "repeat";
      repeatBtnGame.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudioGame.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getTextGame = repeatBtnGame.innerText; //getting this tag innerText
  switch(getTextGame){
    case "repeat":
      nextMusicGame(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioGame.currentTimeGame = 0; //setting audio current time to 0
      loadMusicGame(songIndexGame); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicGame(); //calling playMusic function
      break;
    case "shuffle":
      let randIndexGame = Math.floor((Math.random() * allGame.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndexGame = Math.floor((Math.random() * allGame.length) + 1);
      }while(songIndexGame == randIndexGame); //this loop run until the next random number won't be the same of current musicIndex
      songIndexGame = randIndexGame; //passing randomIndex to musicIndex
      loadMusicGame(songIndexGame);
      playMusicGame();
      playingNowGame();
      break;
  }
});

showMoreBtnGame.addEventListener("click", ()=> {
  musicListGame.classList.toggle("show");
});

hideMusicBtnGame.addEventListener("click", ()=> {
 showMoreBtnGame.click();
});

const ulTagGame = wrapperGame.querySelector("ul");

// let create li tags according to array length for list
for (let i = 0; i < allGame.length; i++) {
  //let's pass the song name, artist from the array
  let liTagGame = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allGame[i].nameGame}</span>
                  <p>${allGame[i].artistGame}</p>
                </div>
                <audio class="${allGame[i].srcGame}" src="musics/${allGame[i].srcGame}.mp3"></audio>                
                <span id="${allGame[i].srcGame}" class="audio-duration-game"></span>
              </li>`;
  ulTagGame.insertAdjacentHTML("beforeend", liTagGame); //inserting the li inside ul tag

  let liAudioDurationTagGame = ulTagGame.querySelector(`#${allGame[i].srcGame}`);
  let liAudioTagGame = ulTagGame.querySelector(`.${allGame[i].srcGame}`);

  liAudioTagGame.addEventListener("loadeddata", ()=> {
    let audioDurationGame = liAudioTagGame.duration;
    let totalMinGame = Math.floor(audioDurationGame / 60);
    let totalSecGame = Math.floor(audioDurationGame % 60);
    if(totalSecGame < 10){ //if sec is less than 10 then add 0 before it
      totalSecGame = `0${totalSecGame}`;
    }
    liAudioDurationTagGame.innerText = `${totalMinGame}:${totalSecGame}`; //passing total duration of song
    liAudioDurationTagGame.setAttribute("t-duration", `${totalMinGame}:${totalSecGame}`);
  });
}

//music played when clicked in music library

function playingNowGame() {
    const allLiTagsGame = musicListGame.querySelectorAll("li");
    for (let j = 0; j < allLiTagsGame.length; j++) {

      let audioTagGame = allLiTagsGame[j].querySelector(".audio-duration-game");

      if (allLiTagsGame[j].classList.contains("playing")) {
        allLiTagsGame[j].classList.remove("playing");
        let adDurationGame = audioTagGame.getAttribute("t-duration");
        audioTagGame.innerText = adDurationGame;
      }
  
      if (allLiTagsGame[j].getAttribute("li-index") == songIndexGame) {
        allLiTagsGame[j].classList.add("playing");
        audioTagGame.innerText = "Playing";
      }
  
      allLiTagsGame[j].setAttribute("onclick", "clickedGame(this)");
    }
  }
  
  function clickedGame(element) {
    let getLiIndexGame = element.getAttribute("li-index");
    songIndexGame = getLiIndexGame;
    loadMusicGame(songIndexGame);
    playMusicGame();
    playingNowGame();
  }