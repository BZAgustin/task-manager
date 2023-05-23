/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

const taskDivFactory = (name, dueDate, taskId, editHandler) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = `task-${taskId}`;

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${taskId}-checkbox`;
    const label = document.createElement('label');
    label.innerHTML = name;

    leftSection.appendChild(checkbox);
    leftSection.appendChild(label);

    const date = document.createElement('span');
    if(dueDate === '') {
      date.innerHTML = `No due date`;
    } else {
      date.innerHTML = `Due Date: ${dueDate.getUTCDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
    }
    
    const edit = document.createElement('img');
    edit.addEventListener('click', editHandler);
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.addEventListener('click', () => { 
      document.getElementById(`task-${taskId}`).remove();
    });
    remove.dataset.index = taskId;
    remove.alt = 'X';
    remove.id = `remove-task-${taskId}`;

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
  project.dataset.index = projectId;
  const projectIcon = document.createElement('img');
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  const deleteIcon = document.createElement('img');
  deleteIcon.alt = 'X';
  deleteIcon.addEventListener('click', () => {
    document.getElementById(`project-${projectId}`).remove();
  })
  project.appendChild(projectIcon);
  project.appendChild(projectName);
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

  // Task List
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


  // 'Edit Task' Form
  const taskOverlay = document.querySelector('.overlay-container');
  const titleEdit = document.getElementById('title-input-edit');
  const descriptionEdit = document.getElementById('description-input-edit');
  const dateEdit = document.getElementById('date-input-edit');
  const btnConfirmEdit = document.getElementById('btn-confirm-edit');

  // Parent Nodes
  const projectListParent = document.getElementById('project-list');
  const taskListParent = document.querySelector('.task-list');

  // Methods (projects)
  function getProjectName() {
    return projectNameInput.value;
  }

  // Methods (tasks)
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

  return { btnInbox, btnToday, btnWeek, btnNewProject, container, inputContainer, projectNameInput, taskOverlay, btnConfirmProject, btnNewTask,
           btnLow, btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, getTaskName, setTaskName, getProjectName, getDescription, 
           setDescription, getDate, setDate, titleEdit, taskDivFactory, projectDivFactory, descriptionEdit, dateEdit, btnConfirmEdit };
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
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */





const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__["default"])();

const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('Default');

const projectManager = {
  projects: [],
  activeProject: defaultProject,
}

const taskManager = {
  activeTask: undefined,
  currentPriority: 0
}

function taskListAdd(task) {
  display.taskListParent.appendChild(task);
}

