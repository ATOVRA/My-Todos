const darkMode = document.querySelector("#dark-mode-toggle");
const body = document.body;

let toggleStorage = localStorage.getItem("darkMode");

if (toggleStorage) {
    body.classList.toggle("dark-mode");
    darkMode.setAttribute('checked', 'checked')
}

darkMode.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    if(body.getAttribute('class') == 'dark-mode'){
    localStorage.setItem('darkMode', 'dark')
  }else{
    localStorage.setItem('darkMode', '')
  }
});
