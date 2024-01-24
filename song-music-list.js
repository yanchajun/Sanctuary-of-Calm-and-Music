
//Music Player List
let allSong = [
    {
        name: "Arcade",
        artist: "Duncan Laurence",
        img: "music-1",
        src: "music-1"
    },
    {
        name: "Just the two of us",
        artist: "Bill Withers",
        img: "music-2",
        src: "music-2"
    },
    {
      name: "Glow Worms",
      artist: "Ivri",
      img: "music-3",
      src: "music-3"
  },
  {
    name: "Close your eyes",
    artist: "tomcbumpz Ft. Ivri",
    img: "music-4",
    src: "music-4"
  },
  {
    name: "From the start",
    artist: "Laufey",
    img: "music-5",
    src: "music-5"
  },
  {
    name: "Here we go again",
    artist: "Muylike",
    img: "music-6",
    src: "music-6"
  },
  {
    name: "Ride",
    artist: "HYBS",
    img: "music-7",
    src: "music-7"
  },
  {
    name: "Good to be",
    artist: "Mark Ambor",
    img: "music-8",
    src: "music-8"
  },
];

/*

  JAVASCRIPT FOR MUSIC PLAYER

*/
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area");
progressBar = wrapper.querySelector(".progress-bar");
musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = musicList.querySelector("#close");

//load random music when page refreshes
let songIndex = Math.floor((Math.random() * allSong.length) + 1);

window.addEventListener("load", ()=> {
  loadMusic(songIndex); //calling load music once window loaded
  playingNow();
});

// load music function
function loadMusic(indexNumb) {
  musicName.innerText = allSong[indexNumb - 1].name;
  musicArtist.innerText = allSong[indexNumb - 1].artist;
  musicImg.src = `./images/${allSong[indexNumb - 1].img}.jpg`;
  mainAudio.src = `./musics/${allSong[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//next music function
function nextMusic() {
  //increment index by 1
  songIndex++;
   //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  songIndex > allSong.length ? (songIndex = 1) : (songIndex = songIndex);
  loadMusic(songIndex);
  playMusic();
  playingNow();
}

//next music function
function prevMusic() {
  //decrement index by 1
  songIndex--;
   //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  songIndex < 1 ? (songIndex = allSong.length) : (songIndex = songIndex);
  loadMusic(songIndex);
  playMusic();
  playingNow();
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingNow();
});

//next music btn event
nextBtn.addEventListener("click", ()=> {
  nextMusic(); //calling next music function
});

//prev music btn event
prevBtn.addEventListener("click", ()=> {
  prevMusic(); //calling prev music function
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=> {
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current"),
  musicDuration = wrapper.querySelector(".duration");
  
  mainAudio.addEventListener("loadeddata", ()=> {
    // update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song current time according to the progress bar width
progressArea.addEventListener("click", (e)=> {
  let progressWidthval = progressArea.clientWidth; //getting width of progress bar
  let clickedOffSetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playMusic();
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(songIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allSong.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allSong.length) + 1);
      }while(songIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      songIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(songIndex);
      playMusic();
      playingNow();
      break;
  }
});

showMoreBtn.addEventListener("click", ()=> {
  musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=> {
 showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

// let create li tags according to array length for list
for (let i = 0; i < allSong.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allSong[i].name}</span>
                  <p>${allSong[i].artist}</p>
                </div>
                <audio class="${allSong[i].src}" src="musics/${allSong[i].src}.mp3"></audio>                
                <span id="${allSong[i].src}" class="audio-duration">3:40</span>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDurationTag = ulTag.querySelector(`#${allSong[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allSong[i].src}`);

  liAudioTag.addEventListener("loadeddata", ()=> {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//music played when got click in music library

function playingNow(){
  const allLiTags = ulTag.querySelectorAll("li");
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration")
    // playing class will removed once clicked to other music 
    if(allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");

      //get audio duration and pass to t-duration
      let adDuration = audioTag.getAttribute("t-duration")
      audioTag.innerText = adDuration;
    }


    //if a li tag which li-index is equal to music index, then this music is playing now
    if(allLiTags[j].getAttribute("li-index") == songIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    // adding onclick attribute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)")
  }
}

// 
//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  songIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(songIndex);
  playMusic();
  playingNow();
}