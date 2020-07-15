/*

HTML
1. 2 input fields (job desc, location)
2. 3 check boxes (full time, part time, remote)
3. 1 search button

SCRIPT
1. Event listener for search button
2. Create card 
    1. logo pic
    2. job title
    3. job desc (less than 100 char)
    4. how to apply info
    5. button to view job details

CSS
1. Add bootstrap
2. Margins, etc

Github
create new repo
upload 
test
*/

document.getElementById("searchButton").addEventListener("click", (e) => {
  // e.preventDefault();

  // read input value
  jobKeyword = document.getElementById("jobDesc").value;

  locationKeyword = document.getElementById("location").value;

  removeCards();

  fetch(
    `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${jobKeyword}&location=${locationKeyword}`
  )
    .then((response) => response.json())
    .then((data) => returnJob(data));
});

function removeCards() {
  let results = document.getElementById("results");
  results.innerHTML = "";

  document.getElementById("message").innerHTML = "";

  document.getElementById("jobDesc").value = "";
  document.getElementById("location").value = "";
}

function returnJob(job) {
  if (job.length > 0) {
    //create message if
    if (jobKeyword.length > 0) {
      jobKeyword = jobKeyword;
    } else {
      jobKeyword = "Any job";
    }
    if (locationKeyword.length > 0) {
      locationKeyword = locationKeyword;
    } else {
      locationKeyword = "any location";
    }
    document.getElementById(
      "message"
    ).innerHTML = `<h3>Results for: ${jobKeyword} in ${locationKeyword}</h3>`;

    let jobDivs = [];

    for (let i = 0; i < job.length; i++) {
      jobDivs[i] = document.createElement("div");
      jobDivs[i].setAttribute("class", "card");
      jobDivs[i].setAttribute("style", "width: 18rem;");

      let image = document.createElement("img");
      image.setAttribute("class", "card-img-top");
      image.setAttribute("src", job[i].company_logo);
      image.setAttribute("alt", job[i].company);

      jobDivs[i].appendChild(image);

      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");

      let cardTitle = document.createElement("h5");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.innerHTML = job[i].title;

      let jobDescription = document.createElement("p");
      jobDescription.setAttribute("class", "card-text");

      jobDescription.innerHTML = `${job[i].description.substring(0, 99)}...`;

      let howApply = document.createElement("button");
      howApply.setAttribute("class", "card-link");
      //howApply.setAttribute("href", "#");
      howApply.innerHTML = "How to apply";

      howApply.addEventListener("click", () => {
        var applyDiv = document.createElement("div");
        applyDiv.innerHTML = job[i].how_to_apply;
        applyDiv.style.backgroundColor = "lightblue";
        cardBody.appendChild(applyDiv);
      });

      let jobDetails = document.createElement("a");
      jobDetails.setAttribute("class", "card-link");
      jobDetails.setAttribute("href", job[i].url);
      jobDetails.innerHTML = "Job Details";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(jobDescription);
      cardBody.appendChild(howApply);
      cardBody.appendChild(jobDetails);

      jobDivs[i].appendChild(cardBody);
      document.getElementById("results").appendChild(jobDivs[i]);
    }
  } else {
    document.getElementById(
      "message"
    ).innerHTML = `<h3>No results found. Enter different job description/location</h3>`;
  }
}
