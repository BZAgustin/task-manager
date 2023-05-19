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
    date.innerHTML = `Due Date: ${dueDate}`;

    const edit = document.createElement('img');
    edit.alt = 'X';

    rightSection.appendChild(date);
    rightSection.appendChild(edit);

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

  // Create Task Form
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

  // Methods (projects)
  function getProjectName() {
    return projectNameInput.value;
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





const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__["default"])();
const defaultProject = new _project__WEBPACK_IMPORTED_MODULE_2__["default"]('Default Project');

function plugListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = display.getDate();
      const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, '', false);
      defaultProject.myTasks.push(task);
      display.showTasks(defaultProject.myTasks);
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      const project = new _project__WEBPACK_IMPORTED_MODULE_2__["default"](name);
      _project__WEBPACK_IMPORTED_MODULE_2__["default"].myProjects.push(project);
      display.showProjects(_project__WEBPACK_IMPORTED_MODULE_2__["default"].myProjects);
    }
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

  static myProjects = [];

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

  static myTasks = [];

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
/* eslint-disable max-classes-per-file */


(0,_eventController__WEBPACK_IMPORTED_MODULE_0__["default"])();

// const defaultProject = new Project('Default Project');

// const display = DOM();

// const taskOne = new Task('Do Homework', 'just do your homework man', format(new Date('1994-12-01T03:00:00'), 'dd/MM/yyyy'), '', false);
// Task.myTasks.push(taskOne);

// const taskTwo = new Task('Shower', 'just shower man', format(new Date('1994-11-05T12:00:00'), 'dd/MM/yyyy'), '', false);
// Task.myTasks.push(taskTwo);

// const projectOne = new Project('Project 1');

// projectOne.addTask(taskOne);
// projectOne.addTask(taskTwo);

// Project.myProjects.push(projectOne);

