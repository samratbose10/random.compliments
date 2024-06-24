const compliments = [
    "You're an awesome friend.",
    "You're a gift to those around you.",
    "You're a smart cookie.",
    "You are awesome!",
    "You have impeccable manners.",
    "I like your style.",
    "You have the best laugh.",
    "I appreciate you.",
    "You are the most perfect you there is.",
    "You are enough.",
    "You're strong.",
    "Your perspective is refreshing.",
    "You're an incredible human being.",
    "You're a true gift to the people in your life.",
    "You're amazing just the way you are.",
    "You bring out the best in other people.",
    "You're a ray of sunshine on a rainy day.",
    "You have a great sense of humor.",
    "You're more helpful than you realize.",
    "You're a great listener."
];

const backgrounds = [
    'https://art.pixilart.com/de89b512f449f04.gif',
    'https://art.pixilart.com/sr2eba8fc8f045c.gif',
    'https://art.pixilart.com/166b340f1a20267.gif',
    'https://art.pixilart.com/4439b4a9fd3fd38.gif'
];

let currentBackgroundIndex = 0;

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
}

setInterval(changeBackground, 9000);

function generateCompliment() {
    const complimentElement = document.getElementById('compliment');
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[randomIndex];
    complimentElement.textContent = compliment;
    speakCompliment(compliment);
}

function speakCompliment(compliment) {
    const utterance = new SpeechSynthesisUtterance(compliment);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.name.includes('Alex') || voice.name.includes('Daniel') || voice.name.includes('Fred')) || voices[0];
    utterance.voice = voice;
    utterance.pitch = 0.6; 
    utterance.rate = 0.85; 
    utterance.volume = 1; 

    
    const audio = document.getElementById('background-music');
    const originalVolume = audio.volume;
    audio.volume = 0.1;

    utterance.onend = () => {
        audio.volume = originalVolume;
    };

    window.speechSynthesis.speak(utterance);
}

function enableAudio() {
    const audio = document.getElementById('background-music');
    audio.play();
    document.getElementById('audio-popup').style.display = 'none';
}

$(document).on('click', '.toggle-sound', function(e) {
    const audio = document.getElementById('background-music');
    $(this).toggleClass('sound-mute');
    if (audio.muted) {
        audio.muted = false;
        audio.volume = 0.5;
        $('.sound--icon').removeClass('fa-volume-mute').addClass('fa-volume-up');
    } else {
        audio.muted = true;
        $('.sound--icon').removeClass('fa-volume-up').addClass('fa-volume-mute');
    }
});

window.speechSynthesis.onvoiceschanged = () => {
    
    window.speechSynthesis.getVoices();
};
