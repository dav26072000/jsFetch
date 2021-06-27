let filmList = document.querySelector(".wrapper");

fetch("https://ghibliapi.herokuapp.com/films")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((item) => {
      let film = document.createElement("ul");
      film.className = "film";

      film.innerHTML = `
      <li class="film-title">
                <span>
                    Title:
                </span>
                <span class="title-info info">
                    ${item.title}
                </span>
            </li>
            <li class="film-description">
                <span>
                    Description:
                </span>
                <span class="description-info info">
                    ${item.description}
                </span>
            </li>
            <li class="film-director">
                <span>
                    Director:
                </span>
                <span class="director-info info">
                    ${item.director}
                </span>
            </li>
            <li class="film-producer">
                <span>
                    Producer:
                </span>
                <span class="producer-info info">
                    ${item.producer}
                </span>
            </li>
            <li class="film-release">
                <span>
                    Release date:
                </span>
                <span class="title-release info">
                    ${item.release_date}
                </span>
            </li>
      `;
      filmList.appendChild(film);
    });
  });
