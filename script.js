const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody")
const deleteAll = document.getElementById("delete-all-button");
const filterButtons = document.querySelectorAll(".filter-todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

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

const displayTodos = (data) => {
   const todoList = data || todos;
   todosBody.innerHTML = "";
   console.log(todoList);

   if (!todoList.length) {
      todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>"
      return;
   }
   todoList.forEach(todo => {
      todosBody.innerHTML += `
      <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "No date"}</td>
          <td>${todo.compeleted ? "done" : "pending"}</td>
          <td>
             <button onclick="editHandler('${todo.id}')">Edit</button>
             <button onclick="toggleHandler('${todo.id}')">${todo.compeleted ? "Undo" : "Do"}</button>
             <button onclick="deleteHandler('${todo.id}')">Delete</button>
          </td>
      </tr>
      `
   });
}

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

const deleteAllHandler = () => {
   if (todos.length) {
      todos = [];
      saveToLocalStorage();
      displayTodos();
      showAlert("All todos deleted!", "success");
   } else {
      showAlert("There is no todo yet!", "error")
   }

}

const deleteHandler = (id) => {
   const newTodo = todos.filter(todo => todo.id != id);
   todos = newTodo;
   saveToLocalStorage();
   displayTodos();
   showAlert("Todo deleted successfully", "success")
}

const toggleHandler = (id) => {
   const todo = todos.find(todo => todo.id === id);
   todo.compeleted = !todo.compeleted;
   saveToLocalStorage();
   displayTodos();
   showAlert("Todo status changed successfully", "success");
}

const editHandler = (id) => {
   const todo = todos.find(todo => todo.id === id);
   taskInput.value = todo.task;
   dateInput.value = todo.date;
   addButton.style.display = "none";
   editButton.style.display = "inline-block";
   editButton.dataset.id = id;
}

const applyEditHandler = (event) => {
   const id = event.target.dataset.id;
   const todo = todos.find(todo => todo.id === id);
   todo.task = taskInput.value;
   todo.date = dateInput.value;
   addButton.style.display = "inline-block";
   editButton.style.display = "none";
   saveToLocalStorage();
   displayTodos();
   showAlert("Todo edited successfully", "success")
}

const filterHandler = (event) => {
   let filterTodos = null;
   const filterName = event.target.dataset.filter;

   switch (filterName) {
      case "pending":
         filterTodos = todos.filter((todo) => todo.compeleted === false);
         break;
      case "compeleted":
         filterTodos = todos.filter((todo) => todo.compeleted === true);
         break;
      default:
         filterTodos = todos;
         break;
   }
   console.log(filterTodos);
   displayTodos(filterTodos);
}

window.addEventListener("load", () => displayTodos())
addButton.addEventListener("click", addHandler);
deleteAll.addEventListener("click", deleteAllHandler)
editButton.addEventListener("click", applyEditHandler)
filterButtons.forEach(button => {
   button.addEventListener("click", filterHandler)
})



