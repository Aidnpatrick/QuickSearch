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
          const title = document.createElement("p");
          title.textContent = item.title;
          title.style.fontWeight = "bold";
          searchDiv.appendChild(title);
  
          const link = document.createElement("a");
          link.className = "search-result";
          link.textContent = item.link;
          link.href = item.link;
          link.target = "_blank";
          link.style.color = "blue";
          searchDiv.appendChild(link);
          
          const spacer = document.createElement("hr");
          spacer.className = "hr";
          searchDiv.appendChild(spacer);
        });
      })

      .catch(error => {
        console.error("Error fetching search results:", error);
      });
  }
  
  function checkEnter(event) {
    if (event.key === "Enter") {
      search();
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    divDefault = document.getElementById("default");
    divDefault.textContent = "Search Anything you like."

  });
  

  function stopDafaultText() {
    const default = document.getElementById('default');
    default.textContent = "";
  }