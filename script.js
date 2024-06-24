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
    utterance.pitch = 0.6; // Deepens the voice
    utterance.rate = 0.85; // Slows down the speaking rate
    utterance.volume = 1; // Ensures voice is loud and clear

    // Lower background music volume when speaking
    const audio = document.getElementById('background-music');
    audio.volume = 0.1;

    utterance.onend = () => {
        audio.volume = audio.muted ? 0 : 0.5;
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
    // Preload voices
    window.speechSynthesis.getVoices();
};
