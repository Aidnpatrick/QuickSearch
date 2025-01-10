
function search() {

    stopDafaultText();

    const query = document.getElementById('searchInput').value;
    localStorage.setItem("lastSearch", query);

    const apiKey = "AIzaSyBdfnotXFBqJ8jUEovYvvpPrGBb49fvyao";
    const searchEngineId = "73bb1182000184ef1";
  
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

    dictionaryAPI();

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const searchDiv = document.getElementById('resultDiv');
        searchDiv.innerHTML = "<h3>Search Results:</h3><hr><br>";
        const content = document.getElementById("content");
        if (!data.items || data.items.length === 0) {
          searchDiv.innerHTML += "<p><b>No results found. Here's what you can try:</b></p><p>Check if there's a typo.</p><p>Try to use different words for keywords";
          return;
        }
  
        data.items.forEach((item, index) => {
          
          const link = document.createElement("p");
          link.className = "search-result";
          link.textContent = item.link;
          link.href = item.link;
          link.target = "_blank";
          link.style.fontSize = "12px";
          link.style.color = "#555555";
          searchDiv.appendChild(link);
          
          const title = document.createElement("a");
          title.textContent = item.title;
          title.style.fontWeight = "bold";
          title.href = item.link;
          title.target = "_blank";
          title.className = "search-result";
          searchDiv.appendChild(title);

          title.addEventListener("click", function () {
            linkClickedOn(link.textContent);
          });


          const snippet = document.createElement("p");
          snippet.textContent = item.snippet;

          searchDiv.appendChild(snippet);

          spacer(searchDiv, 4);

          checkServer(searchDiv);
        });
      })

      .catch(error => {
        console.error("Error fetching search results:", error);
      });
  }

  function linkClickedOn(link) {
    const searchDiv = document.getElementById("searchDiv");
    content.innerHTML = "";
    
    const iframe = document.createElement("iframe");
    iframe.className = "iframe-content";
    iframe.src = link;
    searchDiv.appendChild(iframe);
  }

  //Weather API
  /*document.addEventListener("DOMContentLoaded", function(){
    const request = 1;
    const key = "L1igJ1IKeYlWT9CckS0cQIGeevVctOAl";
    const url = "https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=L1igJ1IKeYlWT9CckS0cQIGeevVctOAl";

  });*/

  //Dictionary API
  function dictionaryAPI() {
    const version = 'v2';
    const language = 'en';
    const word = document.getElementById('searchInput').value;
    const url = `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
    
    const wikiDiv = document.getElementById('dictionaryDiv');

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Clear previous content
        wikiDiv.innerHTML = ""; // Clear previous content
        wikiDiv.style.visibility = "visible";
  
        
        if (!data[0]?.meanings?.length) {
          wikiDiv.textContent = "No meanings found for this word.";
          wikiDiv.style.visibility = "hidden";
          return;
        }

        const meanings = data[0].meanings;
        meanings.forEach(meaning => {
          const partOfSpeech = document.createElement("h4");
          partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
          partOfSpeech.style.fontStyle = "italic";

          wikiDiv.appendChild(partOfSpeech);
          
          meaning.definitions.forEach((definition, index) => {
            const definitionText = document.createElement("p");
            definitionText.textContent = `${index + 1}: ${definition.definition}`;
            wikiDiv.appendChild(definitionText);
          });
          
          
        });
        
      })
      .catch(error => {
        console.error("Error fetching dictionary data:", error);
        const wikiDiv = document.getElementById('wikiDiv');
        wikiDiv.innerHTML = "An error occurred while fetching the data. Please Try Refreshing the page.";
        wikiDiv.style.visibility = "hidden";
        return;
      });
  }
  
  // Call the function
  
  function checkEnter(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    divDefault = document.getElementById("default");
    divDefault.textContent = "What will you search today?";
  });



  function stopDafaultText() {
    const setUp = document.getElementById('default');
    setUp.textContent = "";
    setUp.style.display = "none";
    const content = document.getElementById('content');
    content.className = "flex-row";

    const footer = document.getElementById('footer');
    footer.style.visibility = "visible";
  }



  function show(id) {
    const sideBar = document.getElementById(id);
    if(sideBar.style.visibility == "hidden") {
      sideBar.style.visibility = "visible";
    } else {
      sideBar.style.visibility = "hidden";
    }
  }

  function overlay(id) {
    const div = document.getElementById(id);
    const overlay = document.getElementById('overLay');
    if(div.style.display == "none") {
      div.style.display = "flex";
      overlay.style.display = "flex";
    } else {
      div.style.display = "none";
      overlay.style.display = "none";
    } 
  }


  function spacer(parent, spacers) {
    for(let i = 0; i < spacers; i++) {
      const spacer = document.createElement("br");

      parent.appendChild(spacer);
    }
  }

  function checkServer(parent) {
    if(parent.innerHTML == "") {
      parent.innerHTML = "Something is worng with the servers, please try again later.";
    }
  }

  
  window.addEventListener("click", (event) => {
    const modal = document.getElementById('overLay');
    const div = document.getElementById('customizeDiv');
    if (event.target === modal) {
        div.style.display = "none";    
        modal.style.display = "none";
    }

    const sideBar = document.getElementById("sideBar");

});

let currentIndex = null;

document.addEventListener("DOMContentLoaded", function () {
  const flexWrap_1 = document.getElementById('flexWrapCustom1');
  const colors = ["skyblue", "#FFE0B2", "palegoldenrod", "lightgreen", "lightskyblue", "violet", "white", "lightpink", "lavender", "paleturquoise", "lightcyan", "lightsalmon"
    ,"#BBDEFB","#FFCCBC","#D1C4E9","#FFF3E0","#CFD8DC","#ECEFF1","#F3E5F5","#F9FBE7","#F1F8E9","#DCEDC8","#64B5F6"
  ];

  colors.forEach((color, index) => {
    const colorDiv = document.createElement("button");
    colorDiv.className = "customize-colors";
    colorDiv.style.backgroundColor = color;
    colorDiv.style.border = "2px solid grey";
    colorDiv.style.boxShadow = "none";
    colorDiv.textContent = "";

    colorDiv.addEventListener("click", function () {
      changeColor(color);
      localStorage.setItem("background", color);

      const allButtons = document.querySelectorAll(".customize-colors");
      allButtons.forEach((button, btnIndex) => {
        button.style.borderColor = "grey";
        button.style.boxShadow = "none";
      });

      colorDiv.style.borderColor = "darkred";
      colorDiv.style.boxShadow = "0px 4px 10px 1px rgb(83,83,83)";
      currentIndex = index;
      console.log(`Current Index: ${currentIndex}`);
    });

    flexWrap_1.appendChild(colorDiv);
  });

  const flexWrap_2 = document.getElementById("flexWrapCustom2");
  const fontWeights = ["normal", "bold"];
  fontWeights.forEach((fontWeightType, index) => {
    const fontWeightButton = document.createElement("button");
    fontWeightButton.className = "font-weight-button";
    fontWeightButton.textContent = fontWeightType;
    fontWeightButton.style.fontSize = "18px";
    if (index == 1) {
      fontWeightButton.style.fontWeight = "bold";
    }
    fontWeightButton.addEventListener("click", function () {
      fontWeight(fontWeightType);
      localStorage.setItem("fontWeight", fontWeightType);
    });
    flexWrap_2.appendChild(fontWeightButton);
  });
});

function changeColor(colorName) {

  const top = document.getElementById("top");
  const body = document.getElementById("body");
  const sideBar = document.getElementById("sideBar");
  
  sideBar.style.backgroundColor = colorName;
  top.style.backgroundColor = colorName;
  body.style.backgroundColor = colorName;

  const computedStyle = window.getComputedStyle(body);
  if (computedStyle.backgroundColor !== "rgb(255, 255, 255)") { // Check for white color
    const moreButtons = document.getElementById("moreButtons");
    moreButtons.style.borderColor = "black";
    const searchButton = document.getElementById("searchButton");
    searchButton.style.borderColor = 'black';
    const searchDiv = document.getElementById("searchDiv");
    searchDiv.style.borderColor = 'black';
    const dictionaryDiv = document.getElementById("dictionaryDiv");
    dictionaryDiv.style.borderColor = "black";
    const body = document.getElementById("body");
    body.style.borderColor = "black";
    body.style.color = "black";
  } 
}
function fontWeight(fontWeightName) {
  const body = document.getElementById("body");
  body.style.fontWeight = fontWeightName;
  
}

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("background")) {
    changeColor(localStorage.getItem("background"));
  }
  if(localStorage.getItem("fontWeight")) {
    fontWeight(localStorage.getItem("fontWeight"));
  }
});