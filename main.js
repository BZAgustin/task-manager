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
/* eslint-disable no-restricted-syntax */

const taskDivFactory = (name, dueDate, taskId) => {
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
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
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
  const projectNameInput = document.getElementById('project-name-input');
  const btnConfirmProject = document.getElementById('btn-confirm-project-name');

  // Task List
  const btnNewTask = document.getElementById('btn-new-task');

  // 'Create Task' Form
  const title = document.getElementById('title-input');
  const description = document.getElementById('description-input');
  const date = document.getElementById('date-input');
  const btnLow = document.getElementById('btn-low');
  const btnMid = document.getElementById('btn-mid');
  const btnHigh = document.getElementById('btn-high');
  const btnAddTask = document.getElementById('btn-add-task');

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

  function getDescription() {
    return description.value;
  }

  function getDate() {
    return date.value;
  }

  function taskListAdd(task) {
    taskListParent.appendChild(task);
  }

  function projectListAdd(project) {
    projectListParent.appendChild(project);
  }

  function showTasks(list) {
    while(taskListParent.firstChild) {
      taskListParent.removeChild(taskListParent.firstChild);
    }

    for(const task of list) {
      taskListAdd(taskDivFactory(task.name, task.dueDate, list.indexOf(task)));
    }
  }

  function showProjects(list) {
    while(projectListParent.firstChild) {
      projectListParent.removeChild(projectListParent.firstChild);
    }

    for(const project of list) {
      projectListAdd(projectDivFactory(project.name, list.indexOf(project)));
    }
  }

  return { btnInbox, btnToday, btnWeek, btnNewProject, projectNameInput, btnConfirmProject, btnNewTask, 
           btnLow, btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, getTaskName, 
           getProjectName, getDescription, getDate, taskListAdd, projectListAdd, showTasks, showProjects };
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
/* eslint-disable no-restricted-syntax */





const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__["default"])();

const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('Default');

