// Music Player List
let allNature = [
    {
      nameNature: "Sound of Rain and Wind in Forest",
      artistNature: "Relaxing Sounds of Nature",
      imgNature: "nature-1",
      srcNature: "nature-1",
    },
    {
      nameNature: "Wind in a Foggy Spruce Forest",
      artistNature: "Relaxing Sounds of Nature",
      imgNature: "nature-2",
      srcNature: "nature-2",
    },
    {
      nameNature: "Secret Forest",
      artistNature: "The Bootleg Boy",
      imgNature: "nature-3",
      srcNature: "nature-3",
    },
    {
      nameNature: "Coffee, Lofi, and Nature Music",
      artistNature: "LO-FI Senpai",
      imgNature: "nature-4",
      srcNature: "nature-4",
    },
    {
      nameNature: "Forest Waterfall",
      artistNature: "Johnnielawson",
      imgNature: "nature-5",
      srcNature: "nature-5",
    },
  ];
  
  // JAVASCRIPT FOR MUSIC PLAYER
  
  const wrapperNature = document.querySelector(".wrapper-nature"),
    musicImgNature = wrapperNature.querySelector(".img-area-nature img"),
    musicNameNature = wrapperNature.querySelector(".song-details-nature .name-nature"),
    musicArtistNature = wrapperNature.querySelector(".song-details-nature .artist-nature"),
    mainAudioNature = wrapperNature.querySelector("#main-audio-nature"),
    playPauseBtnNature = wrapperNature.querySelector(".play-pause-nature"),
    prevBtnNature = wrapperNature.querySelector("#prev-nature"),
    nextBtnNature = wrapperNature.querySelector("#next-nature"),
    progressAreaNature = wrapperNature.querySelector(".progress-area-nature"),
    progressBarNature = wrapperNature.querySelector(".progress-bar-nature"),
    musicListNature = wrapperNature.querySelector(".music-list-nature"),
    showMoreBtnNature = wrapperNature.querySelector("#more-music-nature"),
    hideMusicBtnNature = musicListNature.querySelector("#close-nature");
  
  let songIndexNature = Math.floor(Math.random() * allNature.length) + 1;
  
  window.addEventListener("load", () => {
    loadMusicNature(songIndexNature);
    playingNowNature();
  });
  
  function loadMusicNature(indexNumbNature) {
    musicNameNature.innerText = allNature[indexNumbNature - 1].nameNature;
    musicArtistNature.innerText = allNature[indexNumbNature - 1].artistNature;
    musicImgNature.src = `./images/${allNature[indexNumbNature - 1].imgNature}.gif`;
    mainAudioNature.src = `./musics/${allNature[indexNumbNature - 1].srcNature}.mp3`;
  }
  
  function playMusicNature() {
    wrapperNature.classList.add("paused");
    playPauseBtnNature.querySelector("i").innerText = "pause";
    mainAudioNature.play();
  }
  
  function pauseMusicNature() {
    wrapperNature.classList.remove("paused");
    playPauseBtnNature.querySelector("i").innerText = "play_arrow";
    mainAudioNature.pause();
  }
  
  function nextMusicNature() {
    songIndexNature++;
    songIndexNature > allNature.length ? (songIndexNature = 1) : (songIndexNature = songIndexNature);
    loadMusicNature(songIndexNature);
    playMusicNature();
    playingNowNature();
  }
  
  function prevMusicNature() {
    songIndexNature--;
    songIndexNature < 1 ? (songIndexNature = allNature.length) : (songIndexNature = songIndexNature);
    loadMusicNature(songIndexNature);
    playMusicNature();
    playingNowNature();
  }
  
  playPauseBtnNature.addEventListener("click", () => {
    const isMusicPlayNature = wrapperNature.classList.contains("paused");
    isMusicPlayNature ? pauseMusicNature() : playMusicNature();
    playingNowNature();
  });
  
  nextBtnNature.addEventListener("click", () => {
    nextMusicNature();
  });
  
  prevBtnNature.addEventListener("click", () => {
    prevMusicNature();
  });
  
  mainAudioNature.addEventListener("timeupdate", (e) => {
    const currentTimeNature = e.target.currentTime;
    const durationNature = e.target.duration;

    let progressWidthNature = (currentTimeNature / durationNature) * 100;
    progressBarNature.style.width = `${progressWidthNature}%`;
  
    let musicCurrentTimeNature = wrapperNature.querySelector(".current-nature"),
      musicDurationNature = wrapperNature.querySelector(".duration-nature");
  
    mainAudioNature.addEventListener("loadeddata", () => {
      let audioDurationNature = mainAudioNature.duration;
      let totalMinNature = Math.floor(audioDurationNature / 60);
      let totalSecNature = Math.floor(audioDurationNature % 60);
      if (totalSecNature < 10) {
        totalSecNature = `0${totalSecNature}`;
      }
      musicDurationNature.innerText = `${totalMinNature}:${totalSecNature}`;
    });
  
    let currentMinNature = Math.floor(currentTimeNature / 60);
    let currentSecNature = Math.floor(currentTimeNature % 60);
    if (currentSecNature < 10) {
      currentSecNature = `0${currentSecNature}`;
    }
    musicCurrentTimeNature.innerText = `${currentMinNature}:${currentSecNature}`;
  });
  
  progressAreaNature.addEventListener("click", (e) => {
    let progressWidthvalNature = progressAreaNature.clientWidth;
    let clickedOffSetXNature = e.offsetX;
    let songDurationNature = mainAudioNature.duration;
  
    mainAudioNature.currentTime = (clickedOffSetXNature / progressWidthvalNature) * songDurationNature;
    playMusicNature();
  });