function projectListAdd(project) {
  display.projectListParent.appendChild(project);
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

function confirmEditHandler() {
  display.taskOverlay.style.display = 'none';
  const task = taskManager.activeTask;
  task.name = display.titleEdit.value;
  task.description = display.descriptionEdit.value;
  task.date = display.dateEdit.value;
  refreshTaskList(projectManager.activeProject.myTasks);
}

function editTaskHandler(task) {
  return function() {
    display.taskOverlay.style.display = 'flex';
    taskManager.activeTask = task;
    display.titleEdit.value = task.name;
    display.descriptionEdit.value = task.description;
    if(task.dueDate !== '') {
      display.dateEdit.value = task.dueDate.toISOString().split('T')[0];
    }
  }
}

function showTasks(list) {
  while(display.taskListParent.firstChild) {
    display.taskListParent.removeChild(display.taskListParent.firstChild);
  }

  for(const task of list) {
    taskManager.activeTask = task;
    if(isNaN(task.dueDate.getDate())) {
      taskListAdd(display.taskDivFactory(task.name, '', list.indexOf(task), editTaskHandler(taskManager.activeTask)));
    } else {
      taskListAdd(display.taskDivFactory(task.name, task.dueDate, list.indexOf(task), editTaskHandler(taskManager.activeTask)));
    }
  }

  for(const task of Array.from(display.taskListParent.childNodes)) {
    const remove = task.childNodes[1].childNodes[2];
    const index = remove.dataset.index;
    remove.addEventListener('click', () => {
      projectManager.activeProject.removeTask(projectManager.activeProject.myTasks[index]);
    })
  }
}

function showProjects(list) {
  while(display.projectListParent.firstChild) {
    display.projectListParent.removeChild(display.projectListParent.firstChild);
  }

  for(const project of list) {
    projectListAdd(display.projectDivFactory(project.name, list.indexOf(project)));
  }

  for(const project of Array.from(display.projectListParent.childNodes)) {
    const remove = project.childNodes[2];
    const index = remove.dataset.index;
    remove.addEventListener('click', () => {
      projectManager.projects.splice(index, 1);
    });
  }
}

function refreshTaskList(newList) {
  showTasks(newList);
}

function hookMenuListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = new Date(`${display.getDate()}`);
      const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, taskManager.currentPriority, false);
      defaultProject.myTasks.push(task);
      refreshTaskList(defaultProject.myTasks);
      display.container.style.display = 'none';
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](name));
      projectManager.activeProject = projectManager.projects[projectManager.projects.length-1];
      showProjects(projectManager.projects);
      display.inputContainer.style.display = '';
    }
  });
  
  display.btnInbox.addEventListener('click', () => {
    refreshTaskList(defaultProject.myTasks);
  });
  
  display.btnToday.addEventListener('click', () => {
    const todayTasks = getAllTasks().filter(task => isToday(task.dueDate));
    refreshTaskList(todayTasks);
  });
  
  display.btnWeek.addEventListener('click', () => {
    const weekTasks = getAllTasks().filter(task => isThisWeek(task.dueDate));
    refreshTaskList(weekTasks);
  });

  display.btnNewTask.addEventListener('click', () => {
    display.container.style.display = 'flex';
  });

  display.btnNewProject.addEventListener('click', () => {
    display.inputContainer.style.display = 'flex';
  });

  display.btnConfirmEdit.addEventListener('click', confirmEditHandler);

  display.btnLow.addEventListener('click', () => {
    taskManager.currentPriority = 0;
  });

  display.btnMid.addEventListener('click', () => {
    taskManager.currentPriority = 1;
  });

  display.btnHigh.addEventListener('click', () => {
    taskManager.currentPriority = 2;
  });
}

