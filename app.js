window.addEventListener("load", () => {
  const form = document.querySelector("#todo-form");
  const input = document.querySelector("#todo-input");
  const todosParent = document.querySelector("#todos");

  //  Load existing todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  //  Function to save todos to localStorage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //  Function to render todos
  function renderTodos() {
    todosParent.innerHTML = ""; // clear before re-render
    todos.forEach((todo) => {
      createTodoElement(todo);
    });
    
    // Update task count
    document.getElementById("total-tasks").textContent = todos.length;
  }

  //  Function to create todo DOM elements
  function createTodoElement(todo) {
    const taskParent = document.createElement("div");
    taskParent.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("content");
    taskParent.append(taskContent);

    const taskInput = document.createElement("input");
    taskInput.classList.add("text");
    taskInput.type = "text";
    taskInput.value = todo.task;
    taskInput.setAttribute("readonly", "readonly");

    // Action button containers
    taskContent.append(taskInput);

    const taskActionContainer = document.createElement("div");
    taskActionContainer.classList.add("action");

    // Action buttons
    const taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("edit");
    taskEditBtn.innerHTML = "Edit Todo";

    const taskDelBtn = document.createElement("button");
    taskDelBtn.classList.add("Delete");
    taskDelBtn.innerHTML = "Delete Todo";

    taskActionContainer.append(taskEditBtn, taskDelBtn);
    taskContent.append(taskActionContainer);
    todosParent.append(taskParent);

    //  Edit functionality
    taskEditBtn.addEventListener("click", () => {
      if (taskEditBtn.innerHTML === "Edit Todo") {
        taskInput.removeAttribute("readonly");
        taskInput.focus();
        taskEditBtn.innerHTML = "Save Todo";
      } else {
        taskInput.setAttribute("readonly", "readonly");
        taskEditBtn.innerHTML = "Edit Todo";

        // update todo in localStorage
        todos = todos.map((t) =>
          t.id === todo.id ? { ...t, task: taskInput.value } : t
        );
        saveTodos();
      }
    });

    //  Delete functionality
    taskDelBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos(); // re-render UI
    });
  }

  //  Handle form submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = input.value;
    if (!task) {
      alert("Todo task cannot be empty kindly fill in a task or todo");
      return;
    }

    // create new todo object
    const newTodo = {
      id: Date.now(),
      task: task,
    };

    todos.push(newTodo);
    saveTodos();

    createTodoElement(newTodo);
    input.value = "";
    
    // Update task count
    document.getElementById("total-tasks").textContent = todos.length;
  });

  //  Initial render
  renderTodos();
});
