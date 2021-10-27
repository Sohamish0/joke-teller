"use strict";
const audioElement = document.querySelector("audio");
const btn = document.querySelector(".btn");

// disabling button--toggle
function toggleButton() {
  btn.disabled = !btn.disabled;
}

// attaching the text to speech api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "fdc879139a4c4c1199dabdcff4079529",
    src: joke,
    hl: "en-in",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Setting up joke api

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // button disable is true
    toggleButton();

    tellMe(joke);
  } catch (error) {}
}
// on load
audioElement.addEventListener("ended", toggleButton);

btn.addEventListener("click", () => {
  getJokes();
});
