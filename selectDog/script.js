let select = document.querySelector("#slct");
let dogImage = document.querySelector(".dog-image");

select.addEventListener("change", (e) => {
  fetch(`https://dog.ceo/api/breed/${select.value}/images`)
    .then((response) => response.json())
    .then(
      (data) => (dogImage.style.backgroundImage = `url(${data.message[1]})`)
    );
});
