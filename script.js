function search() {

    stopDafaultText();

    const query = document.getElementById('searchInput').value;
  
    const apiKey = "AIzaSyBdfnotXFBqJ8jUEovYvvpPrGBb49fvyao";
    const searchEngineId = "73bb1182000184ef1";
  
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const searchDiv = document.getElementById('resultDiv');
        searchDiv.innerHTML = "<h3>Search Results:</h3>";
  
        if (!data.items || data.items.length === 0) {
          searchDiv.innerHTML += "<p>No results found.</p>";
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

  document.addEventListener("DOMContentLoaded", function(){
    const request = 1;
    const key = "L1igJ1IKeYlWT9CckS0cQIGeevVctOAl";
    const url = "https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=L1igJ1IKeYlWT9CckS0cQIGeevVctOAl";
    
  });

  
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

    const content = document.getElementById('content');
    content.className = "flex-row";

  }

  function showSideBar() {
    const sideBar = document.getElementById('sideBar');
    if(sideBar.style.visibility == "hidden") {
      sideBar.style.visibility = "visible";
    } else {
      sideBar.style.visibility = "hidden";
    }
  }