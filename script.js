//----------------------------------------------------------------
// CRUD operations
//----------------------------------------------------------------

var tasks = [];

// CREATE
//----------------------------------------------------------------
function createTask() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.id = "taskCard" + i;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = function () {
      toggleSelectAll();
    };
    taskCard.appendChild(checkbox);

    var title = document.createElement("h4");
    title.textContent = task.title;

    var description = document.createElement("p");
    description.textContent = task.description;

    var date = document.createElement("h5");
    date.textContent = task.date;

    var editButton = document.createElement("button");
    editButton.textContent = "Update";
    editButton.onclick = (function (index) {
      return function () {
        openUpdateModal(index);
      };
    })(i);

    var viewButton = document.createElement("button");
    viewButton.textContent = "Read";
    viewButton.onclick = (function (index) {
      return function () {
        openViewTaskModal(index);
      };
    })(i);

    taskCard.appendChild(title);
    taskCard.appendChild(description);
    taskCard.appendChild(date);
    taskCard.appendChild(editButton);
    taskCard.appendChild(viewButton);

    taskList.appendChild(taskCard);
  }
}

function saveTask() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var date = document.getElementById("date").value;

  if (title && description && date) {
    tasks.push({
      title: title,
      description: description,
      date: date,
    });

    createTask();
    closeAddModal();
  } else {
    alert("Todos los campos son obligatorios");
  }
}

// UPDATE
//----------------------------------------------------------------
function updateTask(index) {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var date = document.getElementById("date").value;

  if (title && description && date) {
    tasks[index] = {
      title: title,
      description: description,
      date: date,
    };

    createTask();
    closeAddModal();
  } else {
    alert("Todos los campos son obligatorios");
  }
}

// DELETE
//----------------------------------------------------------------
function deleteSelected() {
  var checkboxes = document.querySelectorAll(
    '.task-card input[type="checkbox"]'
  );
  var selectedIndexes = [];

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedIndexes.push(i);
    }
  }

  for (var i = selectedIndexes.length - 1; i >= 0; i--) {
    tasks.splice(selectedIndexes[i], 1);
  }

  createTask();
}

function deleteTask() {
  var index = parseInt(
    document.getElementById("viewTitle").getAttribute("data-index")
  );

  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    createTask();
  }
}

//----------------------------------------------------------------
// Modals actions
//----------------------------------------------------------------
function openAddModal() {
  clearFields();

  var taskModal = document.getElementById("taskModal");
  var saveChangesButton = taskModal.querySelector("#saveChangesButton");
  var saveButton = taskModal.querySelector("#saveButton");
  var cancelEditButton = taskModal.querySelector("#cancelEditButton");

  if (saveChangesButton) {
    saveChangesButton.style.display = "none";
  }
  if (cancelEditButton) {
    cancelEditButton.style.display = "flex";
  }
  if (saveButton) {
    saveButton.style.display = "flex";
  }

  taskModal.style.display = "flex";
}

function closeAddModal() {
  document.getElementById("taskModal").style.display = "none";
}

function openUpdateModal(index) {
  clearFields();

  var taskModal = document.getElementById("taskModal");
  var saveButton = taskModal.querySelector("#saveButton");
  var saveChangesButton = taskModal.querySelector("#saveChangesButton");
  var cancelEditButton = taskModal.querySelector("#cancelEditButton");

  if (saveChangesButton) {
    saveChangesButton.style.display = "flex";
  }
  if (cancelEditButton) {
    cancelEditButton.style.display = "flex";
  }
  if (saveButton) {
    saveButton.style.display = "none";
  }

  document.getElementById("title").value = tasks[index].title;
  document.getElementById("description").value = tasks[index].description;
  document.getElementById("date").value = tasks[index].date;

  taskModal.style.display = "flex";

  saveChangesButton.onclick = function () {
    updateTask(index);
  };
}

function openViewTaskModal(index) {
  document.getElementById("vTitle").textContent = tasks[index].title;
  document.getElementById("vDescription").textContent =
    tasks[index].description;
  document.getElementById("vDate").textContent = tasks[index].date;

  document.getElementById("viewModal").style.display = "flex";
}

function closeViewModal() {
  document.getElementById("viewModal").style.display = "none";
}

//----------------------------------------------------------------
// Filter o search and show all tasks
//----------------------------------------------------------------
function filterTasks() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();

  for (var i = 0; i < tasks.length; i++) {
    var taskCard = document.getElementById("taskCard" + i);
    var title = tasks[i].title.toLowerCase();

    if (title.includes(searchInput)) {
      taskCard.classList.remove("hidden");
    } else {
      taskCard.classList.add("hidden");
    }
  }
}

function showAllTasks() {
  var taskCards = document.querySelectorAll(".task-card");
  for (var i = 0; i < taskCards.length; i++) {
    taskCards[i].classList.remove("hidden");
  }
}

//----------------------------------------------------------------
// Checkbox actions
//----------------------------------------------------------------
function toggleSelectAll() {
  var checkboxes = document.querySelectorAll(
    '.task-card input[type="checkbox"]'
  );
  var selectAllCheckbox = document.querySelector(
    '#taskList thead input[type="checkbox"]'
  );

  var allChecked = true;
  for (var i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      allChecked = false;
      break;
    }
  }
  selectAllCheckbox.checked = allChecked;
}

// Clear all fields
//----------------------------------------------------------------
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
}