//change loop, shuffle, repeat icon onclick
const repeatBtnNature = wrapperNature.querySelector("#repeat-plist-nature");
repeatBtnNature.addEventListener("click", ()=>{
  let getTextNature = repeatBtnNature.innerText; //getting this tag innerText
  switch(getTextNature){
    case "repeat":
      repeatBtnNature.innerText = "repeat_one";
      repeatBtnNature.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtnNature.innerText = "shuffle";
      repeatBtnNature.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtnNature.innerText = "repeat";
      repeatBtnNature.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudioNature.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getTextNature = repeatBtnNature.innerText; //getting this tag innerText
  switch(getTextNature){
    case "repeat":
      nextMusicNature(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioNature.currentTimeNature = 0; //setting audio current time to 0
      loadMusicNature(songIndexNature); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicNature(); //calling playMusic function
      break;
    case "shuffle":
      let randIndexNature = Math.floor((Math.random() * allNature.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndexNature = Math.floor((Math.random() * allNature.length) + 1);
      }while(songIndexNature == randIndexNature); //this loop run until the next random number won't be the same of current musicIndex
      songIndexNature = randIndexNature; //passing randomIndex to musicIndex
      loadMusicNature(songIndexNature);
      playMusicNature();
      playingNowNature();
      break;
  }
});

showMoreBtnNature.addEventListener("click", ()=> {
  musicListNature.classList.toggle("show");
});

hideMusicBtnNature.addEventListener("click", ()=> {
 showMoreBtnNature.click();
});

const ulTagNature = wrapperNature.querySelector("ul");

// let create li tags according to array length for list
for (let i = 0; i < allNature.length; i++) {
  //let's pass the song name, artist from the array
  let liTagNature = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allNature[i].nameNature}</span>
                  <p>${allNature[i].artistNature}</p>
                </div>
                <audio class="${allNature[i].srcNature}" src="musics/${allNature[i].srcNature}.mp3"></audio>                
                <span id="${allNature[i].srcNature}" class="audio-duration-nature"></span>
              </li>`;
  ulTagNature.insertAdjacentHTML("beforeend", liTagNature); //inserting the li inside ul tag

  let liAudioDurationTagNature = ulTagNature.querySelector(`#${allNature[i].srcNature}`);
  let liAudioTagNature = ulTagNature.querySelector(`.${allNature[i].srcNature}`);

  liAudioTagNature.addEventListener("loadeddata", ()=> {
    let audioDurationNature = liAudioTagNature.duration;
    let totalMinNature = Math.floor(audioDurationNature / 60);
    let totalSecNature = Math.floor(audioDurationNature % 60);
    if(totalSecNature < 10){ //if sec is less than 10 then add 0 before it
      totalSecNature = `0${totalSecNature}`;
    }
    liAudioDurationTagNature.innerText = `${totalMinNature}:${totalSecNature}`; //passing total duation of song
    liAudioDurationTagNature.setAttribute("t-duration", `${totalMinNature}:${totalSecNature}`);
  });
}

//music played when clicked in music library

function playingNowNature() {
    const allLiTagsNature = musicListNature.querySelectorAll("li");
    for (let j = 0; j < allLiTagsNature.length; j++) {

      let audioTagNature = allLiTagsNature[j].querySelector(".audio-duration-nature");

      if (allLiTagsNature[j].classList.contains("playing")) {
        allLiTagsNature[j].classList.remove("playing");
        let adDurationNature = audioTagNature.getAttribute("t-duration");
        audioTagNature.innerText = adDurationNature;
      }
  
      if (allLiTagsNature[j].getAttribute("li-index") == songIndexNature) {
        allLiTagsNature[j].classList.add("playing");
        audioTagNature.innerText = "Playing";
      }
  
      allLiTagsNature[j].setAttribute("onclick", "clickedNature(this)");
    }
  }
  
  function clickedNature(element) {
    let getLiIndexNature = element.getAttribute("li-index");
    songIndexNature = getLiIndexNature;
    loadMusicNature(songIndexNature);
    playMusicNature();
    playingNowNature();
  }