/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appStorage.js":
/*!***************************!*\
  !*** ./src/appStorage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadDefaultProject": () => (/* binding */ loadDefaultProject),
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects),
/* harmony export */   "saveProjects": () => (/* binding */ saveProjects)
/* harmony export */ });
function saveDefaultProject(project) {
  localStorage.setItem('defaultProject', JSON.stringify(project));
}

function loadDefaultProject() {
  return JSON.parse(localStorage.defaultProject);
}

function saveProjects(projectList, defaultProject) {
  localStorage.setItem('projects', JSON.stringify(projectList));
  saveDefaultProject(defaultProject);
};

function loadProjects() {
  return JSON.parse(localStorage.getItem('projects'));
}





/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

const taskDivFactory = (name, description, dueDate, priority, completed, taskId, editHandler) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = `task-${taskId}`;
    task.dataset.index = taskId;

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.id = `task-${taskId}-checkbox`;
    const labelName = document.createElement('h3');
    labelName.innerHTML = name;
    labelName.id = `task-${taskId}-name`;
    const labelDesc = document.createElement('span');
    labelDesc.className = 'task-span';
    labelDesc.innerHTML = description;

    if(completed) {
      labelName.style.textDecoration = 'line-through';
      labelName.style.color = 'gray';
    }

    leftSection.appendChild(checkbox);
    leftSection.appendChild(labelName);
    leftSection.appendChild(labelDesc);

    const priorityLib = {
      0: "LOW",
      1: "MID",
      2: "HIGH"
    };

    const labelPriority = document.createElement('span');
    labelPriority.className = 'task-span';
    labelPriority.classList.add(`priority-${priority}`);
    labelPriority.innerHTML = `${priorityLib[priority]} PRIORITY`;

    const divisor = document.createElement('div');
    divisor.className = 'divisor';

    const date = document.createElement('span');
    if(dueDate === '') {
      date.innerHTML = `No due date`;
    } else {
      date.innerHTML = `Due Date: ${dueDate.getUTCDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
    }
    
    const edit = document.createElement('img');
    edit.addEventListener('click', editHandler);
    edit.classList.add('small');
    edit.src = './assets/edit.png';
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.classList.add('small');
    remove.src = './assets/remove.png';
    remove.dataset.index = taskId;
    remove.alt = 'X';
    remove.id = `remove-task-${taskId}`;

    rightSection.appendChild(labelPriority);
    rightSection.appendChild(divisor);
    rightSection.appendChild(date);
    rightSection.appendChild(edit);
    rightSection.appendChild(remove);

    task.appendChild(leftSection);
    task.appendChild(rightSection);

    return task;
};

const projectDivFactory = (name, projectId) => {
  const project = document.createElement('li');
  project.id = `project-${projectId}`;
  const leftContainer = document.createElement('div');
  leftContainer.dataset.index = projectId;
  const projectIcon = document.createElement('img');
  projectIcon.src = './assets/project.png';
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  const deleteIcon = document.createElement('img');
  deleteIcon.classList.add('small');
  deleteIcon.src = './assets/remove.png';
  deleteIcon.alt = 'X';
 
  leftContainer.appendChild(projectIcon);
  leftContainer.appendChild(projectName);
  project.appendChild(leftContainer);
  project.appendChild(deleteIcon);

  return project;
}

const DOM = () => {
  // Sidebar
  const btnInbox = document.getElementById('btn-inbox');
  const btnToday = document.getElementById('btn-today');
  const btnWeek = document.getElementById('btn-week');
  
  // Add new project
  const btnNewProject = document.getElementById('btn-new-project');
  const inputContainer = document.getElementById('input-container');
  const projectNameInput = document.getElementById('project-name-input');
  const btnConfirmProject = document.getElementById('btn-confirm-project-name');
  const btnCancelProject = document.getElementById('cancel-project');

  // Task List
  const listTitle = document.getElementById('task-list-title');
  const btnNewTask = document.getElementById('btn-new-task');

  // 'Create Task' Form
  const container = document.querySelector('.create-task');
  const title = document.getElementById('title-input');
  const description = document.getElementById('description-input');
  const date = document.getElementById('date-input');
  const btnLow = document.getElementById('btn-low');
  const btnMid = document.getElementById('btn-mid');
  const btnHigh = document.getElementById('btn-high');
  const btnAddTask = document.getElementById('btn-add-task');
  const btnCancelTask = document.getElementById('btn-cancel-task');


  // 'Edit Task' Form
  const taskOverlay = document.querySelector('.overlay-container');
  const titleEdit = document.getElementById('title-input-edit');
  const descriptionEdit = document.getElementById('description-input-edit');
  const dateEdit = document.getElementById('date-input-edit');
  const btnLowEdit = document.getElementById('btn-low-edit');
  const btnMidEdit = document.getElementById('btn-mid-edit');
  const btnHighEdit = document.getElementById('btn-high-edit');
  const btnConfirmEdit = document.getElementById('btn-confirm-edit');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');

  // Parent Nodes
  const projectListParent = document.getElementById('project-list');
  const taskListParent = document.querySelector('.task-list');

  // Methods (projects)
  function getProjectName() {
    return projectNameInput.value;
  }

  // Methods (tasks)
  function taskListAdd(task) {
    taskListParent.appendChild(task);
  }
  
  function projectListAdd(project) {
    projectListParent.appendChild(project);
  }

  function getTaskName() {
    return title.value;
  }

  function setTaskName(newName) {
    title.value = newName;
  }

  function getDescription() {
    return description.value;
  }

  function setDescription(newDescription) {
    description.value = newDescription;
  }

  function getDate() {
    return date.value;
  }

  function setDate(newDate) {
    date.value = newDate;
  }

  function setListTitle(newTitle) {
    listTitle.innerHTML = newTitle;
  }

  function updatePriority(low, mid, high, priority) {
    if(priority === 0) {
      low.classList.add('priority-low-on');
      mid.classList.remove('priority-mid-on');
      high.classList.remove('priority-high-on');
    } else if(priority === 1) {
      mid.classList.add('priority-mid-on');
      low.classList.remove('priority-low-on');
      high.classList.remove('priority-high-on');
    } else if(priority === 2) {
      high.classList.add('priority-high-on');
      low.classList.remove('priority-low-on');
      mid.classList.remove('priority-mid-on');
    } else {
      high.classList.remove('priority-high-on');
      low.classList.remove('priority-low-on');
      mid.classList.remove('priority-mid-on');
    }
  }

  
  function clearFields() {
    setTaskName('');
    setDescription('');
    setDate('');
    updatePriority(btnLow, btnMid, btnHigh, '');
    updatePriority(btnLowEdit, btnMidEdit, btnHighEdit, '');
  }
  
  function showTaskListPlaceholder() {
    const text = document.createElement('h2');
    text.innerHTML = 'Nothing here...';
    text.style.color = 'gray';
    taskListParent.appendChild(text);
  }

  function showProjectListPlaceholder() {
    const text = document.createElement('h2');
    text.innerHTML = 'Nothing here...';
    projectListParent.appendChild(text);
  }

  return { taskDivFactory, projectDivFactory, btnInbox, btnToday, btnWeek, btnNewProject, container, 
           inputContainer, projectNameInput, btnConfirmProject, btnCancelProject, btnNewTask, btnLow, btnMid,  
           btnHigh, btnAddTask, btnCancelTask, projectListParent, taskListParent, taskOverlay, 
           taskListAdd, projectListAdd, getTaskName, setTaskName, getProjectName, getDescription,  
           setDescription, getDate, setDate, titleEdit, descriptionEdit, dateEdit, btnLowEdit, btnMidEdit, 
           btnHighEdit, btnConfirmEdit, btnCancelEdit, setListTitle, updatePriority, clearFields, 
           showTaskListPlaceholder, showProjectListPlaceholder };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);

/***/ }),

/***/ "./src/eventController.js":
/*!********************************!*\
  !*** ./src/eventController.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _appStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appStorage */ "./src/appStorage.js");
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */






const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__["default"])();

const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('INBOX');

const projectManager = {
  projects: [],
  activeProject: defaultProject
}

const taskManager = {
  activeTask: undefined,
  currentPriority: 0
}

function retrieveTask(task) {
  return new _task__WEBPACK_IMPORTED_MODULE_1__["default"](task._name, task._description, new Date(task._dueDate), task._priority, task._completed);
}

function retrieveProject(project) {
  return new _project__WEBPACK_IMPORTED_MODULE_2__["default"](project._name);
}

if("projects" in localStorage) {
  const storageTasks = (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.loadDefaultProject)()._myTasks;
  for(const task of storageTasks) {
    defaultProject.myTasks.push(retrieveTask(task));
  }

  const storageProjects = (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.loadProjects)();
  for(const project of storageProjects) {
    const projectObject = retrieveProject(project);

    for(const task of project._myTasks) {
      projectObject.myTasks.push(retrieveTask(task));
    }

    projectManager.projects.push(projectObject);
  }
}

function getAllTasks() {
  const tasks = [];

  tasks.push(defaultProject.myTasks);

  for(const project of projectManager.projects) {
    tasks.push(project.myTasks);
  }

  return tasks.flat();
}

function isToday(date) {
  const currentDate = new Date().getDate();
  return date.getUTCDate() === currentDate;
}

function isThisWeek(date) {
  const currentDate = new Date();
  const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  const weekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
  
  return date >= weekStart && date <= weekEnd;
}

function addTaskHandler() {
  if(display.getTaskName() !== '') {
    const name = display.getTaskName();
    const description = display.getDescription();
    const date = new Date(`${display.getDate()}`);
    const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, taskManager.currentPriority, false);
    projectManager.activeProject.myTasks.push(task);
    refreshTaskList(projectManager.activeProject.myTasks);
    display.container.style.display = 'none';
    display.clearFields();
    (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.saveProjects)(projectManager.projects, defaultProject);
  }
}

function confirmEditHandler() {
  display.taskOverlay.style.display = 'none';
  const task = taskManager.activeTask;
  task.name = display.titleEdit.value;
  task.description = display.descriptionEdit.value;
  task.date = display.dateEdit.value;
  refreshTaskList(projectManager.activeProject.myTasks);
  (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.saveProjects)(projectManager.projects, defaultProject);
}

function editTaskHandler(task) {
  return function() {
    display.taskOverlay.style.display = 'flex';
    taskManager.activeTask = task;
    display.titleEdit.value = task.name;
    display.descriptionEdit.value = task.description;
    display.updatePriority(display.btnLowEdit, display.btnMidEdit, display.btnHighEdit, task.priority);
    if(task.dueDate !== '') {
      display.dateEdit.value = task.dueDate.toISOString().split('T')[0];
    }
  }
}

function removeProjectHandler(project) {
  return function() {
    projectManager.projects.splice(project, 1);
    document.getElementById(`project-${project}`).remove();
    projectManager.activeProject = defaultProject;
    display.setListTitle(projectManager.activeProject.name);
    refreshTaskList(projectManager.activeProject.myTasks);
    (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.saveProjects)(projectManager.projects, defaultProject);
  }
}

function toggleProjectHandler(project) {
  return function() {
    projectManager.activeProject = projectManager.projects[project];
    display.setListTitle(projectManager.activeProject.name);
    refreshTaskList(projectManager.activeProject.myTasks);
  }
}

function confirmProjectHandler() {
  if(display.getProjectName() !== '') {
    const name = display.getProjectName();
    projectManager.projects.push(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](name));
    projectManager.activeProject = projectManager.projects[projectManager.projects.length-1];
    showProjects(projectManager.projects);
    display.setListTitle(projectManager.activeProject.name);
    display.inputContainer.style.display = '';
    display.projectNameInput.value = '';
    (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.saveProjects)(projectManager.projects, defaultProject);
    refreshTaskList(projectManager.activeProject.myTasks);
  }
}

function crossOutTask(task) {
  const name = document.getElementById(`task-${task.dataset.index}-name`);
  getAllTasks()[task.dataset.index].completed = true;
  name.style.textDecoration = 'line-through';
  name.style.color = 'gray';
}

function undoCrossout(task) {
  const name = document.getElementById(`task-${task.dataset.index}-name`);
  getAllTasks()[task.dataset.index].completed = false;
  name.style.textDecoration = 'none';
  name.style.color = '';
}

function showTasks(list) {
  while(display.taskListParent.firstChild) {
    display.taskListParent.removeChild(display.taskListParent.firstChild);
  }

  // Append tasks to current task list
  for(const task of list) {
    taskManager.activeTask = task;
    if(isNaN(task.dueDate.getDate())) {
      display.taskListAdd(display.taskDivFactory(task.name, task.description, '', task.priority, task.completed, list.indexOf(task), editTaskHandler(taskManager.activeTask)));
    } else {
      display.taskListAdd(display.taskDivFactory(task.name, task.description, task.dueDate, task.priority, task.completed, list.indexOf(task), editTaskHandler(taskManager.activeTask)));
    }
  }

  // Add listeners to remove and edit buttons
  for(const task of Array.from(display.taskListParent.childNodes)) {
    const index = task.dataset.index;
    const checkbox = document.getElementById(`task-${index}-checkbox`);
    const remove = document.getElementById(`remove-task-${index}`);

    remove.addEventListener('click', () => {
      projectManager.activeProject.removeTask(projectManager.activeProject.myTasks[index]);
      task.remove();
      refreshTaskList(projectManager.activeProject.myTasks);
    });

    checkbox.addEventListener('click', () => {
      if(!checkbox.checked) {
        undoCrossout(task);
      } else {
        crossOutTask(task);
      }

      (0,_appStorage__WEBPACK_IMPORTED_MODULE_3__.saveProjects)(projectManager.projects, defaultProject);
    });
  }

  if(list.length === 0) {
    display.showTaskListPlaceholder();
  }
}

function refreshTaskList(newList) {
  showTasks(newList);
}

function showProjects(list) {
  while(display.projectListParent.firstChild) {
    display.projectListParent.removeChild(display.projectListParent.firstChild);
  }

  for(const project of list) {
    display.projectListAdd(display.projectDivFactory(project.name, list.indexOf(project)));
  }

  for(const project of Array.from(display.projectListParent.childNodes)) {
    const remove = project.childNodes[1];
    const index = project.childNodes[0].dataset.index;
    remove.addEventListener('click', removeProjectHandler(index));
    project.childNodes[0].addEventListener('click', toggleProjectHandler(index));
  }

  if(list.length === 0) {
    display.showProjectListPlaceholder();
  }
}

function hookMenuListeners() {
  display.btnAddTask.addEventListener('click', addTaskHandler);

  display.btnCancelTask.addEventListener('click', () => {
    display.container.style.display = 'none';
    display.clearFields();
  });
  
  display.btnConfirmProject.addEventListener('click', confirmProjectHandler);
  
  display.btnInbox.addEventListener('click', () => {
    refreshTaskList(defaultProject.myTasks);
    projectManager.activeProject = defaultProject;
    display.setListTitle('INBOX');
  });
  
  display.btnToday.addEventListener('click', () => {
    const todayTasks = getAllTasks().filter(task => isToday(task.dueDate));
    refreshTaskList(todayTasks);
    projectManager.activeProject = defaultProject;
    display.setListTitle('TODAY');
  });
  
  display.btnWeek.addEventListener('click', () => {
    const weekTasks = getAllTasks().filter(task => isThisWeek(task.dueDate));
    refreshTaskList(weekTasks);
    projectManager.activeProject = defaultProject;
    display.setListTitle('THIS WEEK');
  });

  display.btnNewTask.addEventListener('click', () => {
    display.container.style.display = 'flex';
  });

  display.btnNewProject.addEventListener('click', () => {
    display.inputContainer.style.display = 'flex';
  });

  display.btnCancelProject.addEventListener('click', () => {
    display.inputContainer.style.display = 'none';
    display.projectNameInput.value = '';
  });

  display.btnConfirmEdit.addEventListener('click', confirmEditHandler);

  display.btnCancelEdit.addEventListener('click', () => {
    display.taskOverlay.style.display = 'none';
  });

  display.btnLow.addEventListener('click', () => {
    taskManager.currentPriority = 0;
    display.updatePriority(display.btnLow, display.btnMid, display.btnHigh, 0);
  });

  display.btnMid.addEventListener('click', () => {
    taskManager.currentPriority = 1;
    display.updatePriority(display.btnLow, display.btnMid, display.btnHigh, 1);
  });

  display.btnHigh.addEventListener('click', () => {
    taskManager.currentPriority = 2;
    display.updatePriority(display.btnLow, display.btnMid, display.btnHigh, 2);
  });

  display.btnLowEdit.addEventListener('click', () => {
    taskManager.currentPriority = 0;
    display.updatePriority(display.btnLowEdit, display.btnMidEdit, display.btnHighEdit, 0);
  });

  display.btnMidEdit.addEventListener('click', () => {
    taskManager.currentPriority = 1;
    display.updatePriority(display.btnLowEdit, display.btnMidEdit, display.btnHighEdit, 1);
  });

  display.btnHighEdit.addEventListener('click', () => {
    taskManager.currentPriority = 2;
    display.updatePriority(display.btnLowEdit, display.btnMidEdit, display.btnHighEdit, 2);
  });
}

function loadApp() {
    refreshTaskList(defaultProject.myTasks);
    showProjects(projectManager.projects);
    hookMenuListeners();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadApp);


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */
class Project {
  constructor(name) {
    this.name = name;
    this.myTasks = [];
    this.isComplete = false;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get myTasks() {
    return this._myTasks;
  }

  set myTasks(list) {
    this._myTasks = list;
  }

  addTask(task) {
    this.myTasks.push(task);
  }

  get isComplete() {
    return this._isComplete;
  }

  set isComplete(status) {
    this._isComplete = status;
  }

  removeTask(task) {
    this.myTasks.splice(this.myTasks.indexOf(task), 1);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */
class Task {
  constructor(name, description, dueDate, priority, completed = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  get name() {
    return this._name;
  }
  
  set name(newName) {
    this._name = newName;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(date) {
    this._dueDate = date;
  }

  get priority() {
    return this._priority;
  }

  set priority(newPriority) {
    this._priority = newPriority;
  }

  get completed() {
    return this._completed;
  }

  set completed(complete) {
    this._completed = complete;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventController */ "./src/eventController.js");


(0,_eventController__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNVR2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7QUN6Q3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7O1VDbkRuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4Qyw0REFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2F2ZURlZmF1bHRQcm9qZWN0KHByb2plY3QpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RlZmF1bHRQcm9qZWN0JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdCkpO1xufVxuXG5mdW5jdGlvbiBsb2FkRGVmYXVsdFByb2plY3QoKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5kZWZhdWx0UHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIHNhdmVQcm9qZWN0cyhwcm9qZWN0TGlzdCwgZGVmYXVsdFByb2plY3QpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKTtcbiAgc2F2ZURlZmF1bHRQcm9qZWN0KGRlZmF1bHRQcm9qZWN0KTtcbn07XG5cbmZ1bmN0aW9uIGxvYWRQcm9qZWN0cygpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xufVxuXG5leHBvcnQgeyBsb2FkRGVmYXVsdFByb2plY3QsIHNhdmVQcm9qZWN0cywgbG9hZFByb2plY3RzIH1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmNvbnN0IHRhc2tEaXZGYWN0b3J5ID0gKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkLCB0YXNrSWQsIGVkaXRIYW5kbGVyKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhc2suY2xhc3NMaXN0LmFkZCgndGFzaycpO1xuICAgIHRhc2suaWQgPSBgdGFzay0ke3Rhc2tJZH1gO1xuICAgIHRhc2suZGF0YXNldC5pbmRleCA9IHRhc2tJZDtcblxuICAgIGNvbnN0IGxlZnRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcmlnaHRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnbGVmdC1zZWN0aW9uJyk7XG4gICAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LXNlY3Rpb24nKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICBjaGVja2JveC5jaGVja2VkID0gY29tcGxldGVkO1xuICAgIGNoZWNrYm94LmlkID0gYHRhc2stJHt0YXNrSWR9LWNoZWNrYm94YDtcbiAgICBjb25zdCBsYWJlbE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGxhYmVsTmFtZS5pbm5lckhUTUwgPSBuYW1lO1xuICAgIGxhYmVsTmFtZS5pZCA9IGB0YXNrLSR7dGFza0lkfS1uYW1lYDtcbiAgICBjb25zdCBsYWJlbERlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbGFiZWxEZXNjLmNsYXNzTmFtZSA9ICd0YXNrLXNwYW4nO1xuICAgIGxhYmVsRGVzYy5pbm5lckhUTUwgPSBkZXNjcmlwdGlvbjtcblxuICAgIGlmKGNvbXBsZXRlZCkge1xuICAgICAgbGFiZWxOYW1lLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCc7XG4gICAgICBsYWJlbE5hbWUuc3R5bGUuY29sb3IgPSAnZ3JheSc7XG4gICAgfVxuXG4gICAgbGVmdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGxhYmVsTmFtZSk7XG4gICAgbGVmdFNlY3Rpb24uYXBwZW5kQ2hpbGQobGFiZWxEZXNjKTtcblxuICAgIGNvbnN0IHByaW9yaXR5TGliID0ge1xuICAgICAgMDogXCJMT1dcIixcbiAgICAgIDE6IFwiTUlEXCIsXG4gICAgICAyOiBcIkhJR0hcIlxuICAgIH07XG5cbiAgICBjb25zdCBsYWJlbFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGxhYmVsUHJpb3JpdHkuY2xhc3NOYW1lID0gJ3Rhc2stc3Bhbic7XG4gICAgbGFiZWxQcmlvcml0eS5jbGFzc0xpc3QuYWRkKGBwcmlvcml0eS0ke3ByaW9yaXR5fWApO1xuICAgIGxhYmVsUHJpb3JpdHkuaW5uZXJIVE1MID0gYCR7cHJpb3JpdHlMaWJbcHJpb3JpdHldfSBQUklPUklUWWA7XG5cbiAgICBjb25zdCBkaXZpc29yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2aXNvci5jbGFzc05hbWUgPSAnZGl2aXNvcic7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGlmKGR1ZURhdGUgPT09ICcnKSB7XG4gICAgICBkYXRlLmlubmVySFRNTCA9IGBObyBkdWUgZGF0ZWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGUuaW5uZXJIVE1MID0gYER1ZSBEYXRlOiAke2R1ZURhdGUuZ2V0VVRDRGF0ZSgpfS8ke2R1ZURhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZHVlRGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdEhhbmRsZXIpO1xuICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnc21hbGwnKTtcbiAgICBlZGl0LnNyYyA9ICcuL2Fzc2V0cy9lZGl0LnBuZyc7XG4gICAgZWRpdC5hbHQgPSAnRWRpdCc7XG4gICAgZWRpdC5pZCA9IGBlZGl0LXRhc2stJHt0YXNrSWR9YDtcblxuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHJlbW92ZS5jbGFzc0xpc3QuYWRkKCdzbWFsbCcpO1xuICAgIHJlbW92ZS5zcmMgPSAnLi9hc3NldHMvcmVtb3ZlLnBuZyc7XG4gICAgcmVtb3ZlLmRhdGFzZXQuaW5kZXggPSB0YXNrSWQ7XG4gICAgcmVtb3ZlLmFsdCA9ICdYJztcbiAgICByZW1vdmUuaWQgPSBgcmVtb3ZlLXRhc2stJHt0YXNrSWR9YDtcblxuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChsYWJlbFByaW9yaXR5KTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoZGl2aXNvcik7XG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChlZGl0KTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQocmVtb3ZlKTtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcblxuICAgIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdERpdkZhY3RvcnkgPSAobmFtZSwgcHJvamVjdElkKSA9PiB7XG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBwcm9qZWN0LmlkID0gYHByb2plY3QtJHtwcm9qZWN0SWR9YDtcbiAgY29uc3QgbGVmdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZWZ0Q29udGFpbmVyLmRhdGFzZXQuaW5kZXggPSBwcm9qZWN0SWQ7XG4gIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIHByb2plY3RJY29uLnNyYyA9ICcuL2Fzc2V0cy9wcm9qZWN0LnBuZyc7XG4gIHByb2plY3RJY29uLmFsdCA9ICdPJztcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHByb2plY3ROYW1lLmlubmVySFRNTCA9IG5hbWU7XG4gIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdzbWFsbCcpO1xuICBkZWxldGVJY29uLnNyYyA9ICcuL2Fzc2V0cy9yZW1vdmUucG5nJztcbiAgZGVsZXRlSWNvbi5hbHQgPSAnWCc7XG4gXG4gIGxlZnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICBsZWZ0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChsZWZ0Q29udGFpbmVyKTtcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICByZXR1cm4gcHJvamVjdDtcbn1cblxuY29uc3QgRE9NID0gKCkgPT4ge1xuICAvLyBTaWRlYmFyXG4gIGNvbnN0IGJ0bkluYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1pbmJveCcpO1xuICBjb25zdCBidG5Ub2RheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tdG9kYXknKTtcbiAgY29uc3QgYnRuV2VlayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4td2VlaycpO1xuICBcbiAgLy8gQWRkIG5ldyBwcm9qZWN0XG4gIGNvbnN0IGJ0bk5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy1wcm9qZWN0Jyk7XG4gIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRhaW5lcicpO1xuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZS1pbnB1dCcpO1xuICBjb25zdCBidG5Db25maXJtUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1wcm9qZWN0LW5hbWUnKTtcbiAgY29uc3QgYnRuQ2FuY2VsUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWwtcHJvamVjdCcpO1xuXG4gIC8vIFRhc2sgTGlzdFxuICBjb25zdCBsaXN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1saXN0LXRpdGxlJyk7XG4gIGNvbnN0IGJ0bk5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy10YXNrJyk7XG5cbiAgLy8gJ0NyZWF0ZSBUYXNrJyBGb3JtXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtdGFzaycpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1pbnB1dCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dCcpO1xuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtaW5wdXQnKTtcbiAgY29uc3QgYnRuTG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1sb3cnKTtcbiAgY29uc3QgYnRuTWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1taWQnKTtcbiAgY29uc3QgYnRuSGlnaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taGlnaCcpO1xuICBjb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1hZGQtdGFzaycpO1xuICBjb25zdCBidG5DYW5jZWxUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jYW5jZWwtdGFzaycpO1xuXG5cbiAgLy8gJ0VkaXQgVGFzaycgRm9ybVxuICBjb25zdCB0YXNrT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWNvbnRhaW5lcicpO1xuICBjb25zdCB0aXRsZUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQtZWRpdCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24taW5wdXQtZWRpdCcpO1xuICBjb25zdCBkYXRlRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLWlucHV0LWVkaXQnKTtcbiAgY29uc3QgYnRuTG93RWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbG93LWVkaXQnKTtcbiAgY29uc3QgYnRuTWlkRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWlkLWVkaXQnKTtcbiAgY29uc3QgYnRuSGlnaEVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWhpZ2gtZWRpdCcpO1xuICBjb25zdCBidG5Db25maXJtRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1lZGl0Jyk7XG4gIGNvbnN0IGJ0bkNhbmNlbEVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNhbmNlbC1lZGl0Jyk7XG5cbiAgLy8gUGFyZW50IE5vZGVzXG4gIGNvbnN0IHByb2plY3RMaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCB0YXNrTGlzdFBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcblxuICAvLyBNZXRob2RzIChwcm9qZWN0cylcbiAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgcmV0dXJuIHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG4gIH1cblxuICAvLyBNZXRob2RzICh0YXNrcylcbiAgZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICAgIHRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xuICB9XG4gIFxuICBmdW5jdGlvbiBwcm9qZWN0TGlzdEFkZChwcm9qZWN0KSB7XG4gICAgcHJvamVjdExpc3RQYXJlbnQuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXNrTmFtZSgpIHtcbiAgICByZXR1cm4gdGl0bGUudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUYXNrTmFtZShuZXdOYW1lKSB7XG4gICAgdGl0bGUudmFsdWUgPSBuZXdOYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcbiAgICBkZXNjcmlwdGlvbi52YWx1ZSA9IG5ld0Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcbiAgICByZXR1cm4gZGF0ZS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERhdGUobmV3RGF0ZSkge1xuICAgIGRhdGUudmFsdWUgPSBuZXdEYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TGlzdFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgbGlzdFRpdGxlLmlubmVySFRNTCA9IG5ld1RpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJpb3JpdHkobG93LCBtaWQsIGhpZ2gsIHByaW9yaXR5KSB7XG4gICAgaWYocHJpb3JpdHkgPT09IDApIHtcbiAgICAgIGxvdy5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eS1sb3ctb24nKTtcbiAgICAgIG1pZC5jbGFzc0xpc3QucmVtb3ZlKCdwcmlvcml0eS1taWQtb24nKTtcbiAgICAgIGhpZ2guY2xhc3NMaXN0LnJlbW92ZSgncHJpb3JpdHktaGlnaC1vbicpO1xuICAgIH0gZWxzZSBpZihwcmlvcml0eSA9PT0gMSkge1xuICAgICAgbWlkLmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5LW1pZC1vbicpO1xuICAgICAgbG93LmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW9yaXR5LWxvdy1vbicpO1xuICAgICAgaGlnaC5jbGFzc0xpc3QucmVtb3ZlKCdwcmlvcml0eS1oaWdoLW9uJyk7XG4gICAgfSBlbHNlIGlmKHByaW9yaXR5ID09PSAyKSB7XG4gICAgICBoaWdoLmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5LWhpZ2gtb24nKTtcbiAgICAgIGxvdy5jbGFzc0xpc3QucmVtb3ZlKCdwcmlvcml0eS1sb3ctb24nKTtcbiAgICAgIG1pZC5jbGFzc0xpc3QucmVtb3ZlKCdwcmlvcml0eS1taWQtb24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlnaC5jbGFzc0xpc3QucmVtb3ZlKCdwcmlvcml0eS1oaWdoLW9uJyk7XG4gICAgICBsb3cuY2xhc3NMaXN0LnJlbW92ZSgncHJpb3JpdHktbG93LW9uJyk7XG4gICAgICBtaWQuY2xhc3NMaXN0LnJlbW92ZSgncHJpb3JpdHktbWlkLW9uJyk7XG4gICAgfVxuICB9XG5cbiAgXG4gIGZ1bmN0aW9uIGNsZWFyRmllbGRzKCkge1xuICAgIHNldFRhc2tOYW1lKCcnKTtcbiAgICBzZXREZXNjcmlwdGlvbignJyk7XG4gICAgc2V0RGF0ZSgnJyk7XG4gICAgdXBkYXRlUHJpb3JpdHkoYnRuTG93LCBidG5NaWQsIGJ0bkhpZ2gsICcnKTtcbiAgICB1cGRhdGVQcmlvcml0eShidG5Mb3dFZGl0LCBidG5NaWRFZGl0LCBidG5IaWdoRWRpdCwgJycpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBzaG93VGFza0xpc3RQbGFjZWhvbGRlcigpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0ZXh0LmlubmVySFRNTCA9ICdOb3RoaW5nIGhlcmUuLi4nO1xuICAgIHRleHQuc3R5bGUuY29sb3IgPSAnZ3JheSc7XG4gICAgdGFza0xpc3RQYXJlbnQuYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdExpc3RQbGFjZWhvbGRlcigpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0ZXh0LmlubmVySFRNTCA9ICdOb3RoaW5nIGhlcmUuLi4nO1xuICAgIHByb2plY3RMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRleHQpO1xuICB9XG5cbiAgcmV0dXJuIHsgdGFza0RpdkZhY3RvcnksIHByb2plY3REaXZGYWN0b3J5LCBidG5JbmJveCwgYnRuVG9kYXksIGJ0bldlZWssIGJ0bk5ld1Byb2plY3QsIGNvbnRhaW5lciwgXG4gICAgICAgICAgIGlucHV0Q29udGFpbmVyLCBwcm9qZWN0TmFtZUlucHV0LCBidG5Db25maXJtUHJvamVjdCwgYnRuQ2FuY2VsUHJvamVjdCwgYnRuTmV3VGFzaywgYnRuTG93LCBidG5NaWQsICBcbiAgICAgICAgICAgYnRuSGlnaCwgYnRuQWRkVGFzaywgYnRuQ2FuY2VsVGFzaywgcHJvamVjdExpc3RQYXJlbnQsIHRhc2tMaXN0UGFyZW50LCB0YXNrT3ZlcmxheSwgXG4gICAgICAgICAgIHRhc2tMaXN0QWRkLCBwcm9qZWN0TGlzdEFkZCwgZ2V0VGFza05hbWUsIHNldFRhc2tOYW1lLCBnZXRQcm9qZWN0TmFtZSwgZ2V0RGVzY3JpcHRpb24sICBcbiAgICAgICAgICAgc2V0RGVzY3JpcHRpb24sIGdldERhdGUsIHNldERhdGUsIHRpdGxlRWRpdCwgZGVzY3JpcHRpb25FZGl0LCBkYXRlRWRpdCwgYnRuTG93RWRpdCwgYnRuTWlkRWRpdCwgXG4gICAgICAgICAgIGJ0bkhpZ2hFZGl0LCBidG5Db25maXJtRWRpdCwgYnRuQ2FuY2VsRWRpdCwgc2V0TGlzdFRpdGxlLCB1cGRhdGVQcmlvcml0eSwgY2xlYXJGaWVsZHMsIFxuICAgICAgICAgICBzaG93VGFza0xpc3RQbGFjZWhvbGRlciwgc2hvd1Byb2plY3RMaXN0UGxhY2Vob2xkZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmltcG9ydCBET00gZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IHsgc2F2ZVByb2plY3RzLCBsb2FkUHJvamVjdHMsIGxvYWREZWZhdWx0UHJvamVjdCB9IGZyb20gJy4vYXBwU3RvcmFnZSc7XG5cbmNvbnN0IGRpc3BsYXkgPSBET00oKTtcblxuY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdCgnSU5CT1gnKTtcblxuY29uc3QgcHJvamVjdE1hbmFnZXIgPSB7XG4gIHByb2plY3RzOiBbXSxcbiAgYWN0aXZlUHJvamVjdDogZGVmYXVsdFByb2plY3Rcbn1cblxuY29uc3QgdGFza01hbmFnZXIgPSB7XG4gIGFjdGl2ZVRhc2s6IHVuZGVmaW5lZCxcbiAgY3VycmVudFByaW9yaXR5OiAwXG59XG5cbmZ1bmN0aW9uIHJldHJpZXZlVGFzayh0YXNrKSB7XG4gIHJldHVybiBuZXcgVGFzayh0YXNrLl9uYW1lLCB0YXNrLl9kZXNjcmlwdGlvbiwgbmV3IERhdGUodGFzay5fZHVlRGF0ZSksIHRhc2suX3ByaW9yaXR5LCB0YXNrLl9jb21wbGV0ZWQpO1xufVxuXG5mdW5jdGlvbiByZXRyaWV2ZVByb2plY3QocHJvamVjdCkge1xuICByZXR1cm4gbmV3IFByb2plY3QocHJvamVjdC5fbmFtZSk7XG59XG5cbmlmKFwicHJvamVjdHNcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgY29uc3Qgc3RvcmFnZVRhc2tzID0gbG9hZERlZmF1bHRQcm9qZWN0KCkuX215VGFza3M7XG4gIGZvcihjb25zdCB0YXNrIG9mIHN0b3JhZ2VUYXNrcykge1xuICAgIGRlZmF1bHRQcm9qZWN0Lm15VGFza3MucHVzaChyZXRyaWV2ZVRhc2sodGFzaykpO1xuICB9XG5cbiAgY29uc3Qgc3RvcmFnZVByb2plY3RzID0gbG9hZFByb2plY3RzKCk7XG4gIGZvcihjb25zdCBwcm9qZWN0IG9mIHN0b3JhZ2VQcm9qZWN0cykge1xuICAgIGNvbnN0IHByb2plY3RPYmplY3QgPSByZXRyaWV2ZVByb2plY3QocHJvamVjdCk7XG5cbiAgICBmb3IoY29uc3QgdGFzayBvZiBwcm9qZWN0Ll9teVRhc2tzKSB7XG4gICAgICBwcm9qZWN0T2JqZWN0Lm15VGFza3MucHVzaChyZXRyaWV2ZVRhc2sodGFzaykpO1xuICAgIH1cblxuICAgIHByb2plY3RNYW5hZ2VyLnByb2plY3RzLnB1c2gocHJvamVjdE9iamVjdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QWxsVGFza3MoKSB7XG4gIGNvbnN0IHRhc2tzID0gW107XG5cbiAgdGFza3MucHVzaChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcblxuICBmb3IoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0TWFuYWdlci5wcm9qZWN0cykge1xuICAgIHRhc2tzLnB1c2gocHJvamVjdC5teVRhc2tzKTtcbiAgfVxuXG4gIHJldHVybiB0YXNrcy5mbGF0KCk7XG59XG5cbmZ1bmN0aW9uIGlzVG9kYXkoZGF0ZSkge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICByZXR1cm4gZGF0ZS5nZXRVVENEYXRlKCkgPT09IGN1cnJlbnREYXRlO1xufVxuXG5mdW5jdGlvbiBpc1RoaXNXZWVrKGRhdGUpIHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB3ZWVrU3RhcnQgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50RGF0ZS5nZXREYXRlKCkgLSBjdXJyZW50RGF0ZS5nZXREYXkoKSk7XG4gIGNvbnN0IHdlZWtFbmQgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAoNiAtIGN1cnJlbnREYXRlLmdldERheSgpKSk7XG4gIFxuICByZXR1cm4gZGF0ZSA+PSB3ZWVrU3RhcnQgJiYgZGF0ZSA8PSB3ZWVrRW5kO1xufVxuXG5mdW5jdGlvbiBhZGRUYXNrSGFuZGxlcigpIHtcbiAgaWYoZGlzcGxheS5nZXRUYXNrTmFtZSgpICE9PSAnJykge1xuICAgIGNvbnN0IG5hbWUgPSBkaXNwbGF5LmdldFRhc2tOYW1lKCk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkaXNwbGF5LmdldERlc2NyaXB0aW9uKCk7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke2Rpc3BsYXkuZ2V0RGF0ZSgpfWApO1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSwgdGFza01hbmFnZXIuY3VycmVudFByaW9yaXR5LCBmYWxzZSk7XG4gICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzLnB1c2godGFzayk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrcyk7XG4gICAgZGlzcGxheS5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkaXNwbGF5LmNsZWFyRmllbGRzKCk7XG4gICAgc2F2ZVByb2plY3RzKHByb2plY3RNYW5hZ2VyLnByb2plY3RzLCBkZWZhdWx0UHJvamVjdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uZmlybUVkaXRIYW5kbGVyKCkge1xuICBkaXNwbGF5LnRhc2tPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvbnN0IHRhc2sgPSB0YXNrTWFuYWdlci5hY3RpdmVUYXNrO1xuICB0YXNrLm5hbWUgPSBkaXNwbGF5LnRpdGxlRWRpdC52YWx1ZTtcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRpc3BsYXkuZGVzY3JpcHRpb25FZGl0LnZhbHVlO1xuICB0YXNrLmRhdGUgPSBkaXNwbGF5LmRhdGVFZGl0LnZhbHVlO1xuICByZWZyZXNoVGFza0xpc3QocHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzKTtcbiAgc2F2ZVByb2plY3RzKHByb2plY3RNYW5hZ2VyLnByb2plY3RzLCBkZWZhdWx0UHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGVkaXRUYXNrSGFuZGxlcih0YXNrKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkaXNwbGF5LnRhc2tPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgdGFza01hbmFnZXIuYWN0aXZlVGFzayA9IHRhc2s7XG4gICAgZGlzcGxheS50aXRsZUVkaXQudmFsdWUgPSB0YXNrLm5hbWU7XG4gICAgZGlzcGxheS5kZXNjcmlwdGlvbkVkaXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGRpc3BsYXkudXBkYXRlUHJpb3JpdHkoZGlzcGxheS5idG5Mb3dFZGl0LCBkaXNwbGF5LmJ0bk1pZEVkaXQsIGRpc3BsYXkuYnRuSGlnaEVkaXQsIHRhc2sucHJpb3JpdHkpO1xuICAgIGlmKHRhc2suZHVlRGF0ZSAhPT0gJycpIHtcbiAgICAgIGRpc3BsYXkuZGF0ZUVkaXQudmFsdWUgPSB0YXNrLmR1ZURhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0SGFuZGxlcihwcm9qZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBwcm9qZWN0TWFuYWdlci5wcm9qZWN0cy5zcGxpY2UocHJvamVjdCwgMSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2plY3QtJHtwcm9qZWN0fWApLnJlbW92ZSgpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZShwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm5hbWUpO1xuICAgIHJlZnJlc2hUYXNrTGlzdChwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm15VGFza3MpO1xuICAgIHNhdmVQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cywgZGVmYXVsdFByb2plY3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVByb2plY3RIYW5kbGVyKHByb2plY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5wcm9qZWN0c1twcm9qZWN0XTtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZShwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm5hbWUpO1xuICAgIHJlZnJlc2hUYXNrTGlzdChwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm15VGFza3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1Qcm9qZWN0SGFuZGxlcigpIHtcbiAgaWYoZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpICE9PSAnJykge1xuICAgIGNvbnN0IG5hbWUgPSBkaXNwbGF5LmdldFByb2plY3ROYW1lKCk7XG4gICAgcHJvamVjdE1hbmFnZXIucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSk7XG4gICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLnByb2plY3RzW3Byb2plY3RNYW5hZ2VyLnByb2plY3RzLmxlbmd0aC0xXTtcbiAgICBzaG93UHJvamVjdHMocHJvamVjdE1hbmFnZXIucHJvamVjdHMpO1xuICAgIGRpc3BsYXkuc2V0TGlzdFRpdGxlKHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubmFtZSk7XG4gICAgZGlzcGxheS5pbnB1dENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgZGlzcGxheS5wcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gJyc7XG4gICAgc2F2ZVByb2plY3RzKHByb2plY3RNYW5hZ2VyLnByb2plY3RzLCBkZWZhdWx0UHJvamVjdCk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3Jvc3NPdXRUYXNrKHRhc2spIHtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0YXNrLSR7dGFzay5kYXRhc2V0LmluZGV4fS1uYW1lYCk7XG4gIGdldEFsbFRhc2tzKClbdGFzay5kYXRhc2V0LmluZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICBuYW1lLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCc7XG4gIG5hbWUuc3R5bGUuY29sb3IgPSAnZ3JheSc7XG59XG5cbmZ1bmN0aW9uIHVuZG9Dcm9zc291dCh0YXNrKSB7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGFzay0ke3Rhc2suZGF0YXNldC5pbmRleH0tbmFtZWApO1xuICBnZXRBbGxUYXNrcygpW3Rhc2suZGF0YXNldC5pbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gIG5hbWUuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG4gIG5hbWUuc3R5bGUuY29sb3IgPSAnJztcbn1cblxuZnVuY3Rpb24gc2hvd1Rhc2tzKGxpc3QpIHtcbiAgd2hpbGUoZGlzcGxheS50YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgZGlzcGxheS50YXNrTGlzdFBhcmVudC5yZW1vdmVDaGlsZChkaXNwbGF5LnRhc2tMaXN0UGFyZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gQXBwZW5kIHRhc2tzIHRvIGN1cnJlbnQgdGFzayBsaXN0XG4gIGZvcihjb25zdCB0YXNrIG9mIGxpc3QpIHtcbiAgICB0YXNrTWFuYWdlci5hY3RpdmVUYXNrID0gdGFzaztcbiAgICBpZihpc05hTih0YXNrLmR1ZURhdGUuZ2V0RGF0ZSgpKSkge1xuICAgICAgZGlzcGxheS50YXNrTGlzdEFkZChkaXNwbGF5LnRhc2tEaXZGYWN0b3J5KHRhc2submFtZSwgdGFzay5kZXNjcmlwdGlvbiwgJycsIHRhc2sucHJpb3JpdHksIHRhc2suY29tcGxldGVkLCBsaXN0LmluZGV4T2YodGFzayksIGVkaXRUYXNrSGFuZGxlcih0YXNrTWFuYWdlci5hY3RpdmVUYXNrKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5LnRhc2tMaXN0QWRkKGRpc3BsYXkudGFza0RpdkZhY3RvcnkodGFzay5uYW1lLCB0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmR1ZURhdGUsIHRhc2sucHJpb3JpdHksIHRhc2suY29tcGxldGVkLCBsaXN0LmluZGV4T2YodGFzayksIGVkaXRUYXNrSGFuZGxlcih0YXNrTWFuYWdlci5hY3RpdmVUYXNrKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBsaXN0ZW5lcnMgdG8gcmVtb3ZlIGFuZCBlZGl0IGJ1dHRvbnNcbiAgZm9yKGNvbnN0IHRhc2sgb2YgQXJyYXkuZnJvbShkaXNwbGF5LnRhc2tMaXN0UGFyZW50LmNoaWxkTm9kZXMpKSB7XG4gICAgY29uc3QgaW5kZXggPSB0YXNrLmRhdGFzZXQuaW5kZXg7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGFzay0ke2luZGV4fS1jaGVja2JveGApO1xuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGByZW1vdmUtdGFzay0ke2luZGV4fWApO1xuXG4gICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5yZW1vdmVUYXNrKHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrc1tpbmRleF0pO1xuICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgIHJlZnJlc2hUYXNrTGlzdChwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm15VGFza3MpO1xuICAgIH0pO1xuXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZighY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICB1bmRvQ3Jvc3NvdXQodGFzayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcm9zc091dFRhc2sodGFzayk7XG4gICAgICB9XG5cbiAgICAgIHNhdmVQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cywgZGVmYXVsdFByb2plY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICBkaXNwbGF5LnNob3dUYXNrTGlzdFBsYWNlaG9sZGVyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVmcmVzaFRhc2tMaXN0KG5ld0xpc3QpIHtcbiAgc2hvd1Rhc2tzKG5ld0xpc3QpO1xufVxuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMobGlzdCkge1xuICB3aGlsZShkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LnJlbW92ZUNoaWxkKGRpc3BsYXkucHJvamVjdExpc3RQYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBmb3IoY29uc3QgcHJvamVjdCBvZiBsaXN0KSB7XG4gICAgZGlzcGxheS5wcm9qZWN0TGlzdEFkZChkaXNwbGF5LnByb2plY3REaXZGYWN0b3J5KHByb2plY3QubmFtZSwgbGlzdC5pbmRleE9mKHByb2plY3QpKSk7XG4gIH1cblxuICBmb3IoY29uc3QgcHJvamVjdCBvZiBBcnJheS5mcm9tKGRpc3BsYXkucHJvamVjdExpc3RQYXJlbnQuY2hpbGROb2RlcykpIHtcbiAgICBjb25zdCByZW1vdmUgPSBwcm9qZWN0LmNoaWxkTm9kZXNbMV07XG4gICAgY29uc3QgaW5kZXggPSBwcm9qZWN0LmNoaWxkTm9kZXNbMF0uZGF0YXNldC5pbmRleDtcbiAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVQcm9qZWN0SGFuZGxlcihpbmRleCkpO1xuICAgIHByb2plY3QuY2hpbGROb2Rlc1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVByb2plY3RIYW5kbGVyKGluZGV4KSk7XG4gIH1cblxuICBpZihsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGRpc3BsYXkuc2hvd1Byb2plY3RMaXN0UGxhY2Vob2xkZXIoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBob29rTWVudUxpc3RlbmVycygpIHtcbiAgZGlzcGxheS5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkVGFza0hhbmRsZXIpO1xuXG4gIGRpc3BsYXkuYnRuQ2FuY2VsVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkaXNwbGF5LmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRpc3BsYXkuY2xlYXJGaWVsZHMoKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bkNvbmZpcm1Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybVByb2plY3RIYW5kbGVyKTtcbiAgXG4gIGRpc3BsYXkuYnRuSW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVmcmVzaFRhc2tMaXN0KGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnSU5CT1gnKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0blRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVG9kYXkodGFzay5kdWVEYXRlKSk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHRvZGF5VGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnVE9EQVknKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bldlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla1Rhc2tzID0gZ2V0QWxsVGFza3MoKS5maWx0ZXIodGFzayA9PiBpc1RoaXNXZWVrKHRhc2suZHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh3ZWVrVGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnVEhJUyBXRUVLJyk7XG4gIH0pO1xuXG4gIGRpc3BsYXkuYnRuTmV3VGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkaXNwbGF5LmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS5pbnB1dENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkNhbmNlbFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS5pbnB1dENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRpc3BsYXkucHJvamVjdE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkNvbmZpcm1FZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybUVkaXRIYW5kbGVyKTtcblxuICBkaXNwbGF5LmJ0bkNhbmNlbEVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS50YXNrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHkgPSAwO1xuICAgIGRpc3BsYXkudXBkYXRlUHJpb3JpdHkoZGlzcGxheS5idG5Mb3csIGRpc3BsYXkuYnRuTWlkLCBkaXNwbGF5LmJ0bkhpZ2gsIDApO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk1pZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHkgPSAxO1xuICAgIGRpc3BsYXkudXBkYXRlUHJpb3JpdHkoZGlzcGxheS5idG5Mb3csIGRpc3BsYXkuYnRuTWlkLCBkaXNwbGF5LmJ0bkhpZ2gsIDEpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkhpZ2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdGFza01hbmFnZXIuY3VycmVudFByaW9yaXR5ID0gMjtcbiAgICBkaXNwbGF5LnVwZGF0ZVByaW9yaXR5KGRpc3BsYXkuYnRuTG93LCBkaXNwbGF5LmJ0bk1pZCwgZGlzcGxheS5idG5IaWdoLCAyKTtcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5Mb3dFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHRhc2tNYW5hZ2VyLmN1cnJlbnRQcmlvcml0eSA9IDA7XG4gICAgZGlzcGxheS51cGRhdGVQcmlvcml0eShkaXNwbGF5LmJ0bkxvd0VkaXQsIGRpc3BsYXkuYnRuTWlkRWRpdCwgZGlzcGxheS5idG5IaWdoRWRpdCwgMCk7XG4gIH0pO1xuXG4gIGRpc3BsYXkuYnRuTWlkRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHkgPSAxO1xuICAgIGRpc3BsYXkudXBkYXRlUHJpb3JpdHkoZGlzcGxheS5idG5Mb3dFZGl0LCBkaXNwbGF5LmJ0bk1pZEVkaXQsIGRpc3BsYXkuYnRuSGlnaEVkaXQsIDEpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkhpZ2hFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHRhc2tNYW5hZ2VyLmN1cnJlbnRQcmlvcml0eSA9IDI7XG4gICAgZGlzcGxheS51cGRhdGVQcmlvcml0eShkaXNwbGF5LmJ0bkxvd0VkaXQsIGRpc3BsYXkuYnRuTWlkRWRpdCwgZGlzcGxheS5idG5IaWdoRWRpdCwgMik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkQXBwKCkge1xuICAgIHJlZnJlc2hUYXNrTGlzdChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgICBzaG93UHJvamVjdHMocHJvamVjdE1hbmFnZXIucHJvamVjdHMpO1xuICAgIGhvb2tNZW51TGlzdGVuZXJzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRBcHA7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubXlUYXNrcyA9IFtdO1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZSkge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBteVRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLl9teVRhc2tzO1xuICB9XG5cbiAgc2V0IG15VGFza3MobGlzdCkge1xuICAgIHRoaXMuX215VGFza3MgPSBsaXN0O1xuICB9XG5cbiAgYWRkVGFzayh0YXNrKSB7XG4gICAgdGhpcy5teVRhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNDb21wbGV0ZTtcbiAgfVxuXG4gIHNldCBpc0NvbXBsZXRlKHN0YXR1cykge1xuICAgIHRoaXMuX2lzQ29tcGxldGUgPSBzdGF0dXM7XG4gIH1cblxuICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICB0aGlzLm15VGFza3Muc3BsaWNlKHRoaXMubXlUYXNrcy5pbmRleE9mKHRhc2spLCAxKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIFxuICBzZXQgbmFtZShuZXdOYW1lKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5ld05hbWU7XG4gIH1cblxuICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldCBkdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9kdWVEYXRlO1xuICB9XG5cbiAgc2V0IGR1ZURhdGUoZGF0ZSkge1xuICAgIHRoaXMuX2R1ZURhdGUgPSBkYXRlO1xuICB9XG5cbiAgZ2V0IHByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgfVxuXG4gIHNldCBwcmlvcml0eShuZXdQcmlvcml0eSkge1xuICAgIHRoaXMuX3ByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gIH1cblxuICBnZXQgY29tcGxldGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZWQ7XG4gIH1cblxuICBzZXQgY29tcGxldGVkKGNvbXBsZXRlKSB7XG4gICAgdGhpcy5fY29tcGxldGVkID0gY29tcGxldGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkQXBwIGZyb20gJy4vZXZlbnRDb250cm9sbGVyJztcblxubG9hZEFwcCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==