function loadApp() {
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
  constructor(name, description, dueDate, priority, completed, visible = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.visible = visible;
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

  get visible() {
    return this._visible;
  }

  set visible(mode) {
    this._visible = mode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG9DQUFvQyxxQkFBcUIsR0FBRyx1QkFBdUIsR0FBRyxzQkFBc0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPOztBQUVsQztBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0MsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTzs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pELEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEI7QUFDRjtBQUNNOztBQUVoQyxnQkFBZ0Isb0RBQUc7O0FBRW5CLDJCQUEyQixnREFBTzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQsdUJBQXVCLDZDQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGdEQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1THZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPOzs7Ozs7Ozs7Ozs7OztBQ3pDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7O1VDNURuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4Qyw0REFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmNvbnN0IHRhc2tEaXZGYWN0b3J5ID0gKG5hbWUsIGR1ZURhdGUsIHRhc2tJZCwgZWRpdEhhbmRsZXIpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWA7XG5cbiAgICBjb25zdCBsZWZ0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJpZ2h0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxlZnRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2xlZnQtc2VjdGlvbicpO1xuICAgIHJpZ2h0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdyaWdodC1zZWN0aW9uJyk7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgY2hlY2tib3guaWQgPSBgdGFzay0ke3Rhc2tJZH0tY2hlY2tib3hgO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBuYW1lO1xuXG4gICAgbGVmdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaWYoZHVlRGF0ZSA9PT0gJycpIHtcbiAgICAgIGRhdGUuaW5uZXJIVE1MID0gYE5vIGR1ZSBkYXRlYDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZS5pbm5lckhUTUwgPSBgRHVlIERhdGU6ICR7ZHVlRGF0ZS5nZXRVVENEYXRlKCl9LyR7ZHVlRGF0ZS5nZXRNb250aCgpICsgMX0vJHtkdWVEYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0SGFuZGxlcik7XG4gICAgZWRpdC5hbHQgPSAnRWRpdCc7XG4gICAgZWRpdC5pZCA9IGBlZGl0LXRhc2stJHt0YXNrSWR9YDtcblxuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGFzay0ke3Rhc2tJZH1gKS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICByZW1vdmUuZGF0YXNldC5pbmRleCA9IHRhc2tJZDtcbiAgICByZW1vdmUuYWx0ID0gJ1gnO1xuICAgIHJlbW92ZS5pZCA9IGByZW1vdmUtdGFzay0ke3Rhc2tJZH1gO1xuXG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChlZGl0KTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQocmVtb3ZlKTtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcblxuICAgIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdERpdkZhY3RvcnkgPSAobmFtZSwgcHJvamVjdElkKSA9PiB7XG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBwcm9qZWN0LmlkID0gYHByb2plY3QtJHtwcm9qZWN0SWR9YDtcbiAgcHJvamVjdC5kYXRhc2V0LmluZGV4ID0gcHJvamVjdElkO1xuICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBwcm9qZWN0SWNvbi5hbHQgPSAnTyc7XG4gIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBwcm9qZWN0TmFtZS5pbm5lckhUTUwgPSBuYW1lO1xuICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGRlbGV0ZUljb24uYWx0ID0gJ1gnO1xuICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9qZWN0LSR7cHJvamVjdElkfWApLnJlbW92ZSgpO1xuICB9KVxuICBwcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IERPTSA9ICgpID0+IHtcbiAgLy8gU2lkZWJhclxuICBjb25zdCBidG5JbmJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taW5ib3gnKTtcbiAgY29uc3QgYnRuVG9kYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXRvZGF5Jyk7XG4gIGNvbnN0IGJ0bldlZWsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXdlZWsnKTtcbiAgXG4gIC8vIEFkZCBuZXcgcHJvamVjdFxuICBjb25zdCBidG5OZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXctcHJvamVjdCcpO1xuICBjb25zdCBpbnB1dENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1jb250YWluZXInKTtcbiAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUtaW5wdXQnKTtcbiAgY29uc3QgYnRuQ29uZmlybVByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tcHJvamVjdC1uYW1lJyk7XG5cbiAgLy8gVGFzayBMaXN0XG4gIGNvbnN0IGJ0bk5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy10YXNrJyk7XG5cbiAgLy8gJ0NyZWF0ZSBUYXNrJyBGb3JtXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtdGFzaycpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1pbnB1dCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dCcpO1xuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtaW5wdXQnKTtcbiAgY29uc3QgYnRuTG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1sb3cnKTtcbiAgY29uc3QgYnRuTWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1taWQnKTtcbiAgY29uc3QgYnRuSGlnaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taGlnaCcpO1xuICBjb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1hZGQtdGFzaycpO1xuXG5cbiAgLy8gJ0VkaXQgVGFzaycgRm9ybVxuICBjb25zdCB0YXNrT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWNvbnRhaW5lcicpO1xuICBjb25zdCB0aXRsZUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQtZWRpdCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24taW5wdXQtZWRpdCcpO1xuICBjb25zdCBkYXRlRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLWlucHV0LWVkaXQnKTtcbiAgY29uc3QgYnRuQ29uZmlybUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tZWRpdCcpO1xuXG4gIC8vIFBhcmVudCBOb2Rlc1xuICBjb25zdCBwcm9qZWN0TGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgY29uc3QgdGFza0xpc3RQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1saXN0Jyk7XG5cbiAgLy8gTWV0aG9kcyAocHJvamVjdHMpXG4gIGZ1bmN0aW9uIGdldFByb2plY3ROYW1lKCkge1xuICAgIHJldHVybiBwcm9qZWN0TmFtZUlucHV0LnZhbHVlO1xuICB9XG5cbiAgLy8gTWV0aG9kcyAodGFza3MpXG4gIGZ1bmN0aW9uIGdldFRhc2tOYW1lKCkge1xuICAgIHJldHVybiB0aXRsZS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRhc2tOYW1lKG5ld05hbWUpIHtcbiAgICB0aXRsZS52YWx1ZSA9IG5ld05hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb24udmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIHJldHVybiBkYXRlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgZGF0ZS52YWx1ZSA9IG5ld0RhdGU7XG4gIH1cblxuICByZXR1cm4geyBidG5JbmJveCwgYnRuVG9kYXksIGJ0bldlZWssIGJ0bk5ld1Byb2plY3QsIGNvbnRhaW5lciwgaW5wdXRDb250YWluZXIsIHByb2plY3ROYW1lSW5wdXQsIHRhc2tPdmVybGF5LCBidG5Db25maXJtUHJvamVjdCwgYnRuTmV3VGFzayxcbiAgICAgICAgICAgYnRuTG93LCBidG5NaWQsIGJ0bkhpZ2gsIGJ0bkFkZFRhc2ssIHByb2plY3RMaXN0UGFyZW50LCB0YXNrTGlzdFBhcmVudCwgZ2V0VGFza05hbWUsIHNldFRhc2tOYW1lLCBnZXRQcm9qZWN0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIFxuICAgICAgICAgICBzZXREZXNjcmlwdGlvbiwgZ2V0RGF0ZSwgc2V0RGF0ZSwgdGl0bGVFZGl0LCB0YXNrRGl2RmFjdG9yeSwgcHJvamVjdERpdkZhY3RvcnksIGRlc2NyaXB0aW9uRWRpdCwgZGF0ZUVkaXQsIGJ0bkNvbmZpcm1FZGl0IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQgRE9NIGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0JztcblxuY29uc3QgZGlzcGxheSA9IERPTSgpO1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0Jyk7XG5cbmNvbnN0IHByb2plY3RNYW5hZ2VyID0ge1xuICBwcm9qZWN0czogW10sXG4gIGFjdGl2ZVByb2plY3Q6IGRlZmF1bHRQcm9qZWN0LFxufVxuXG5jb25zdCB0YXNrTWFuYWdlciA9IHtcbiAgYWN0aXZlVGFzazogdW5kZWZpbmVkLFxuICBjdXJyZW50UHJpb3JpdHk6IDBcbn1cblxuZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICBkaXNwbGF5LnRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0TGlzdEFkZChwcm9qZWN0KSB7XG4gIGRpc3BsYXkucHJvamVjdExpc3RQYXJlbnQuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbFRhc2tzKCkge1xuICBjb25zdCB0YXNrcyA9IFtdO1xuXG4gIHRhc2tzLnB1c2goZGVmYXVsdFByb2plY3QubXlUYXNrcyk7XG5cbiAgZm9yKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdE1hbmFnZXIucHJvamVjdHMpIHtcbiAgICB0YXNrcy5wdXNoKHByb2plY3QubXlUYXNrcyk7XG4gIH1cblxuICByZXR1cm4gdGFza3MuZmxhdCgpO1xufVxuXG5mdW5jdGlvbiBpc1RvZGF5KGRhdGUpIHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpID09PSBjdXJyZW50RGF0ZTtcbn1cblxuZnVuY3Rpb24gaXNUaGlzV2VlayhkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0ID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgY3VycmVudERhdGUuZ2V0RGF0ZSgpIC0gY3VycmVudERhdGUuZ2V0RGF5KCkpO1xuICBjb25zdCB3ZWVrRW5kID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgKDYgLSBjdXJyZW50RGF0ZS5nZXREYXkoKSkpO1xuICBcbiAgcmV0dXJuIGRhdGUgPj0gd2Vla1N0YXJ0ICYmIGRhdGUgPD0gd2Vla0VuZDtcbn1cblxuZnVuY3Rpb24gY29uZmlybUVkaXRIYW5kbGVyKCkge1xuICBkaXNwbGF5LnRhc2tPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvbnN0IHRhc2sgPSB0YXNrTWFuYWdlci5hY3RpdmVUYXNrO1xuICB0YXNrLm5hbWUgPSBkaXNwbGF5LnRpdGxlRWRpdC52YWx1ZTtcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRpc3BsYXkuZGVzY3JpcHRpb25FZGl0LnZhbHVlO1xuICB0YXNrLmRhdGUgPSBkaXNwbGF5LmRhdGVFZGl0LnZhbHVlO1xuICByZWZyZXNoVGFza0xpc3QocHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzKTtcbn1cblxuZnVuY3Rpb24gZWRpdFRhc2tIYW5kbGVyKHRhc2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRpc3BsYXkudGFza092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB0YXNrTWFuYWdlci5hY3RpdmVUYXNrID0gdGFzaztcbiAgICBkaXNwbGF5LnRpdGxlRWRpdC52YWx1ZSA9IHRhc2submFtZTtcbiAgICBkaXNwbGF5LmRlc2NyaXB0aW9uRWRpdC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgaWYodGFzay5kdWVEYXRlICE9PSAnJykge1xuICAgICAgZGlzcGxheS5kYXRlRWRpdC52YWx1ZSA9IHRhc2suZHVlRGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dUYXNrcyhsaXN0KSB7XG4gIHdoaWxlKGRpc3BsYXkudGFza0xpc3RQYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgIGRpc3BsYXkudGFza0xpc3RQYXJlbnQucmVtb3ZlQ2hpbGQoZGlzcGxheS50YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgfVxuXG4gIGZvcihjb25zdCB0YXNrIG9mIGxpc3QpIHtcbiAgICB0YXNrTWFuYWdlci5hY3RpdmVUYXNrID0gdGFzaztcbiAgICBpZihpc05hTih0YXNrLmR1ZURhdGUuZ2V0RGF0ZSgpKSkge1xuICAgICAgdGFza0xpc3RBZGQoZGlzcGxheS50YXNrRGl2RmFjdG9yeSh0YXNrLm5hbWUsICcnLCBsaXN0LmluZGV4T2YodGFzayksIGVkaXRUYXNrSGFuZGxlcih0YXNrTWFuYWdlci5hY3RpdmVUYXNrKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrTGlzdEFkZChkaXNwbGF5LnRhc2tEaXZGYWN0b3J5KHRhc2submFtZSwgdGFzay5kdWVEYXRlLCBsaXN0LmluZGV4T2YodGFzayksIGVkaXRUYXNrSGFuZGxlcih0YXNrTWFuYWdlci5hY3RpdmVUYXNrKSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcihjb25zdCB0YXNrIG9mIEFycmF5LmZyb20oZGlzcGxheS50YXNrTGlzdFBhcmVudC5jaGlsZE5vZGVzKSkge1xuICAgIGNvbnN0IHJlbW92ZSA9IHRhc2suY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzJdO1xuICAgIGNvbnN0IGluZGV4ID0gcmVtb3ZlLmRhdGFzZXQuaW5kZXg7XG4gICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5yZW1vdmVUYXNrKHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrc1tpbmRleF0pO1xuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKGxpc3QpIHtcbiAgd2hpbGUoZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5yZW1vdmVDaGlsZChkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yKGNvbnN0IHByb2plY3Qgb2YgbGlzdCkge1xuICAgIHByb2plY3RMaXN0QWRkKGRpc3BsYXkucHJvamVjdERpdkZhY3RvcnkocHJvamVjdC5uYW1lLCBsaXN0LmluZGV4T2YocHJvamVjdCkpKTtcbiAgfVxuXG4gIGZvcihjb25zdCBwcm9qZWN0IG9mIEFycmF5LmZyb20oZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5jaGlsZE5vZGVzKSkge1xuICAgIGNvbnN0IHJlbW92ZSA9IHByb2plY3QuY2hpbGROb2Rlc1syXTtcbiAgICBjb25zdCBpbmRleCA9IHJlbW92ZS5kYXRhc2V0LmluZGV4O1xuICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHByb2plY3RNYW5hZ2VyLnByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVmcmVzaFRhc2tMaXN0KG5ld0xpc3QpIHtcbiAgc2hvd1Rhc2tzKG5ld0xpc3QpO1xufVxuXG5mdW5jdGlvbiBob29rTWVudUxpc3RlbmVycygpIHtcbiAgZGlzcGxheS5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoZGlzcGxheS5nZXRUYXNrTmFtZSgpICE9PSAnJykge1xuICAgICAgY29uc3QgbmFtZSA9IGRpc3BsYXkuZ2V0VGFza05hbWUoKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGlzcGxheS5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke2Rpc3BsYXkuZ2V0RGF0ZSgpfWApO1xuICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlLCB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHksIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRQcm9qZWN0Lm15VGFza3MucHVzaCh0YXNrKTtcbiAgICAgIHJlZnJlc2hUYXNrTGlzdChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgICAgIGRpc3BsYXkuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuQ29uZmlybVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYoZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpICE9PSAnJykge1xuICAgICAgY29uc3QgbmFtZSA9IGRpc3BsYXkuZ2V0UHJvamVjdE5hbWUoKTtcbiAgICAgIHByb2plY3RNYW5hZ2VyLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QobmFtZSkpO1xuICAgICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLnByb2plY3RzW3Byb2plY3RNYW5hZ2VyLnByb2plY3RzLmxlbmd0aC0xXTtcbiAgICAgIHNob3dQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cyk7XG4gICAgICBkaXNwbGF5LmlucHV0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG4gIH0pO1xuICBcbiAgZGlzcGxheS5idG5JbmJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZWZyZXNoVGFza0xpc3QoZGVmYXVsdFByb2plY3QubXlUYXNrcyk7XG4gIH0pO1xuICBcbiAgZGlzcGxheS5idG5Ub2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB0b2RheVRhc2tzID0gZ2V0QWxsVGFza3MoKS5maWx0ZXIodGFzayA9PiBpc1RvZGF5KHRhc2suZHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh0b2RheVRhc2tzKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bldlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla1Rhc2tzID0gZ2V0QWxsVGFza3MoKS5maWx0ZXIodGFzayA9PiBpc1RoaXNXZWVrKHRhc2suZHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh3ZWVrVGFza3MpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5OZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRpc3BsYXkuaW5wdXRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5Db25maXJtRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm1FZGl0SGFuZGxlcik7XG5cbiAgZGlzcGxheS5idG5Mb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdGFza01hbmFnZXIuY3VycmVudFByaW9yaXR5ID0gMDtcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5NaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdGFza01hbmFnZXIuY3VycmVudFByaW9yaXR5ID0gMTtcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5IaWdoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHRhc2tNYW5hZ2VyLmN1cnJlbnRQcmlvcml0eSA9IDI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkQXBwKCkge1xuICAgIGhvb2tNZW51TGlzdGVuZXJzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRBcHA7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubXlUYXNrcyA9IFtdO1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZSkge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBteVRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLl9teVRhc2tzO1xuICB9XG5cbiAgc2V0IG15VGFza3MobGlzdCkge1xuICAgIHRoaXMuX215VGFza3MgPSBsaXN0O1xuICB9XG5cbiAgYWRkVGFzayh0YXNrKSB7XG4gICAgdGhpcy5teVRhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNDb21wbGV0ZTtcbiAgfVxuXG4gIHNldCBpc0NvbXBsZXRlKHN0YXR1cykge1xuICAgIHRoaXMuX2lzQ29tcGxldGUgPSBzdGF0dXM7XG4gIH1cblxuICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICB0aGlzLm15VGFza3Muc3BsaWNlKHRoaXMubXlUYXNrcy5pbmRleE9mKHRhc2spLCAxKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkLCB2aXNpYmxlID0gZmFsc2UpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgXG4gIHNldCBuYW1lKG5ld05hbWUpIHtcbiAgICB0aGlzLl9uYW1lID0gbmV3TmFtZTtcbiAgfVxuXG4gIGdldCBkZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG4gIH1cblxuICBzZXQgZGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0IGR1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R1ZURhdGU7XG4gIH1cblxuICBzZXQgZHVlRGF0ZShkYXRlKSB7XG4gICAgdGhpcy5fZHVlRGF0ZSA9IGRhdGU7XG4gIH1cblxuICBnZXQgcHJpb3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5O1xuICB9XG5cbiAgc2V0IHByaW9yaXR5KG5ld1ByaW9yaXR5KSB7XG4gICAgdGhpcy5fcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgfVxuXG4gIGdldCBjb21wbGV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlZDtcbiAgfVxuXG4gIHNldCBjb21wbGV0ZWQoY29tcGxldGUpIHtcbiAgICB0aGlzLl9jb21wbGV0ZWQgPSBjb21wbGV0ZTtcbiAgfVxuXG4gIGdldCB2aXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICB9XG5cbiAgc2V0IHZpc2libGUobW9kZSkge1xuICAgIHRoaXMuX3Zpc2libGUgPSBtb2RlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZEFwcCBmcm9tICcuL2V2ZW50Q29udHJvbGxlcic7XG5cbmxvYWRBcHAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=