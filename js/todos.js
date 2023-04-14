const formCreate = document.querySelector(".form-create");
const addBtn = document.querySelector("#todo-add-btn");
const todosWrap = document.querySelector("#todos-wrap");
const titleTime = document.getElementById("title-time");
const closeBtn = document.getElementById("modal-close");
const editForm = document.getElementById("edit-form");
const overlay = document.querySelector(".overlay");

let editId;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
// todos.reverse()

if (todos) {
  showTodos();
}

function setTime() {
  const now = new Date();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();

  titleTime.textContent = `${hour}:${minute}:${second},  ${year}-${month}-${date}`;

  return `${hour}:${minute}, ${year}-${month}-${date}`;
}
setInterval(() => {
  setTime();
}, 1000);

function addTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
  todosWrap.innerHTML = "";
  todos.map((item, index) => {
    todosWrap.innerHTML += `
        <li class="todo-li ${item.complated == true ? 'complated' : ''}" ondblclick=(complatedTodo(${index}))>
            <div class="todos-text">
                <h4>${item.text}</h4>
                <p>${item.time}</p>
            </div>
            <button onclick=(editTodo(${index})) class="edit-btn">Edit</button>
            <button onclick=(deleteTodo(${index})) class="delete-btn">Delete</button>
        </li>
        `;
  });
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["create-text"].value.trim();
  const rightText1 = todoText.charAt(0).toUpperCase();
  const rightText2 = todoText.slice(1).toLowerCase();
  const readyText = rightText1 + rightText2;
  formCreate.reset();
  if (todoText.length == 0) {
    formCreate["create-text"].classList.add("error-message");
    setTimeout(() => {
      formCreate["create-text"].classList.remove("error-message");
    }, 2000);
  } else {
    todos.push({ text: readyText, time: setTime(), complated: false });
    addTodos();
    showTodos();
  }
});

function deleteTodo(id) {
  const removeTodo = todos.filter((item, index) => {
    return id != index;
  });
  todos = removeTodo;
  addTodos();
  showTodos();
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editText = document.getElementById("edit-input").value.trim();
  const rightText1 = editText.charAt(0).toUpperCase();
  const rightText2 = editText.slice(1).toLowerCase();
  const readyText = rightText1 + rightText2;
  todos.splice(editId, 1, {
    text: readyText,
    time: setTime(),
    complated: false,
  });
  addTodos();
  showTodos();
  overlay.style.display = "none";
});

function editTodo(id) {
  todos.map((item, index) => {
    if (id == index) {
      editForm["edit-input"].value = item.text;
    }
  });
  overlay.style.display = "flex";
  editId = id;
}

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});


// Complated
function complatedTodo(id){
    const complateTodo = todos.map((item, index) => {
        if(id == index){
            return {...item, complated: item.complated == false ? true : false}
        }else{
            return {...item}
        }
    })
    todos = complateTodo
    addTodos()
    showTodos()
}