const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody")

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const generateId = () => {
   return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
}

const showAlert = (message, type) => {
   alertMessage.innerHTML = "";
   const alert = document.createElement("p")
   alert.innerText = message;
   alert.classList.add("alert");
   alert.classList.add(`alert-${type}`);
   alertMessage.append(alert);

   setTimeout(() => {
      alert.style.display = "none";
   }, 2000);
}

const displayTodos = () => {
   todosBody.innerHTML="";
   if (!todos.length) {
      todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>"
      return;
   }
   todos.forEach(todo => {
      todosBody.innerHTML+= `
      <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "No date"}</td>
          <td>${todo.compeleted ? "done": "pending"}</td>
          <td>
             <button>Edit</button>
             <button>Do</button>
             <button>Delete</button>
          </td>
      </tr>
      `
   });
}
displayTodos()
const saveToLocalStorage = () => {
   localStorage.setItem("todos", JSON.stringify(todos))
}

const addHandler = () => {
   const task = taskInput.value;
   const date = dateInput.value;
   const todo = {
      id: generateId(),
      task,//task : task,
      date,//date : date,
      compeleted: false
   }
   if (task) {
      todos.push(todo);
      saveToLocalStorage();
      displayTodos();
      taskInput.value = "";
      dateInput.value = "";
      showAlert("Todo added successfully", "success")
   } else {
      showAlert("Please enter a todo!", "error")
   }
}

addButton.addEventListener("click", addHandler);