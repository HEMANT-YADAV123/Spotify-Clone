console.log("Welcome to spotify");
//initializing the variables.
let songindex = 0;
let audioelement = new Audio('./assets/1.mp3');
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let mastersongname = document.getElementById("mastersongname");
//we will make an array for storing multiple songs.
//array of objects.
let songs = [{songname:"God Damn-karan Aujla",filepath:"./assets/1.mp3",coverpath:"./assets/cover1.png"},
             {songname:"Tuaba-karan",filepath:"./assets/2.mp3",coverpath:"./assets/cover2.png"},
             {songname:"Brown Rang-honey singh",filepath:"./assets/3.mp3",coverpath:"./assets/cover2.png"},
             {songname:"raja-ji",filepath:"./assets/4.mp3",coverpath:"./assets/cover1.png"},
             {songname:"Amplifier-imran khan",filepath:"./assets/5.mp3",coverpath:"./assets/cover2.png"},
             {songname:"jhanjar-Raj mawar",filepath:"./assets/6.mp3",coverpath:"./assets/cover1.png"}
 ]

 songitem.forEach((element,i)=>
{
    // console.log(element,i);
    element.getElementsByClassName("arrayimg")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// audioelement.play();

//handle play/pause
masterplay.addEventListener('click',()=>
{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }

})
//listen to events->we want to update seek bar.

audioelement.addEventListener('timeupdate',()=>
{
    // console.log('timeupdate')->for to see in console only;
    //update seek bar
    progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    // console.log(progress)->for to see in console only;
    myprogressbar.value = progress;
//after above step our progress bar will only gets updated means only goes in forward.
})

myprogressbar.addEventListener('change',()=>
{
    audioelement.currentTime = (myprogressbar.value*audioelement.duration)/100;
})


const makeallplays = ()=>
{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>
        {
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
        })
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        // console.log(e.target);
        songindex = parseInt(e.target.id);
        makeallplays();
        index = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioelement.src = `./assets/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})
//next
document.getElementById("next").addEventListener('click',()=>
{
    if(songindex>=5)
    {
        songindex=0;
    }
    else{
        songindex=songindex+1;
    }
    audioelement.src = `./assets/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})
//previous
document.getElementById("previous").addEventListener('click',()=>
    {
        if(songindex<=0)
        {
            songindex=0;
        }
        else{
            songindex=songindex-1;
        }
        audioelement.src = `./assets/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })