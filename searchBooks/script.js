// get html elements
let searchBar = document.querySelector("#searchQueryInput");
let searchSubmit = document.querySelector("#searchQuerySubmit");
let bookInfo = document.querySelector(".book-info");
let pagesContainer = document.querySelector(".pages");
let loader = document.querySelector(".loader-bg");

searchSubmit.addEventListener("click", (e) => {
  let searchText = searchBar.value
    .trim()
    .toLowerCase()
    .replaceAll(/\s\s+/g, " ")
    .replaceAll(" ", "+");

  loader.style.display = "block";
  fetch(`http://openlibrary.org/search.json?q=${searchText}&page=1`)
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      console.log(data);
      bookInfo.innerHTML = "";
      data.docs.forEach((el) => {
        let title = el.title;
        if (title.length > 30) {
          title = title.slice(0, 33) + "...";
        }

        let authorName = el.author_name;
        if (el.author_name != undefined) {
          authorName = el.author_name[0];
        } else {
          authorName = "unknown";
        }

        let firstPublishYear;
        if (el.publish_year != undefined) {
          firstPublishYear = el.publish_year[0];
        } else {
          firstPublishYear = "unknown";
        }

        let subject;
        if (el.subject != undefined) {
          subject = el.subject.splice(0, 5);
        } else {
          subject = [];
        }
        painting(title, authorName, firstPublishYear, subject);
      });
      return data;
    })
    .then((data) => {
      let pages = Math.floor(data.numFound / 100 + 1);
      for (let i = 1; i < pages + 1; i++) {
        let pageButton = document.createElement("BUTTON");

        pageButton.innerText = `${i}`;
        pageButton.className = `page${i}`;
        pagesContainer.appendChild(pageButton);

        pageButton.addEventListener("click", function changePage() {
          loader.style.display = "block";

          fetch(`http://openlibrary.org/search.json?q=${searchText}&page=${i}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              bookInfo.innerHTML = "";
              data.docs.forEach((el) => {
                let title = el.title;
                if (title.length > 30) {
                  title = title.slice(0, 33) + "...";
                }

                let authorName = el.author_name;
                if (el.author_name != undefined) {
                  authorName = el.author_name[0];
                } else {
                  authorName = "unknown";
                }

                let firstPublishYear;
                if (el.publish_year != undefined) {
                  firstPublishYear = el.publish_year[0];
                } else {
                  firstPublishYear = "unknown";
                }

                let subject;
                if (el.subject != undefined) {
                  subject = el.subject.splice(0, 5);
                } else {
                  subject = [];
                }
                painting(title, authorName, firstPublishYear, subject);
              });

              loader.style.display = "none";
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            });
        });
      }
    });
});

function painting(ti, au, fp, sub) {
  let div = document.createElement("div");
  let span = document.createElement("span");
  span.textContent = "Subject:";
  let subjectList = document.createElement("ol");

  div.classList.add("book");
  div.innerHTML = `
  <h3>Title: ${ti}</h3>
  <h4>Author name: ${au}</h4>
  <p>Publish year: ${fp}</p>
  `;

  if (sub.length > 0) {
    for (let i = 0; i < sub.length; i++) {
      let li = document.createElement("li");
      li.textContent = sub[i];
      subjectList.appendChild(li);
    }
  } else {
    span.textContent = "Subject: no subject";
  }

  span.appendChild(subjectList);
  div.appendChild(span);
  bookInfo.appendChild(div);
}
