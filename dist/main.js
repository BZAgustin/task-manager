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
    date.innerHTML = `Due Date: ${dueDate.getDate() + 1}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;

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
      taskListAdd(taskDivFactory(task.name, task.dueDate, list.indexOf(task)+1));
    }
  }

  function showProjects(list) {
    while(projectListParent.firstChild) {
      projectListParent.removeChild(projectListParent.firstChild);
    }

    for(const project of list) {
      projectListAdd(projectDivFactory(project.name, list.indexOf(project)+1));
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

const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('Default Project');

const projectManager = {
  projects: [],
  activeProject: null
}

projectManager.activeProject = defaultProject;

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

function plugListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = new Date(`${display.getDate()}`);
      const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, '', false);
      defaultProject.myTasks.push(task);
      display.showTasks(defaultProject.myTasks);
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
    display.showTasks(defaultProject.myTasks);
  });

  display.btnToday.addEventListener('click', () => {
    const todayTasks = getAllTasks().filter(task => isToday(task.taskDueDate));
    display.showTasks(todayTasks);
  });

  display.btnWeek.addEventListener('click', () => {
    const weekTasks = getAllTasks().filter(task => isThisWeek(task.taskDueDate));
    display.showTasks(weekTasks);
  });
}

function loadApp() {
  plugListeners();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEMsNERBQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5jb25zdCB0YXNrRGl2RmFjdG9yeSA9IChuYW1lLCBkdWVEYXRlLCB0YXNrSWQpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWAgO1xuXG4gICAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdsZWZ0LXNlY3Rpb24nKTtcbiAgICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncmlnaHQtc2VjdGlvbicpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIGNoZWNrYm94LmlkID0gYHRhc2stJHt0YXNrSWR9LWNoZWNrYm94YDtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWwuaW5uZXJIVE1MID0gbmFtZTtcblxuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRhdGUuaW5uZXJIVE1MID0gYER1ZSBEYXRlOiAke2R1ZURhdGUuZ2V0RGF0ZSgpICsgMX0vJHtkdWVEYXRlLmdldE1vbnRoKCkgKyAxfS8ke2R1ZURhdGUuZ2V0RnVsbFllYXIoKX1gO1xuXG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXQuYWx0ID0gJ0VkaXQnO1xuICAgIGVkaXQuaWQgPSBgZWRpdC10YXNrLSR7dGFza0lkfWA7XG5cbiAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICByZW1vdmUuYWx0ID0gJ1gnO1xuICAgIHJlbW92ZS5pZCA9IGByZW1vdmUtdGFzay0ke3Rhc2tJZH1gO1xuXG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChlZGl0KTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQocmVtb3ZlKTtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcblxuICAgIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdERpdkZhY3RvcnkgPSAobmFtZSwgcHJvamVjdElkKSA9PiB7XG4gIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBwcm9qZWN0LmlkID0gYHByb2plY3QtJHtwcm9qZWN0SWR9YDtcbiAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgcHJvamVjdEljb24uYWx0ID0gJ08nO1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgcHJvamVjdE5hbWUuaW5uZXJIVE1MID0gbmFtZTtcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5jb25zdCBET00gPSAoKSA9PiB7XG4gIC8vIFNpZGViYXJcbiAgY29uc3QgYnRuSW5ib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWluYm94Jyk7XG4gIGNvbnN0IGJ0blRvZGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi10b2RheScpO1xuICBjb25zdCBidG5XZWVrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi13ZWVrJyk7XG4gIFxuICAvLyBBZGQgbmV3IHByb2plY3RcbiAgY29uc3QgYnRuTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXByb2plY3QnKTtcbiAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUtaW5wdXQnKTtcbiAgY29uc3QgYnRuQ29uZmlybVByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tcHJvamVjdC1uYW1lJyk7XG5cbiAgLy8gVGFzayBMaXN0XG4gIGNvbnN0IGJ0bk5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy10YXNrJyk7XG5cbiAgLy8gJ0NyZWF0ZSBUYXNrJyBGb3JtXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWlucHV0Jyk7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uLWlucHV0Jyk7XG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZS1pbnB1dCcpO1xuICBjb25zdCBidG5Mb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWxvdycpO1xuICBjb25zdCBidG5NaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1pZCcpO1xuICBjb25zdCBidG5IaWdoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1oaWdoJyk7XG4gIGNvbnN0IGJ0bkFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWFkZC10YXNrJyk7XG5cbiAgLy8gUGFyZW50IE5vZGVzXG4gIGNvbnN0IHByb2plY3RMaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICBjb25zdCB0YXNrTGlzdFBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcblxuICAvLyBNZXRob2RzIChwcm9qZWN0cylcbiAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgcmV0dXJuIHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG4gIH1cblxuICAvLyBNZXRob2RzICh0YXNrcylcbiAgZnVuY3Rpb24gZ2V0VGFza05hbWUoKSB7XG4gICAgcmV0dXJuIHRpdGxlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcbiAgICByZXR1cm4gZGF0ZS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRhc2tMaXN0QWRkKHRhc2spIHtcbiAgICB0YXNrTGlzdFBhcmVudC5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2plY3RMaXN0QWRkKHByb2plY3QpIHtcbiAgICBwcm9qZWN0TGlzdFBhcmVudC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dUYXNrcyhsaXN0KSB7XG4gICAgd2hpbGUodGFza0xpc3RQYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgdGFza0xpc3RQYXJlbnQucmVtb3ZlQ2hpbGQodGFza0xpc3RQYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgZm9yKGNvbnN0IHRhc2sgb2YgbGlzdCkge1xuICAgICAgdGFza0xpc3RBZGQodGFza0RpdkZhY3RvcnkodGFzay5uYW1lLCB0YXNrLmR1ZURhdGUsIGxpc3QuaW5kZXhPZih0YXNrKSsxKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RzKGxpc3QpIHtcbiAgICB3aGlsZShwcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICBwcm9qZWN0TGlzdFBhcmVudC5yZW1vdmVDaGlsZChwcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IoY29uc3QgcHJvamVjdCBvZiBsaXN0KSB7XG4gICAgICBwcm9qZWN0TGlzdEFkZChwcm9qZWN0RGl2RmFjdG9yeShwcm9qZWN0Lm5hbWUsIGxpc3QuaW5kZXhPZihwcm9qZWN0KSsxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYnRuSW5ib3gsIGJ0blRvZGF5LCBidG5XZWVrLCBidG5OZXdQcm9qZWN0LCBwcm9qZWN0TmFtZUlucHV0LCBidG5Db25maXJtUHJvamVjdCwgYnRuTmV3VGFzaywgXG4gICAgICAgICAgIGJ0bkxvdywgYnRuTWlkLCBidG5IaWdoLCBidG5BZGRUYXNrLCBwcm9qZWN0TGlzdFBhcmVudCwgdGFza0xpc3RQYXJlbnQsIGdldFRhc2tOYW1lLCBcbiAgICAgICAgICAgZ2V0UHJvamVjdE5hbWUsIGdldERlc2NyaXB0aW9uLCBnZXREYXRlLCB0YXNrTGlzdEFkZCwgcHJvamVjdExpc3RBZGQsIHNob3dUYXNrcywgc2hvd1Byb2plY3RzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuaW1wb3J0IERPTSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5cbmNvbnN0IGRpc3BsYXkgPSBET00oKTtcblxuY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCBQcm9qZWN0Jyk7XG5cbmNvbnN0IHByb2plY3RNYW5hZ2VyID0ge1xuICBwcm9qZWN0czogW10sXG4gIGFjdGl2ZVByb2plY3Q6IG51bGxcbn1cblxucHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdCA9IGRlZmF1bHRQcm9qZWN0O1xuXG5mdW5jdGlvbiBnZXRBbGxUYXNrcygpIHtcbiAgY29uc3QgdGFza3MgPSBbXTtcblxuICB0YXNrcy5wdXNoKGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuXG4gIGZvcihjb25zdCBwcm9qZWN0IG9mIHByb2plY3RNYW5hZ2VyLnByb2plY3RzKSB7XG4gICAgdGFza3MucHVzaChwcm9qZWN0Lm15VGFza3MpO1xuICB9XG5cbiAgcmV0dXJuIHRhc2tzLmZsYXQoKTtcbn1cblxuZnVuY3Rpb24gaXNUb2RheShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gIHJldHVybiBkYXRlLmdldERhdGUoKSA9PT0gY3VycmVudERhdGU7XG59XG5cbmZ1bmN0aW9uIGlzVGhpc1dlZWsoZGF0ZSkge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHdlZWtTdGFydCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSAtIGN1cnJlbnREYXRlLmdldERheSgpKTtcbiAgY29uc3Qgd2Vla0VuZCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSArICg2IC0gY3VycmVudERhdGUuZ2V0RGF5KCkpKTtcblxuICByZXR1cm4gZGF0ZSA+PSB3ZWVrU3RhcnQgJiYgZGF0ZSA8PSB3ZWVrRW5kO1xufVxuXG5mdW5jdGlvbiBwbHVnTGlzdGVuZXJzKCkge1xuICBkaXNwbGF5LmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZihkaXNwbGF5LmdldFRhc2tOYW1lKCkgIT09ICcnKSB7XG4gICAgICBjb25zdCBuYW1lID0gZGlzcGxheS5nZXRUYXNrTmFtZSgpO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkaXNwbGF5LmdldERlc2NyaXB0aW9uKCk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7ZGlzcGxheS5nZXREYXRlKCl9YCk7XG4gICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUsICcnLCBmYWxzZSk7XG4gICAgICBkZWZhdWx0UHJvamVjdC5teVRhc2tzLnB1c2godGFzayk7XG4gICAgICBkaXNwbGF5LnNob3dUYXNrcyhkZWZhdWx0UHJvamVjdC5teVRhc2tzKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgZGlzcGxheS5idG5Db25maXJtUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZihkaXNwbGF5LmdldFByb2plY3ROYW1lKCkgIT09ICcnKSB7XG4gICAgICBjb25zdCBuYW1lID0gZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpO1xuICAgICAgcHJvamVjdE1hbmFnZXIucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSk7XG4gICAgICBkaXNwbGF5LnNob3dQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cyk7XG4gICAgfVxuICB9KTtcblxuICBkaXNwbGF5LmJ0bkluYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRpc3BsYXkuc2hvd1Rhc2tzKGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0blRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVG9kYXkodGFzay50YXNrRHVlRGF0ZSkpO1xuICAgIGRpc3BsYXkuc2hvd1Rhc2tzKHRvZGF5VGFza3MpO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bldlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla1Rhc2tzID0gZ2V0QWxsVGFza3MoKS5maWx0ZXIodGFzayA9PiBpc1RoaXNXZWVrKHRhc2sudGFza0R1ZURhdGUpKTtcbiAgICBkaXNwbGF5LnNob3dUYXNrcyh3ZWVrVGFza3MpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZEFwcCgpIHtcbiAgcGx1Z0xpc3RlbmVycygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkQXBwO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm15VGFza3MgPSBbXTtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUodmFsdWUpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbXlUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbXlUYXNrcztcbiAgfVxuXG4gIHNldCBteVRhc2tzKGxpc3QpIHtcbiAgICB0aGlzLl9teVRhc2tzID0gbGlzdDtcbiAgfVxuXG4gIGFkZFRhc2sodGFzaykge1xuICAgIHRoaXMubXlUYXNrcy5wdXNoKHRhc2spO1xuICB9XG5cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQ29tcGxldGU7XG4gIH1cblxuICBzZXQgaXNDb21wbGV0ZShzdGF0dXMpIHtcbiAgICB0aGlzLl9pc0NvbXBsZXRlID0gc3RhdHVzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKSB7XG4gICAgdGhpcy50YXNrTmFtZSA9IG5hbWU7XG4gICAgdGhpcy50YXNrRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnRhc2tEdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnRhc2tQcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMudGFza0NvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tOYW1lO1xuICB9XG4gIFxuICBzZXQgbmFtZShuZXdOYW1lKSB7XG4gICAgdGhpcy50YXNrTmFtZSA9IG5ld05hbWU7XG4gIH1cblxuICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy50YXNrRGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldCBkdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tEdWVEYXRlO1xuICB9XG5cbiAgc2V0IGR1ZURhdGUoZGF0ZSkge1xuICAgIHRoaXMudGFza0R1ZURhdGUgPSBkYXRlO1xuICB9XG5cbiAgZ2V0IHByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tQcmlvcml0eTtcbiAgfVxuXG4gIHNldCBwcmlvcml0eShuZXdQcmlvcml0eSkge1xuICAgIHRoaXMudGFza1ByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gIH1cblxuICBnZXQgY29tcGxldGVkKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tDb21wbGV0ZWQ7XG4gIH1cblxuICBzZXQgY29tcGxldGVkKGNvbXBsZXRlKSB7XG4gICAgdGhpcy50YXNrQ29tcGxldGVkID0gY29tcGxldGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkQXBwIGZyb20gJy4vZXZlbnRDb250cm9sbGVyJztcblxubG9hZEFwcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9