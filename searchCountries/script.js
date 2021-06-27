let countries = document.querySelector(".countries");
let search = document.querySelector("#searchQueryInput");
let seeMore = document.querySelector(".see-more");

fetch("https://restcountries.eu/rest/v2/all")
  .then((response) => response.json())
  .then((data) => {
    let currentData = data;
    let elementsInPage = 19;
    data.every((el) => {
      painting(
        el.flag,
        el.population,
        el.region,
        el.languages[0].name,
        el.name
      );
      if (data.indexOf(el) === elementsInPage) {
        return false;
      }
      return true;
    });
    console.log(currentData);

    seeMore.addEventListener("click", () => {
      elementsInPage = elementsInPage + 20;
      countries.innerHTML = "";
      currentData.every((el) => {
        painting(
          el.flag,
          el.population,
          el.region,
          el.languages[0].name,
          el.name
        );
        if (currentData.indexOf(el) === elementsInPage) {
          return false;
        }
        return true;
      });
      console.log(currentData);
    });

    search.addEventListener("input", (e) => {
      elementsInPage = 19;
      console.log(search.value);
      currentData = data.filter((el) => {
        return el.name.toLowerCase().includes(search.value);
      });
      countries.innerHTML = "";
      currentData.every((el) => {
        painting(
          el.flag,
          el.population,
          el.region,
          el.languages[0].name,
          el.name
        );
        if (currentData.indexOf(el) === elementsInPage) {
          return false;
        }
        return true;
      });
      console.log(currentData);
    });
  });

function painting(flagUrl, population, region, languages, name) {
  let country = document.createElement("DIV");
  country.className = "country";
  country.innerHTML = `
    <div class="country-flag" style="background-image: url('${flagUrl}');">
    </div>
    <div class="country-info">
        <p>population : ${population}</p>
        <p>region : ${region}</p>
        <p>language : ${languages}</p>
        <p>name : ${name}<p>
    </div>
  `;
  countries.appendChild(country);
}
