console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let seekBar = document.getElementById("seekBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "Alone Pt-II - Alan Walker", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Alone - Alan Walker", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Darkside - Alan Walker", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Faded - Alan Walker", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Sing Me To Sleep - Alan Walker", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "The Spectre - Alan Walker", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Let Me Down Slowly - Alec Benjamin", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "7 Rings - Ariana Grande", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Stuck With U - Ariana Grande , Justin Bieber", filePath:"songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Attention - Charlie Puth", filePath:"songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
// audioElement.play();

// Handle Play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
    
});
// Listen to events
audioElement.addEventListener("timeupdate", () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    seekBar.value = progress;
});

seekBar.addEventListener("change", ()=> {
    audioElement.currentTime = (seekBar.value * audioElement.duration)/100;
});

// Make All Songs Play By Clicking On The Play Icon In Front Of Them
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=> {
    element.addEventListener("click", (e)=>{
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
    
})

// For Next Song
document.getElementById("next").addEventListener("click", () =>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// For Previous Song
document.getElementById("previous").addEventListener("click", () =>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})