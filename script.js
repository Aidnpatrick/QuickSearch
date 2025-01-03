function search() {

    stopDafaultText();

    const query = document.getElementById('searchInput').value;


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
  
        if (!data.items || data.items.length === 0) {
          searchDiv.innerHTML += "<p><b>No results found. Here's what you can try:</b></p><p>Check if there's a typo.</p><p>Try to use different words for keywords";
          return;
        }
  
        data.items.forEach(item => {
          const title = document.createElement("a");
          title.textContent = item.title;
          title.style.fontWeight = "bold";
          title.href = item.link;
          title.target = "_blank";
          title.className = "search-result";
          searchDiv.appendChild(title);
/*          const link = document.createElement("a");
          link.className = "search-result";
          link.textContent = item.link;
          link.href = item.link;
          link.target = "_blank";
          link.style.color = "blue";
          searchDiv.appendChild(link);
*/
          const snippet = document.createElement("p");
          snippet.textContent = item.snippet;
          searchDiv.appendChild(snippet);

          for(let i = 0; i < 2; i++) {
            const spacer = document.createElement("br");
            searchDiv.appendChild(spacer);
          }
        });
      })

      .catch(error => {
        console.error("Error fetching search results:", error);
      });
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
    
    // Fetch data from the API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Clear previous content
        const wikiDiv = document.getElementById('wikiDiv');
        wikiDiv.innerHTML = ""; // Clear previous content
        wikiDiv.style.visibility = "visible";
  
        
        if (!data[0]?.meanings?.length) {
          wikiDiv.textContent = "No meanings found for this word.";
          return;
        }

        const meanings = data[0].meanings;
        meanings.forEach(meaning => {
          const partOfSpeech = document.createElement("h4");
          partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
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

  function showSideBar() {
    const sideBar = document.getElementById('sideBar');
    if(sideBar.style.visibility == "hidden") {
      sideBar.style.visibility = "visible";
    } else {
      sideBar.style.visibility = "hidden";
    }
  }

