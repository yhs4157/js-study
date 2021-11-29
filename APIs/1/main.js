const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext(); 

const audioElement = document.querySelector("audio"); 
const playBtn = document.querySelector('button'); 
const volumneSlider = document.querySelector('.volume'); 

const audioSource = audioCtx.createMediaElementSource(audioElement); 

playBtn.addEventListener('click', function() {
    if(audioCtx.state === 'suspended') {
        audioCtx.resume(); 
    }
    if(this.getAttribute('class') === 'paused') {
        audioElement.play(); 
        this.setAttribute('class', 'playing'); 
        this.textContent = 'Pause';
    } else if(this.getAttribute('class') === 'playing') {
        audioElement.pause(); 
        this.setAttribute('class', 'paused'); 
        this.textContent = 'Play';
    }
});

audioElement.addEventListener('ended', function() {
    playBtn.setAttribute('class', 'paused'); 
    playBtn.textContent = 'Play';
});

audioSource.connect(gainNode).connect(audioCtx.destination);