// display.showTasks(Task.myTasks);
// display.showProjects(Project.myProjects);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bnRDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy90YXNrLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5jb25zdCB0YXNrRGl2RmFjdG9yeSA9IChuYW1lLCBkdWVEYXRlLCB0YXNrSWQpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWAgO1xuXG4gICAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdsZWZ0LXNlY3Rpb24nKTtcbiAgICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncmlnaHQtc2VjdGlvbicpO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIGNoZWNrYm94LmlkID0gYHRhc2stJHt0YXNrSWR9LWNoZWNrYm94YDtcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWwuaW5uZXJIVE1MID0gbmFtZTtcblxuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRhdGUuaW5uZXJIVE1MID0gYER1ZSBEYXRlOiAke2R1ZURhdGV9YDtcblxuICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0LmFsdCA9ICdYJztcblxuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoZWRpdCk7XG5cbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTZWN0aW9uKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2VjdGlvbik7XG5cbiAgICByZXR1cm4gdGFzaztcbn07XG5cbmNvbnN0IHByb2plY3REaXZGYWN0b3J5ID0gKG5hbWUsIHByb2plY3RJZCkgPT4ge1xuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgcHJvamVjdC5pZCA9IGBwcm9qZWN0LSR7cHJvamVjdElkfWA7XG4gIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIHByb2plY3RJY29uLmFsdCA9ICdPJztcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHByb2plY3ROYW1lLmlubmVySFRNTCA9IG5hbWU7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuICByZXR1cm4gcHJvamVjdDtcbn1cblxuY29uc3QgRE9NID0gKCkgPT4ge1xuICAvLyBTaWRlYmFyXG4gIGNvbnN0IGJ0bkluYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1pbmJveCcpO1xuICBjb25zdCBidG5Ub2RheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tdG9kYXknKTtcbiAgY29uc3QgYnRuV2VlayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4td2VlaycpO1xuICBcbiAgLy8gQWRkIG5ldyBwcm9qZWN0XG4gIGNvbnN0IGJ0bk5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy1wcm9qZWN0Jyk7XG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IGJ0bkNvbmZpcm1Qcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jb25maXJtLXByb2plY3QtbmFtZScpO1xuXG4gIC8vIFRhc2sgTGlzdFxuICBjb25zdCBidG5OZXdUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXctdGFzaycpO1xuXG4gIC8vIENyZWF0ZSBUYXNrIEZvcm1cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24taW5wdXQnKTtcbiAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLWlucHV0Jyk7XG4gIGNvbnN0IGJ0bkxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbG93Jyk7XG4gIGNvbnN0IGJ0bk1pZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWlkJyk7XG4gIGNvbnN0IGJ0bkhpZ2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWhpZ2gnKTtcbiAgY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tYWRkLXRhc2snKTtcblxuICAvLyBQYXJlbnQgTm9kZXNcbiAgY29uc3QgcHJvamVjdExpc3RQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gIGNvbnN0IHRhc2tMaXN0UGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbGlzdCcpO1xuXG4gIC8vIE1ldGhvZHMgKHRhc2tzKVxuICBmdW5jdGlvbiBnZXRUYXNrTmFtZSgpIHtcbiAgICByZXR1cm4gdGl0bGUudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb24udmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIHJldHVybiBkYXRlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICAgIHRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdExpc3RBZGQocHJvamVjdCkge1xuICAgIHByb2plY3RMaXN0UGFyZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tzKGxpc3QpIHtcbiAgICB3aGlsZSh0YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICB0YXNrTGlzdFBhcmVudC5yZW1vdmVDaGlsZCh0YXNrTGlzdFBhcmVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmb3IoY29uc3QgdGFzayBvZiBsaXN0KSB7XG4gICAgICB0YXNrTGlzdEFkZCh0YXNrRGl2RmFjdG9yeSh0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSwgbGlzdC5pbmRleE9mKHRhc2spKzEpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdHMobGlzdCkge1xuICAgIHdoaWxlKHByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHByb2plY3RMaXN0UGFyZW50LnJlbW92ZUNoaWxkKHByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZvcihjb25zdCBwcm9qZWN0IG9mIGxpc3QpIHtcbiAgICAgIHByb2plY3RMaXN0QWRkKHByb2plY3REaXZGYWN0b3J5KHByb2plY3QubmFtZSwgbGlzdC5pbmRleE9mKHByb2plY3QpKzEpKTtcbiAgICB9XG4gIH1cblxuICAvLyBNZXRob2RzIChwcm9qZWN0cylcbiAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgcmV0dXJuIHByb2plY3ROYW1lSW5wdXQudmFsdWU7XG4gIH1cblxuICByZXR1cm4geyBidG5JbmJveCwgYnRuVG9kYXksIGJ0bldlZWssIGJ0bk5ld1Byb2plY3QsIHByb2plY3ROYW1lSW5wdXQsIGJ0bkNvbmZpcm1Qcm9qZWN0LCBidG5OZXdUYXNrLCBcbiAgICAgICAgICAgYnRuTG93LCBidG5NaWQsIGJ0bkhpZ2gsIGJ0bkFkZFRhc2ssIHByb2plY3RMaXN0UGFyZW50LCB0YXNrTGlzdFBhcmVudCwgZ2V0VGFza05hbWUsIFxuICAgICAgICAgICBnZXRQcm9qZWN0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldERhdGUsIHRhc2tMaXN0QWRkLCBwcm9qZWN0TGlzdEFkZCwgc2hvd1Rhc2tzLCBzaG93UHJvamVjdHMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCJpbXBvcnQgeyBmb3JtYXQsIGlzVG9kYXksIGlzVGhpc1dlZWsgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgVGFzayBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0JztcblxuY29uc3QgZGlzcGxheSA9IERPTSgpO1xuY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCBQcm9qZWN0Jyk7XG5cbmZ1bmN0aW9uIHBsdWdMaXN0ZW5lcnMoKSB7XG4gIGRpc3BsYXkuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmKGRpc3BsYXkuZ2V0VGFza05hbWUoKSAhPT0gJycpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBkaXNwbGF5LmdldFRhc2tOYW1lKCk7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRpc3BsYXkuZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBkaXNwbGF5LmdldERhdGUoKTtcbiAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSwgJycsIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRQcm9qZWN0Lm15VGFza3MucHVzaCh0YXNrKTtcbiAgICAgIGRpc3BsYXkuc2hvd1Rhc2tzKGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuICAgIH1cbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bkNvbmZpcm1Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmKGRpc3BsYXkuZ2V0UHJvamVjdE5hbWUoKSAhPT0gJycpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBkaXNwbGF5LmdldFByb2plY3ROYW1lKCk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICBQcm9qZWN0Lm15UHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgIGRpc3BsYXkuc2hvd1Byb2plY3RzKFByb2plY3QubXlQcm9qZWN0cyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZEFwcCgpIHtcbiAgcGx1Z0xpc3RlbmVycygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkQXBwO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm15VGFza3MgPSBbXTtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBteVByb2plY3RzID0gW107XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSh2YWx1ZSkge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBteVRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLl9teVRhc2tzO1xuICB9XG5cbiAgc2V0IG15VGFza3MobGlzdCkge1xuICAgIHRoaXMuX215VGFza3MgPSBsaXN0O1xuICB9XG5cbiAgYWRkVGFzayh0YXNrKSB7XG4gICAgdGhpcy5teVRhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNDb21wbGV0ZTtcbiAgfVxuXG4gIHNldCBpc0NvbXBsZXRlKHN0YXR1cykge1xuICAgIHRoaXMuX2lzQ29tcGxldGUgPSBzdGF0dXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQpIHtcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMudGFza0R1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMudGFza1ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy50YXNrQ29tcGxldGVkID0gY29tcGxldGVkO1xuICB9XG5cbiAgc3RhdGljIG15VGFza3MgPSBbXTtcblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcbiAgfVxuICBcbiAgc2V0IG5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMudGFza05hbWUgPSBuZXdOYW1lO1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tEZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBnZXQgZHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrRHVlRGF0ZTtcbiAgfVxuXG4gIHNldCBkdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLnRhc2tEdWVEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIGdldCBwcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrUHJpb3JpdHk7XG4gIH1cblxuICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbiAgICB0aGlzLnRhc2tQcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICB9XG5cbiAgZ2V0IGNvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrQ29tcGxldGVkO1xuICB9XG5cbiAgc2V0IGNvbXBsZXRlZChjb21wbGV0ZSkge1xuICAgIHRoaXMudGFza0NvbXBsZXRlZCA9IGNvbXBsZXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuaW1wb3J0IGxvYWRBcHAgZnJvbSAnLi9ldmVudENvbnRyb2xsZXInO1xuXG5sb2FkQXBwKCk7XG5cbi8vIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQgUHJvamVjdCcpO1xuXG4vLyBjb25zdCBkaXNwbGF5ID0gRE9NKCk7XG5cbi8vIGNvbnN0IHRhc2tPbmUgPSBuZXcgVGFzaygnRG8gSG9tZXdvcmsnLCAnanVzdCBkbyB5b3VyIGhvbWV3b3JrIG1hbicsIGZvcm1hdChuZXcgRGF0ZSgnMTk5NC0xMi0wMVQwMzowMDowMCcpLCAnZGQvTU0veXl5eScpLCAnJywgZmFsc2UpO1xuLy8gVGFzay5teVRhc2tzLnB1c2godGFza09uZSk7XG5cbi8vIGNvbnN0IHRhc2tUd28gPSBuZXcgVGFzaygnU2hvd2VyJywgJ2p1c3Qgc2hvd2VyIG1hbicsIGZvcm1hdChuZXcgRGF0ZSgnMTk5NC0xMS0wNVQxMjowMDowMCcpLCAnZGQvTU0veXl5eScpLCAnJywgZmFsc2UpO1xuLy8gVGFzay5teVRhc2tzLnB1c2godGFza1R3byk7XG5cbi8vIGNvbnN0IHByb2plY3RPbmUgPSBuZXcgUHJvamVjdCgnUHJvamVjdCAxJyk7XG5cbi8vIHByb2plY3RPbmUuYWRkVGFzayh0YXNrT25lKTtcbi8vIHByb2plY3RPbmUuYWRkVGFzayh0YXNrVHdvKTtcblxuLy8gUHJvamVjdC5teVByb2plY3RzLnB1c2gocHJvamVjdE9uZSk7XG5cbi8vIGRpc3BsYXkuc2hvd1Rhc2tzKFRhc2subXlUYXNrcyk7XG4vLyBkaXNwbGF5LnNob3dQcm9qZWN0cyhQcm9qZWN0Lm15UHJvamVjdHMpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9