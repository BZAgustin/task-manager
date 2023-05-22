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

const taskDivFactory = (name, dueDate, taskId, editHandler, removeHandler) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = `task-${taskId}` ;

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
    date.innerHTML = `Due Date: ${dueDate.getUTCDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;

    const edit = document.createElement('img');
    edit.addEventListener('click', editHandler);
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.addEventListener('click', removeHandler);
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
  const projectIcon = document.createElement('img');
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  project.appendChild(projectIcon);
  project.appendChild(projectName);

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
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */





const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__["default"])();

const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('Default');

const projectManager = {
  projects: [],
  activeProject: defaultProject
}

const taskManager = {
  activeTask: undefined,
  currentPriority: 'low'
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
  return date.getDate() === currentDate;
}

function isThisWeek(date) {
  const currentDate = new Date();
  const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  const weekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
  
  return date >= weekStart && date <= weekEnd;
}

function removeTaskHandler(list, index) {
  return function() {
    projectManager.activeProject.removeTask(projectManager.activeProject.myTasks[index]);
    list[index].remove();
  };
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
    display.dateEdit.value = task.dueDate.toISOString().split('T')[0];
  }
}

function showTasks(list) {
  while(display.taskListParent.firstChild) {
    display.taskListParent.removeChild(display.taskListParent.firstChild);
  }

  for(const task of list) {
    taskManager.activeTask = task;
    taskListAdd(display.taskDivFactory(task.name, task.dueDate, list.indexOf(task), editTaskHandler(taskManager.activeTask), removeTaskHandler(taskManager.activeTask)));
  }
}

function showProjects(list) {
  while(display.projectListParent.firstChild) {
    display.projectListParent.removeChild(display.projectListParent.firstChild);
  }

  for(const project of list) {
    projectListAdd(display.projectDivFactory(project.name, list.indexOf(project)));
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
    const weekTasks = getAllTasks().filter(task => isThisWeek(task.taskDueDate));
    refreshTaskList(weekTasks);
  });

  display.btnNewTask.addEventListener('click', () => {
    display.container.style.display = 'flex';
  });

  display.btnNewProject.addEventListener('click', () => {
    display.inputContainer.style.display = 'flex';
  });

  display.btnConfirmEdit.addEventListener('click', confirmEditHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7O1VDNURuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4Qyw0REFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmNvbnN0IHRhc2tEaXZGYWN0b3J5ID0gKG5hbWUsIGR1ZURhdGUsIHRhc2tJZCwgZWRpdEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWAgO1xuXG4gICAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdsZWZ0LXNlY3Rpb24nKTtcbiAgICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncmlnaHQtc2VjdGlvbicpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIGNoZWNrYm94LmlkID0gYHRhc2stJHt0YXNrSWR9LWNoZWNrYm94YDtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWwuaW5uZXJIVE1MID0gbmFtZTtcblxuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRhdGUuaW5uZXJIVE1MID0gYER1ZSBEYXRlOiAke2R1ZURhdGUuZ2V0VVRDRGF0ZSgpfS8ke2R1ZURhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZHVlRGF0ZS5nZXRGdWxsWWVhcigpfWA7XG5cbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRIYW5kbGVyKTtcbiAgICBlZGl0LmFsdCA9ICdFZGl0JztcbiAgICBlZGl0LmlkID0gYGVkaXQtdGFzay0ke3Rhc2tJZH1gO1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlSGFuZGxlcik7XG4gICAgcmVtb3ZlLmFsdCA9ICdYJztcbiAgICByZW1vdmUuaWQgPSBgcmVtb3ZlLXRhc2stJHt0YXNrSWR9YDtcblxuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoZWRpdCk7XG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHJlbW92ZSk7XG5cbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTZWN0aW9uKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2VjdGlvbik7XG5cbiAgICByZXR1cm4gdGFzaztcbn07XG5cbmNvbnN0IHByb2plY3REaXZGYWN0b3J5ID0gKG5hbWUsIHByb2plY3RJZCkgPT4ge1xuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgcHJvamVjdC5pZCA9IGBwcm9qZWN0LSR7cHJvamVjdElkfWA7XG4gIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIHByb2plY3RJY29uLmFsdCA9ICdPJztcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHByb2plY3ROYW1lLmlubmVySFRNTCA9IG5hbWU7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuICByZXR1cm4gcHJvamVjdDtcbn1cblxuY29uc3QgRE9NID0gKCkgPT4ge1xuICAvLyBTaWRlYmFyXG4gIGNvbnN0IGJ0bkluYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1pbmJveCcpO1xuICBjb25zdCBidG5Ub2RheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tdG9kYXknKTtcbiAgY29uc3QgYnRuV2VlayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4td2VlaycpO1xuICBcbiAgLy8gQWRkIG5ldyBwcm9qZWN0XG4gIGNvbnN0IGJ0bk5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy1wcm9qZWN0Jyk7XG4gIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNvbnRhaW5lcicpO1xuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZS1pbnB1dCcpO1xuICBjb25zdCBidG5Db25maXJtUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1wcm9qZWN0LW5hbWUnKTtcblxuICAvLyBUYXNrIExpc3RcbiAgY29uc3QgYnRuTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXRhc2snKTtcblxuICAvLyAnQ3JlYXRlIFRhc2snIEZvcm1cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS10YXNrJyk7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWlucHV0Jyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uLWlucHV0Jyk7XG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZS1pbnB1dCcpO1xuICBjb25zdCBidG5Mb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWxvdycpO1xuICBjb25zdCBidG5NaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1pZCcpO1xuICBjb25zdCBidG5IaWdoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1oaWdoJyk7XG4gIGNvbnN0IGJ0bkFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWFkZC10YXNrJyk7XG5cblxuICAvLyAnRWRpdCBUYXNrJyBGb3JtXG4gIGNvbnN0IHRhc2tPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXktY29udGFpbmVyJyk7XG4gIGNvbnN0IHRpdGxlRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1pbnB1dC1lZGl0Jyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dC1lZGl0Jyk7XG4gIGNvbnN0IGRhdGVFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtaW5wdXQtZWRpdCcpO1xuICBjb25zdCBidG5Db25maXJtRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1lZGl0Jyk7XG5cbiAgLy8gUGFyZW50IE5vZGVzXG4gIGNvbnN0IHByb2plY3RMaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCB0YXNrTGlzdFBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcblxuICAvLyBNZXRob2RzIChwcm9qZWN0cylcbiAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgcmV0dXJuIHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG4gIH1cblxuICAvLyBNZXRob2RzICh0YXNrcylcbiAgZnVuY3Rpb24gZ2V0VGFza05hbWUoKSB7XG4gICAgcmV0dXJuIHRpdGxlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VGFza05hbWUobmV3TmFtZSkge1xuICAgIHRpdGxlLnZhbHVlID0gbmV3TmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSBuZXdEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGUoKSB7XG4gICAgcmV0dXJuIGRhdGUudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXREYXRlKG5ld0RhdGUpIHtcbiAgICBkYXRlLnZhbHVlID0gbmV3RGF0ZTtcbiAgfVxuXG4gIHJldHVybiB7IGJ0bkluYm94LCBidG5Ub2RheSwgYnRuV2VlaywgYnRuTmV3UHJvamVjdCwgY29udGFpbmVyLCBpbnB1dENvbnRhaW5lciwgcHJvamVjdE5hbWVJbnB1dCwgdGFza092ZXJsYXksIGJ0bkNvbmZpcm1Qcm9qZWN0LCBidG5OZXdUYXNrLFxuICAgICAgICAgICBidG5Mb3csIGJ0bk1pZCwgYnRuSGlnaCwgYnRuQWRkVGFzaywgcHJvamVjdExpc3RQYXJlbnQsIHRhc2tMaXN0UGFyZW50LCBnZXRUYXNrTmFtZSwgc2V0VGFza05hbWUsIGdldFByb2plY3ROYW1lLCBnZXREZXNjcmlwdGlvbiwgXG4gICAgICAgICAgIHNldERlc2NyaXB0aW9uLCBnZXREYXRlLCBzZXREYXRlLCB0aXRsZUVkaXQsIHRhc2tEaXZGYWN0b3J5LCBwcm9qZWN0RGl2RmFjdG9yeSwgZGVzY3JpcHRpb25FZGl0LCBkYXRlRWRpdCwgYnRuQ29uZmlybUVkaXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQgRE9NIGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0JztcblxuY29uc3QgZGlzcGxheSA9IERPTSgpO1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0Jyk7XG5cbmNvbnN0IHByb2plY3RNYW5hZ2VyID0ge1xuICBwcm9qZWN0czogW10sXG4gIGFjdGl2ZVByb2plY3Q6IGRlZmF1bHRQcm9qZWN0XG59XG5cbmNvbnN0IHRhc2tNYW5hZ2VyID0ge1xuICBhY3RpdmVUYXNrOiB1bmRlZmluZWQsXG4gIGN1cnJlbnRQcmlvcml0eTogJ2xvdydcbn1cblxuZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICBkaXNwbGF5LnRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0TGlzdEFkZChwcm9qZWN0KSB7XG4gIGRpc3BsYXkucHJvamVjdExpc3RQYXJlbnQuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbFRhc2tzKCkge1xuICBjb25zdCB0YXNrcyA9IFtdO1xuXG4gIHRhc2tzLnB1c2goZGVmYXVsdFByb2plY3QubXlUYXNrcyk7XG5cbiAgZm9yKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdE1hbmFnZXIucHJvamVjdHMpIHtcbiAgICB0YXNrcy5wdXNoKHByb2plY3QubXlUYXNrcyk7XG4gIH1cblxuICByZXR1cm4gdGFza3MuZmxhdCgpO1xufVxuXG5mdW5jdGlvbiBpc1RvZGF5KGRhdGUpIHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpID09PSBjdXJyZW50RGF0ZTtcbn1cblxuZnVuY3Rpb24gaXNUaGlzV2VlayhkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0ID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgY3VycmVudERhdGUuZ2V0RGF0ZSgpIC0gY3VycmVudERhdGUuZ2V0RGF5KCkpO1xuICBjb25zdCB3ZWVrRW5kID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgKDYgLSBjdXJyZW50RGF0ZS5nZXREYXkoKSkpO1xuICBcbiAgcmV0dXJuIGRhdGUgPj0gd2Vla1N0YXJ0ICYmIGRhdGUgPD0gd2Vla0VuZDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGFza0hhbmRsZXIobGlzdCwgaW5kZXgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QucmVtb3ZlVGFzayhwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm15VGFza3NbaW5kZXhdKTtcbiAgICBsaXN0W2luZGV4XS5yZW1vdmUoKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29uZmlybUVkaXRIYW5kbGVyKCkge1xuICBkaXNwbGF5LnRhc2tPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvbnN0IHRhc2sgPSB0YXNrTWFuYWdlci5hY3RpdmVUYXNrO1xuICB0YXNrLm5hbWUgPSBkaXNwbGF5LnRpdGxlRWRpdC52YWx1ZTtcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRpc3BsYXkuZGVzY3JpcHRpb25FZGl0LnZhbHVlO1xuICB0YXNrLmRhdGUgPSBkaXNwbGF5LmRhdGVFZGl0LnZhbHVlO1xuICByZWZyZXNoVGFza0xpc3QocHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzKTtcbn1cblxuZnVuY3Rpb24gZWRpdFRhc2tIYW5kbGVyKHRhc2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRpc3BsYXkudGFza092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB0YXNrTWFuYWdlci5hY3RpdmVUYXNrID0gdGFzaztcbiAgICBkaXNwbGF5LnRpdGxlRWRpdC52YWx1ZSA9IHRhc2submFtZTsgXG4gICAgZGlzcGxheS5kZXNjcmlwdGlvbkVkaXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGRpc3BsYXkuZGF0ZUVkaXQudmFsdWUgPSB0YXNrLmR1ZURhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dUYXNrcyhsaXN0KSB7XG4gIHdoaWxlKGRpc3BsYXkudGFza0xpc3RQYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgIGRpc3BsYXkudGFza0xpc3RQYXJlbnQucmVtb3ZlQ2hpbGQoZGlzcGxheS50YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgfVxuXG4gIGZvcihjb25zdCB0YXNrIG9mIGxpc3QpIHtcbiAgICB0YXNrTWFuYWdlci5hY3RpdmVUYXNrID0gdGFzaztcbiAgICB0YXNrTGlzdEFkZChkaXNwbGF5LnRhc2tEaXZGYWN0b3J5KHRhc2submFtZSwgdGFzay5kdWVEYXRlLCBsaXN0LmluZGV4T2YodGFzayksIGVkaXRUYXNrSGFuZGxlcih0YXNrTWFuYWdlci5hY3RpdmVUYXNrKSwgcmVtb3ZlVGFza0hhbmRsZXIodGFza01hbmFnZXIuYWN0aXZlVGFzaykpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMobGlzdCkge1xuICB3aGlsZShkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LnJlbW92ZUNoaWxkKGRpc3BsYXkucHJvamVjdExpc3RQYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBmb3IoY29uc3QgcHJvamVjdCBvZiBsaXN0KSB7XG4gICAgcHJvamVjdExpc3RBZGQoZGlzcGxheS5wcm9qZWN0RGl2RmFjdG9yeShwcm9qZWN0Lm5hbWUsIGxpc3QuaW5kZXhPZihwcm9qZWN0KSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hUYXNrTGlzdChuZXdMaXN0KSB7XG4gIHNob3dUYXNrcyhuZXdMaXN0KTtcbn1cblxuXG5mdW5jdGlvbiBob29rTWVudUxpc3RlbmVycygpIHtcbiAgZGlzcGxheS5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoZGlzcGxheS5nZXRUYXNrTmFtZSgpICE9PSAnJykge1xuICAgICAgY29uc3QgbmFtZSA9IGRpc3BsYXkuZ2V0VGFza05hbWUoKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGlzcGxheS5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke2Rpc3BsYXkuZ2V0RGF0ZSgpfWApO1xuICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlLCB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHksIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRQcm9qZWN0Lm15VGFza3MucHVzaCh0YXNrKTtcbiAgICAgIHJlZnJlc2hUYXNrTGlzdChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgICAgIGRpc3BsYXkuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuQ29uZmlybVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYoZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpICE9PSAnJykge1xuICAgICAgY29uc3QgbmFtZSA9IGRpc3BsYXkuZ2V0UHJvamVjdE5hbWUoKTtcbiAgICAgIHByb2plY3RNYW5hZ2VyLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QobmFtZSkpO1xuICAgICAgc2hvd1Byb2plY3RzKHByb2plY3RNYW5hZ2VyLnByb2plY3RzKTtcbiAgICAgIGRpc3BsYXkuaW5wdXRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bkluYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHJlZnJlc2hUYXNrTGlzdChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0blRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVG9kYXkodGFzay5kdWVEYXRlKSk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHRvZGF5VGFza3MpO1xuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuV2Vlay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB3ZWVrVGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVGhpc1dlZWsodGFzay50YXNrRHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh3ZWVrVGFza3MpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5OZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRpc3BsYXkuaW5wdXRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgfSk7XG5cbiAgZGlzcGxheS5idG5Db25maXJtRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm1FZGl0SGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIGxvYWRBcHAoKSB7XG4gICAgaG9va01lbnVMaXN0ZW5lcnMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZEFwcDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5teVRhc2tzID0gW107XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG15VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215VGFza3M7XG4gIH1cblxuICBzZXQgbXlUYXNrcyhsaXN0KSB7XG4gICAgdGhpcy5fbXlUYXNrcyA9IGxpc3Q7XG4gIH1cblxuICBhZGRUYXNrKHRhc2spIHtcbiAgICB0aGlzLm15VGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0NvbXBsZXRlO1xuICB9XG5cbiAgc2V0IGlzQ29tcGxldGUoc3RhdHVzKSB7XG4gICAgdGhpcy5faXNDb21wbGV0ZSA9IHN0YXR1cztcbiAgfVxuXG4gIHJlbW92ZVRhc2sodGFzaykge1xuICAgIHRoaXMubXlUYXNrcy5zcGxpY2UodGhpcy5teVRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQsIHZpc2libGUgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBcbiAgc2V0IG5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMuX25hbWUgPSBuZXdOYW1lO1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBnZXQgZHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZHVlRGF0ZTtcbiAgfVxuXG4gIHNldCBkdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLl9kdWVEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIGdldCBwcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XG4gIH1cblxuICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbiAgICB0aGlzLl9wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICB9XG5cbiAgZ2V0IGNvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGxldGVkO1xuICB9XG5cbiAgc2V0IGNvbXBsZXRlZChjb21wbGV0ZSkge1xuICAgIHRoaXMuX2NvbXBsZXRlZCA9IGNvbXBsZXRlO1xuICB9XG5cbiAgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBzZXQgdmlzaWJsZShtb2RlKSB7XG4gICAgdGhpcy5fdmlzaWJsZSA9IG1vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkQXBwIGZyb20gJy4vZXZlbnRDb250cm9sbGVyJztcblxubG9hZEFwcCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==