const projectManager = {
  projects: [],
  activeProject: defaultProject
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

function hookTaskListeners() {
  const taskList = Array.from(display.taskListParent.childNodes);
  for(let i = 0; i < taskList.length; i++) {
    const removeButton = document.getElementById(`remove-task-${i}`);
    removeButton.removeEventListener('click', removeTaskHandler);
    removeButton.addEventListener('click', removeTaskHandler(taskList, i));
  }
}

function refreshTaskList(newList) {
  display.showTasks(newList);
  hookTaskListeners();
}

function hookMenuListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = new Date(`${display.getDate()}`);
      const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, '', false);
      defaultProject.myTasks.push(task);
      refreshTaskList(defaultProject.myTasks);
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](name));
      display.showProjects(projectManager.projects);
    }
  });
  
  display.btnInbox.addEventListener('click', () => {
    refreshTaskList(defaultProject.myTasks);
  });
  
  display.btnToday.addEventListener('click', () => {
    const todayTasks = getAllTasks().filter(task => isToday(task.taskDueDate));
    refreshTaskList(todayTasks);
  });
  
  display.btnWeek.addEventListener('click', () => {
    const weekTasks = getAllTasks().filter(task => isThisWeek(task.taskDueDate));
    refreshTaskList(weekTasks);
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
class Task {
  constructor(name, description, dueDate, priority, completed) {
    this.taskName = name;
    this.taskDescription = description;
    this.taskDueDate = dueDate;
    this.taskPriority = priority;
    this.taskCompleted = completed;
  }

  get name() {
    return this.taskName;
  }
  
  set name(newName) {
    this.taskName = newName;
  }

  get description() {
    return this.taskDescription;
  }

  set description(newDescription) {
    this.taskDescription = newDescription;
  }

  get dueDate() {
    return this.taskDueDate;
  }

  set dueDate(date) {
    this.taskDueDate = date;
  }

  get priority() {
    return this.taskPriority;
  }

  set priority(newPriority) {
    this.taskPriority = newPriority;
  }

  get completed() {
    return this.taskCompleted;
  }

  set completed(complete) {
    this.taskCompleted = complete;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOd0M7O0FBRXhDLDREQUFPLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5jb25zdCB0YXNrRGl2RmFjdG9yeSA9IChuYW1lLCBkdWVEYXRlLCB0YXNrSWQpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWAgO1xuXG4gICAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdsZWZ0LXNlY3Rpb24nKTtcbiAgICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncmlnaHQtc2VjdGlvbicpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIGNoZWNrYm94LmlkID0gYHRhc2stJHt0YXNrSWR9LWNoZWNrYm94YDtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWwuaW5uZXJIVE1MID0gbmFtZTtcblxuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRhdGUuaW5uZXJIVE1MID0gYER1ZSBEYXRlOiAke2R1ZURhdGUuZ2V0VVRDRGF0ZSgpfS8ke2R1ZURhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZHVlRGF0ZS5nZXRGdWxsWWVhcigpfWA7XG5cbiAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWRpdC5hbHQgPSAnRWRpdCc7XG4gICAgZWRpdC5pZCA9IGBlZGl0LXRhc2stJHt0YXNrSWR9YDtcblxuICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHJlbW92ZS5hbHQgPSAnWCc7XG4gICAgcmVtb3ZlLmlkID0gYHJlbW92ZS10YXNrLSR7dGFza0lkfWA7XG5cbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoZGF0ZSk7XG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKGVkaXQpO1xuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChyZW1vdmUpO1xuXG4gICAgdGFzay5hcHBlbmRDaGlsZChsZWZ0U2VjdGlvbik7XG4gICAgdGFzay5hcHBlbmRDaGlsZChyaWdodFNlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRhc2s7XG59O1xuXG5jb25zdCBwcm9qZWN0RGl2RmFjdG9yeSA9IChuYW1lLCBwcm9qZWN0SWQpID0+IHtcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIHByb2plY3QuaWQgPSBgcHJvamVjdC0ke3Byb2plY3RJZH1gO1xuICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBwcm9qZWN0SWNvbi5hbHQgPSAnTyc7XG4gIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBwcm9qZWN0TmFtZS5pbm5lckhUTUwgPSBuYW1lO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RJY29uKTtcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cbiAgcmV0dXJuIHByb2plY3Q7XG59XG5cbmNvbnN0IERPTSA9ICgpID0+IHtcbiAgLy8gU2lkZWJhclxuICBjb25zdCBidG5JbmJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taW5ib3gnKTtcbiAgY29uc3QgYnRuVG9kYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXRvZGF5Jyk7XG4gIGNvbnN0IGJ0bldlZWsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXdlZWsnKTtcbiAgXG4gIC8vIEFkZCBuZXcgcHJvamVjdFxuICBjb25zdCBidG5OZXdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXctcHJvamVjdCcpO1xuICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZS1pbnB1dCcpO1xuICBjb25zdCBidG5Db25maXJtUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1wcm9qZWN0LW5hbWUnKTtcblxuICAvLyBUYXNrIExpc3RcbiAgY29uc3QgYnRuTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXRhc2snKTtcblxuICAvLyAnQ3JlYXRlIFRhc2snIEZvcm1cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24taW5wdXQnKTtcbiAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLWlucHV0Jyk7XG4gIGNvbnN0IGJ0bkxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbG93Jyk7XG4gIGNvbnN0IGJ0bk1pZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWlkJyk7XG4gIGNvbnN0IGJ0bkhpZ2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWhpZ2gnKTtcbiAgY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tYWRkLXRhc2snKTtcblxuICAvLyBQYXJlbnQgTm9kZXNcbiAgY29uc3QgcHJvamVjdExpc3RQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gIGNvbnN0IHRhc2tMaXN0UGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbGlzdCcpO1xuXG4gIC8vIE1ldGhvZHMgKHByb2plY3RzKVxuICBmdW5jdGlvbiBnZXRQcm9qZWN0TmFtZSgpIHtcbiAgICByZXR1cm4gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcbiAgfVxuXG4gIC8vIE1ldGhvZHMgKHRhc2tzKVxuICBmdW5jdGlvbiBnZXRUYXNrTmFtZSgpIHtcbiAgICByZXR1cm4gdGl0bGUudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb24udmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIHJldHVybiBkYXRlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICAgIHRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdExpc3RBZGQocHJvamVjdCkge1xuICAgIHByb2plY3RMaXN0UGFyZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKGxpc3QpIHtcbiAgICB3aGlsZSh0YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICB0YXNrTGlzdFBhcmVudC5yZW1vdmVDaGlsZCh0YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IoY29uc3QgdGFzayBvZiBsaXN0KSB7XG4gICAgICB0YXNrTGlzdEFkZCh0YXNrRGl2RmFjdG9yeSh0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSwgbGlzdC5pbmRleE9mKHRhc2spKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKGxpc3QpIHtcbiAgICB3aGlsZShwcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICBwcm9qZWN0TGlzdFBhcmVudC5yZW1vdmVDaGlsZChwcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IoY29uc3QgcHJvamVjdCBvZiBsaXN0KSB7XG4gICAgICBwcm9qZWN0TGlzdEFkZChwcm9qZWN0RGl2RmFjdG9yeShwcm9qZWN0Lm5hbWUsIGxpc3QuaW5kZXhPZihwcm9qZWN0KSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGJ0bkluYm94LCBidG5Ub2RheSwgYnRuV2VlaywgYnRuTmV3UHJvamVjdCwgcHJvamVjdE5hbWVJbnB1dCwgYnRuQ29uZmlybVByb2plY3QsIGJ0bk5ld1Rhc2ssIFxuICAgICAgICAgICBidG5Mb3csIGJ0bk1pZCwgYnRuSGlnaCwgYnRuQWRkVGFzaywgcHJvamVjdExpc3RQYXJlbnQsIHRhc2tMaXN0UGFyZW50LCBnZXRUYXNrTmFtZSwgXG4gICAgICAgICAgIGdldFByb2plY3ROYW1lLCBnZXREZXNjcmlwdGlvbiwgZ2V0RGF0ZSwgdGFza0xpc3RBZGQsIHByb2plY3RMaXN0QWRkLCBzaG93VGFza3MsIHNob3dQcm9qZWN0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmltcG9ydCBET00gZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuXG5jb25zdCBkaXNwbGF5ID0gRE9NKCk7XG5cbmNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQnKTtcblxuY29uc3QgcHJvamVjdE1hbmFnZXIgPSB7XG4gIHByb2plY3RzOiBbXSxcbiAgYWN0aXZlUHJvamVjdDogZGVmYXVsdFByb2plY3Rcbn1cblxuZnVuY3Rpb24gZ2V0QWxsVGFza3MoKSB7XG4gIGNvbnN0IHRhc2tzID0gW107XG5cbiAgdGFza3MucHVzaChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcblxuICBmb3IoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0TWFuYWdlci5wcm9qZWN0cykge1xuICAgIHRhc2tzLnB1c2gocHJvamVjdC5teVRhc2tzKTtcbiAgfVxuXG4gIHJldHVybiB0YXNrcy5mbGF0KCk7XG59XG5cblxuZnVuY3Rpb24gaXNUb2RheShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gIHJldHVybiBkYXRlLmdldERhdGUoKSA9PT0gY3VycmVudERhdGU7XG59XG5cbmZ1bmN0aW9uIGlzVGhpc1dlZWsoZGF0ZSkge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHdlZWtTdGFydCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSAtIGN1cnJlbnREYXRlLmdldERheSgpKTtcbiAgY29uc3Qgd2Vla0VuZCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSArICg2IC0gY3VycmVudERhdGUuZ2V0RGF5KCkpKTtcbiAgXG4gIHJldHVybiBkYXRlID49IHdlZWtTdGFydCAmJiBkYXRlIDw9IHdlZWtFbmQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2tIYW5kbGVyKGxpc3QsIGluZGV4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0LnJlbW92ZVRhc2socHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzW2luZGV4XSk7XG4gICAgbGlzdFtpbmRleF0ucmVtb3ZlKCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGhvb2tUYXNrTGlzdGVuZXJzKCkge1xuICBjb25zdCB0YXNrTGlzdCA9IEFycmF5LmZyb20oZGlzcGxheS50YXNrTGlzdFBhcmVudC5jaGlsZE5vZGVzKTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IHRhc2tMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHJlbW92ZS10YXNrLSR7aX1gKTtcbiAgICByZW1vdmVCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUYXNrSGFuZGxlcik7XG4gICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlVGFza0hhbmRsZXIodGFza0xpc3QsIGkpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWZyZXNoVGFza0xpc3QobmV3TGlzdCkge1xuICBkaXNwbGF5LnNob3dUYXNrcyhuZXdMaXN0KTtcbiAgaG9va1Rhc2tMaXN0ZW5lcnMoKTtcbn1cblxuZnVuY3Rpb24gaG9va01lbnVMaXN0ZW5lcnMoKSB7XG4gIGRpc3BsYXkuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKGRpc3BsYXkuZ2V0VGFza05hbWUoKSAhPT0gJycpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBkaXNwbGF5LmdldFRhc2tOYW1lKCk7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRpc3BsYXkuZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHtkaXNwbGF5LmdldERhdGUoKX1gKTtcbiAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSwgJycsIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRQcm9qZWN0Lm15VGFza3MucHVzaCh0YXNrKTtcbiAgICAgIHJlZnJlc2hUYXNrTGlzdChkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZGlzcGxheS5idG5Db25maXJtUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZihkaXNwbGF5LmdldFByb2plY3ROYW1lKCkgIT09ICcnKSB7XG4gICAgICBjb25zdCBuYW1lID0gZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpO1xuICAgICAgcHJvamVjdE1hbmFnZXIucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSk7XG4gICAgICBkaXNwbGF5LnNob3dQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cyk7XG4gICAgfVxuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuSW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVmcmVzaFRhc2tMaXN0KGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuVG9kYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IGdldEFsbFRhc2tzKCkuZmlsdGVyKHRhc2sgPT4gaXNUb2RheSh0YXNrLnRhc2tEdWVEYXRlKSk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHRvZGF5VGFza3MpO1xuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuV2Vlay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB3ZWVrVGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVGhpc1dlZWsodGFzay50YXNrRHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh3ZWVrVGFza3MpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZEFwcCgpIHtcbiAgaG9va01lbnVMaXN0ZW5lcnMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZEFwcDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5teVRhc2tzID0gW107XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG15VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215VGFza3M7XG4gIH1cblxuICBzZXQgbXlUYXNrcyhsaXN0KSB7XG4gICAgdGhpcy5fbXlUYXNrcyA9IGxpc3Q7XG4gIH1cblxuICBhZGRUYXNrKHRhc2spIHtcbiAgICB0aGlzLm15VGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0NvbXBsZXRlO1xuICB9XG5cbiAgc2V0IGlzQ29tcGxldGUoc3RhdHVzKSB7XG4gICAgdGhpcy5faXNDb21wbGV0ZSA9IHN0YXR1cztcbiAgfVxuXG4gIHJlbW92ZVRhc2sodGFzaykge1xuICAgIHRoaXMubXlUYXNrcy5zcGxpY2UodGhpcy5teVRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0OyIsImNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCkge1xuICAgIHRoaXMudGFza05hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy50YXNrRHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy50YXNrUHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLnRhc2tDb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcbiAgfVxuICBcbiAgc2V0IG5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMudGFza05hbWUgPSBuZXdOYW1lO1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBnZXQgZHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrRHVlRGF0ZTtcbiAgfVxuXG4gIHNldCBkdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLnRhc2tEdWVEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIGdldCBwcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrUHJpb3JpdHk7XG4gIH1cblxuICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbiAgICB0aGlzLnRhc2tQcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICB9XG5cbiAgZ2V0IGNvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrQ29tcGxldGVkO1xuICB9XG5cbiAgc2V0IGNvbXBsZXRlZChjb21wbGV0ZSkge1xuICAgIHRoaXMudGFza0NvbXBsZXRlZCA9IGNvbXBsZXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZEFwcCBmcm9tICcuL2V2ZW50Q29udHJvbGxlcic7XG5cbmxvYWRBcHAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=