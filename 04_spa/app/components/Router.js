import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let { hash } = w.location;
  console.log(hash);

  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    $main.innerHTML = "<h2>Sección del Home</h2>";
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        // console.log(posts);
        let html = "";
        posts.forEach((post) => {
          html += PostCard(post);
        });
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    $main.innerHTML = "<h2>Sección del Buscador</h2>";
  } else if (hash === "#/contacto") {
    $main.innerHTML = "<h2>Sección de Contacto</h2>";
  } else {
    $main.innerHTML = "<h2>Aquí carga el post seleccionado </h2>";
  }
  d.querySelector(".loader").style.display = "none";
}
