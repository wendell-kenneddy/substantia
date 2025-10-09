import "./styles/main.scss";
import "./styles/main-menu.scss";
import "./styles/how-to-play.scss";

const mainMenu = document.getElementById("main-menu");
const howToPlayButton = document.getElementById("show-how-to-play");
const howToPlay = document.getElementById("how-to-play");
const x = document.getElementById("x");

howToPlayButton?.addEventListener("click", () => {
  mainMenu?.classList.add("hidden");
  howToPlay?.classList.remove("hidden");
});

x?.addEventListener("click", () => {
  howToPlay?.classList.add("hidden");
  mainMenu?.classList.remove("hidden");
});
