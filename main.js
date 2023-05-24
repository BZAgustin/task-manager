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
    edit.classList.add('small');
    edit.src = './assets/edit.png';
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.classList.add('small');
    remove.src = './assets/remove.png';
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
  projectIcon.src = './assets/project.png';
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  const deleteIcon = document.createElement('img');
  deleteIcon.classList.add('small');
  deleteIcon.src = './assets/remove.png';
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


  // 'Edit Task' Form
  const taskOverlay = document.querySelector('.overlay-container');
  const titleEdit = document.getElementById('title-input-edit');
  const descriptionEdit = document.getElementById('description-input-edit');
  const dateEdit = document.getElementById('date-input-edit');
  const btnConfirmEdit = document.getElementById('btn-confirm-edit');
  const btnLowEdit = document.getElementById('btn-low-edit');
  const btnMidEdit = document.getElementById('btn-high-edit');
  const btnHighEdit = document.getElementById('btn-high-edit');

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

  function setListTitle(newTitle) {
    listTitle.innerHTML = newTitle;
  }

  return { btnInbox, btnToday, btnWeek, btnNewProject, container, inputContainer, projectNameInput, taskOverlay, btnConfirmProject, btnNewTask,
           btnLow, btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, getTaskName, setTaskName, getProjectName, getDescription, 
           setDescription, getDate, setDate, titleEdit, taskDivFactory, projectDivFactory, descriptionEdit, dateEdit, btnLowEdit, btnMidEdit, btnHighEdit, btnConfirmEdit, setListTitle };
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
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
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

function refreshTaskList(newList) {
  showTasks(newList);
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
    const index = project.dataset.index;
    remove.addEventListener('click', () => {
      projectManager.projects.splice(index, 1);
    });
    project.addEventListener('click', () => {
      projectManager.activeProject = projectManager.projects[index];
      refreshTaskList(projectManager.activeProject.myTasks);
      display.setListTitle(projectManager.activeProject.name);
    });
  }
}

function hookMenuListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = new Date(`${display.getDate()}`);
      const task = new _task__WEBPACK_IMPORTED_MODULE_1__["default"](name, description, date, taskManager.currentPriority, false);
      projectManager.activeProject.myTasks.push(task);
      refreshTaskList(projectManager.activeProject.myTasks);
      display.container.style.display = 'none';
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](name));
      projectManager.activeProject = projectManager.projects[projectManager.projects.length-1];
      showProjects(projectManager.projects);
      display.setListTitle(projectManager.activeProject.name);
      display.inputContainer.style.display = '';
    }
  });
  
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4Qyw0REFBTyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmNvbnN0IHRhc2tEaXZGYWN0b3J5ID0gKG5hbWUsIGR1ZURhdGUsIHRhc2tJZCwgZWRpdEhhbmRsZXIpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgdGFzay5pZCA9IGB0YXNrLSR7dGFza0lkfWA7XG5cbiAgICBjb25zdCBsZWZ0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJpZ2h0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxlZnRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2xlZnQtc2VjdGlvbicpO1xuICAgIHJpZ2h0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdyaWdodC1zZWN0aW9uJyk7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgY2hlY2tib3guaWQgPSBgdGFzay0ke3Rhc2tJZH0tY2hlY2tib3hgO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBuYW1lO1xuXG4gICAgbGVmdFNlY3Rpb24uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaWYoZHVlRGF0ZSA9PT0gJycpIHtcbiAgICAgIGRhdGUuaW5uZXJIVE1MID0gYE5vIGR1ZSBkYXRlYDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZS5pbm5lckhUTUwgPSBgRHVlIERhdGU6ICR7ZHVlRGF0ZS5nZXRVVENEYXRlKCl9LyR7ZHVlRGF0ZS5nZXRNb250aCgpICsgMX0vJHtkdWVEYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0SGFuZGxlcik7XG4gICAgZWRpdC5jbGFzc0xpc3QuYWRkKCdzbWFsbCcpO1xuICAgIGVkaXQuc3JjID0gJy4vYXNzZXRzL2VkaXQucG5nJztcbiAgICBlZGl0LmFsdCA9ICdFZGl0JztcbiAgICBlZGl0LmlkID0gYGVkaXQtdGFzay0ke3Rhc2tJZH1gO1xuXG4gICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgcmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ3NtYWxsJyk7XG4gICAgcmVtb3ZlLnNyYyA9ICcuL2Fzc2V0cy9yZW1vdmUucG5nJztcbiAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhc2stJHt0YXNrSWR9YCkucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgcmVtb3ZlLmRhdGFzZXQuaW5kZXggPSB0YXNrSWQ7XG4gICAgcmVtb3ZlLmFsdCA9ICdYJztcbiAgICByZW1vdmUuaWQgPSBgcmVtb3ZlLXRhc2stJHt0YXNrSWR9YDtcblxuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChkYXRlKTtcbiAgICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoZWRpdCk7XG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHJlbW92ZSk7XG5cbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTZWN0aW9uKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2VjdGlvbik7XG5cbiAgICByZXR1cm4gdGFzaztcbn07XG5cbmNvbnN0IHByb2plY3REaXZGYWN0b3J5ID0gKG5hbWUsIHByb2plY3RJZCkgPT4ge1xuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgcHJvamVjdC5pZCA9IGBwcm9qZWN0LSR7cHJvamVjdElkfWA7XG4gIHByb2plY3QuZGF0YXNldC5pbmRleCA9IHByb2plY3RJZDtcbiAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgcHJvamVjdEljb24uc3JjID0gJy4vYXNzZXRzL3Byb2plY3QucG5nJztcbiAgcHJvamVjdEljb24uYWx0ID0gJ08nO1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgcHJvamVjdE5hbWUuaW5uZXJIVE1MID0gbmFtZTtcbiAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ3NtYWxsJyk7XG4gIGRlbGV0ZUljb24uc3JjID0gJy4vYXNzZXRzL3JlbW92ZS5wbmcnO1xuICBkZWxldGVJY29uLmFsdCA9ICdYJztcbiAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvamVjdC0ke3Byb2plY3RJZH1gKS5yZW1vdmUoKTtcbiAgfSlcbiAgcHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gIHByb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICBwcm9qZWN0LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gIHJldHVybiBwcm9qZWN0O1xufVxuXG5jb25zdCBET00gPSAoKSA9PiB7XG4gIC8vIFNpZGViYXJcbiAgY29uc3QgYnRuSW5ib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWluYm94Jyk7XG4gIGNvbnN0IGJ0blRvZGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi10b2RheScpO1xuICBjb25zdCBidG5XZWVrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi13ZWVrJyk7XG4gIFxuICAvLyBBZGQgbmV3IHByb2plY3RcbiAgY29uc3QgYnRuTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXByb2plY3QnKTtcbiAgY29uc3QgaW5wdXRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtY29udGFpbmVyJyk7XG4gIGNvbnN0IHByb2plY3ROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IGJ0bkNvbmZpcm1Qcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jb25maXJtLXByb2plY3QtbmFtZScpO1xuXG4gIC8vIFRhc2sgTGlzdFxuICBjb25zdCBsaXN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1saXN0LXRpdGxlJyk7XG4gIGNvbnN0IGJ0bk5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy10YXNrJyk7XG5cbiAgLy8gJ0NyZWF0ZSBUYXNrJyBGb3JtXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtdGFzaycpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1pbnB1dCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dCcpO1xuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtaW5wdXQnKTtcbiAgY29uc3QgYnRuTG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1sb3cnKTtcbiAgY29uc3QgYnRuTWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1taWQnKTtcbiAgY29uc3QgYnRuSGlnaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taGlnaCcpO1xuICBjb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1hZGQtdGFzaycpO1xuXG5cbiAgLy8gJ0VkaXQgVGFzaycgRm9ybVxuICBjb25zdCB0YXNrT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWNvbnRhaW5lcicpO1xuICBjb25zdCB0aXRsZUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtaW5wdXQtZWRpdCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24taW5wdXQtZWRpdCcpO1xuICBjb25zdCBkYXRlRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlLWlucHV0LWVkaXQnKTtcbiAgY29uc3QgYnRuQ29uZmlybUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tZWRpdCcpO1xuICBjb25zdCBidG5Mb3dFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1sb3ctZWRpdCcpO1xuICBjb25zdCBidG5NaWRFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1oaWdoLWVkaXQnKTtcbiAgY29uc3QgYnRuSGlnaEVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWhpZ2gtZWRpdCcpO1xuXG4gIC8vIFBhcmVudCBOb2Rlc1xuICBjb25zdCBwcm9qZWN0TGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgY29uc3QgdGFza0xpc3RQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1saXN0Jyk7XG5cbiAgLy8gTWV0aG9kcyAocHJvamVjdHMpXG4gIGZ1bmN0aW9uIGdldFByb2plY3ROYW1lKCkge1xuICAgIHJldHVybiBwcm9qZWN0TmFtZUlucHV0LnZhbHVlO1xuICB9XG5cbiAgLy8gTWV0aG9kcyAodGFza3MpXG4gIGZ1bmN0aW9uIGdldFRhc2tOYW1lKCkge1xuICAgIHJldHVybiB0aXRsZS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRhc2tOYW1lKG5ld05hbWUpIHtcbiAgICB0aXRsZS52YWx1ZSA9IG5ld05hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb24udmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIHJldHVybiBkYXRlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGF0ZShuZXdEYXRlKSB7XG4gICAgZGF0ZS52YWx1ZSA9IG5ld0RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMaXN0VGl0bGUobmV3VGl0bGUpIHtcbiAgICBsaXN0VGl0bGUuaW5uZXJIVE1MID0gbmV3VGl0bGU7XG4gIH1cblxuICByZXR1cm4geyBidG5JbmJveCwgYnRuVG9kYXksIGJ0bldlZWssIGJ0bk5ld1Byb2plY3QsIGNvbnRhaW5lciwgaW5wdXRDb250YWluZXIsIHByb2plY3ROYW1lSW5wdXQsIHRhc2tPdmVybGF5LCBidG5Db25maXJtUHJvamVjdCwgYnRuTmV3VGFzayxcbiAgICAgICAgICAgYnRuTG93LCBidG5NaWQsIGJ0bkhpZ2gsIGJ0bkFkZFRhc2ssIHByb2plY3RMaXN0UGFyZW50LCB0YXNrTGlzdFBhcmVudCwgZ2V0VGFza05hbWUsIHNldFRhc2tOYW1lLCBnZXRQcm9qZWN0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIFxuICAgICAgICAgICBzZXREZXNjcmlwdGlvbiwgZ2V0RGF0ZSwgc2V0RGF0ZSwgdGl0bGVFZGl0LCB0YXNrRGl2RmFjdG9yeSwgcHJvamVjdERpdkZhY3RvcnksIGRlc2NyaXB0aW9uRWRpdCwgZGF0ZUVkaXQsIGJ0bkxvd0VkaXQsIGJ0bk1pZEVkaXQsIGJ0bkhpZ2hFZGl0LCBidG5Db25maXJtRWRpdCwgc2V0TGlzdFRpdGxlIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmltcG9ydCBET00gZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzayc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuXG5jb25zdCBkaXNwbGF5ID0gRE9NKCk7XG5cbmNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQnKTtcblxuY29uc3QgcHJvamVjdE1hbmFnZXIgPSB7XG4gIHByb2plY3RzOiBbXSxcbiAgYWN0aXZlUHJvamVjdDogZGVmYXVsdFByb2plY3Rcbn1cblxuY29uc3QgdGFza01hbmFnZXIgPSB7XG4gIGFjdGl2ZVRhc2s6IHVuZGVmaW5lZCxcbiAgY3VycmVudFByaW9yaXR5OiAwXG59XG5cbmZ1bmN0aW9uIHRhc2tMaXN0QWRkKHRhc2spIHtcbiAgZGlzcGxheS50YXNrTGlzdFBhcmVudC5hcHBlbmRDaGlsZCh0YXNrKTtcbn1cblxuZnVuY3Rpb24gcHJvamVjdExpc3RBZGQocHJvamVjdCkge1xuICBkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxUYXNrcygpIHtcbiAgY29uc3QgdGFza3MgPSBbXTtcblxuICB0YXNrcy5wdXNoKGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuXG4gIGZvcihjb25zdCBwcm9qZWN0IG9mIHByb2plY3RNYW5hZ2VyLnByb2plY3RzKSB7XG4gICAgdGFza3MucHVzaChwcm9qZWN0Lm15VGFza3MpO1xuICB9XG5cbiAgcmV0dXJuIHRhc2tzLmZsYXQoKTtcbn1cblxuZnVuY3Rpb24gaXNUb2RheShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSA9PT0gY3VycmVudERhdGU7XG59XG5cbmZ1bmN0aW9uIGlzVGhpc1dlZWsoZGF0ZSkge1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IHdlZWtTdGFydCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSAtIGN1cnJlbnREYXRlLmdldERheSgpKTtcbiAgY29uc3Qgd2Vla0VuZCA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSArICg2IC0gY3VycmVudERhdGUuZ2V0RGF5KCkpKTtcbiAgXG4gIHJldHVybiBkYXRlID49IHdlZWtTdGFydCAmJiBkYXRlIDw9IHdlZWtFbmQ7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1FZGl0SGFuZGxlcigpIHtcbiAgZGlzcGxheS50YXNrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBjb25zdCB0YXNrID0gdGFza01hbmFnZXIuYWN0aXZlVGFzaztcbiAgdGFzay5uYW1lID0gZGlzcGxheS50aXRsZUVkaXQudmFsdWU7XG4gIHRhc2suZGVzY3JpcHRpb24gPSBkaXNwbGF5LmRlc2NyaXB0aW9uRWRpdC52YWx1ZTtcbiAgdGFzay5kYXRlID0gZGlzcGxheS5kYXRlRWRpdC52YWx1ZTtcbiAgcmVmcmVzaFRhc2tMaXN0KHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrcyk7XG59XG5cbmZ1bmN0aW9uIGVkaXRUYXNrSGFuZGxlcih0YXNrKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkaXNwbGF5LnRhc2tPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgdGFza01hbmFnZXIuYWN0aXZlVGFzayA9IHRhc2s7XG4gICAgZGlzcGxheS50aXRsZUVkaXQudmFsdWUgPSB0YXNrLm5hbWU7XG4gICAgZGlzcGxheS5kZXNjcmlwdGlvbkVkaXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgIGlmKHRhc2suZHVlRGF0ZSAhPT0gJycpIHtcbiAgICAgIGRpc3BsYXkuZGF0ZUVkaXQudmFsdWUgPSB0YXNrLmR1ZURhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93VGFza3MobGlzdCkge1xuICB3aGlsZShkaXNwbGF5LnRhc2tMaXN0UGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBkaXNwbGF5LnRhc2tMaXN0UGFyZW50LnJlbW92ZUNoaWxkKGRpc3BsYXkudGFza0xpc3RQYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBmb3IoY29uc3QgdGFzayBvZiBsaXN0KSB7XG4gICAgdGFza01hbmFnZXIuYWN0aXZlVGFzayA9IHRhc2s7XG4gICAgaWYoaXNOYU4odGFzay5kdWVEYXRlLmdldERhdGUoKSkpIHtcbiAgICAgIHRhc2tMaXN0QWRkKGRpc3BsYXkudGFza0RpdkZhY3RvcnkodGFzay5uYW1lLCAnJywgbGlzdC5pbmRleE9mKHRhc2spLCBlZGl0VGFza0hhbmRsZXIodGFza01hbmFnZXIuYWN0aXZlVGFzaykpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza0xpc3RBZGQoZGlzcGxheS50YXNrRGl2RmFjdG9yeSh0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSwgbGlzdC5pbmRleE9mKHRhc2spLCBlZGl0VGFza0hhbmRsZXIodGFza01hbmFnZXIuYWN0aXZlVGFzaykpKTtcbiAgICB9XG4gIH1cblxuICBmb3IoY29uc3QgdGFzayBvZiBBcnJheS5mcm9tKGRpc3BsYXkudGFza0xpc3RQYXJlbnQuY2hpbGROb2RlcykpIHtcbiAgICBjb25zdCByZW1vdmUgPSB0YXNrLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1syXTtcbiAgICBjb25zdCBpbmRleCA9IHJlbW92ZS5kYXRhc2V0LmluZGV4O1xuICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QucmVtb3ZlVGFzayhwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm15VGFza3NbaW5kZXhdKTtcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hUYXNrTGlzdChuZXdMaXN0KSB7XG4gIHNob3dUYXNrcyhuZXdMaXN0KTtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKGxpc3QpIHtcbiAgd2hpbGUoZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5yZW1vdmVDaGlsZChkaXNwbGF5LnByb2plY3RMaXN0UGFyZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgZm9yKGNvbnN0IHByb2plY3Qgb2YgbGlzdCkge1xuICAgIHByb2plY3RMaXN0QWRkKGRpc3BsYXkucHJvamVjdERpdkZhY3RvcnkocHJvamVjdC5uYW1lLCBsaXN0LmluZGV4T2YocHJvamVjdCkpKTtcbiAgfVxuXG4gIGZvcihjb25zdCBwcm9qZWN0IG9mIEFycmF5LmZyb20oZGlzcGxheS5wcm9qZWN0TGlzdFBhcmVudC5jaGlsZE5vZGVzKSkge1xuICAgIGNvbnN0IHJlbW92ZSA9IHByb2plY3QuY2hpbGROb2Rlc1syXTtcbiAgICBjb25zdCBpbmRleCA9IHByb2plY3QuZGF0YXNldC5pbmRleDtcbiAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBwcm9qZWN0TWFuYWdlci5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0pO1xuICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIucHJvamVjdHNbaW5kZXhdO1xuICAgICAgcmVmcmVzaFRhc2tMaXN0KHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QubXlUYXNrcyk7XG4gICAgICBkaXNwbGF5LnNldExpc3RUaXRsZShwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm5hbWUpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhvb2tNZW51TGlzdGVuZXJzKCkge1xuICBkaXNwbGF5LmJ0bkFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZihkaXNwbGF5LmdldFRhc2tOYW1lKCkgIT09ICcnKSB7XG4gICAgICBjb25zdCBuYW1lID0gZGlzcGxheS5nZXRUYXNrTmFtZSgpO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkaXNwbGF5LmdldERlc2NyaXB0aW9uKCk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7ZGlzcGxheS5nZXREYXRlKCl9YCk7XG4gICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUsIHRhc2tNYW5hZ2VyLmN1cnJlbnRQcmlvcml0eSwgZmFsc2UpO1xuICAgICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzLnB1c2godGFzayk7XG4gICAgICByZWZyZXNoVGFza0xpc3QocHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdC5teVRhc2tzKTtcbiAgICAgIGRpc3BsYXkuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuQ29uZmlybVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYoZGlzcGxheS5nZXRQcm9qZWN0TmFtZSgpICE9PSAnJykge1xuICAgICAgY29uc3QgbmFtZSA9IGRpc3BsYXkuZ2V0UHJvamVjdE5hbWUoKTtcbiAgICAgIHByb2plY3RNYW5hZ2VyLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QobmFtZSkpO1xuICAgICAgcHJvamVjdE1hbmFnZXIuYWN0aXZlUHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLnByb2plY3RzW3Byb2plY3RNYW5hZ2VyLnByb2plY3RzLmxlbmd0aC0xXTtcbiAgICAgIHNob3dQcm9qZWN0cyhwcm9qZWN0TWFuYWdlci5wcm9qZWN0cyk7XG4gICAgICBkaXNwbGF5LnNldExpc3RUaXRsZShwcm9qZWN0TWFuYWdlci5hY3RpdmVQcm9qZWN0Lm5hbWUpO1xuICAgICAgZGlzcGxheS5pbnB1dENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICB9KTtcbiAgXG4gIGRpc3BsYXkuYnRuSW5ib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVmcmVzaFRhc2tMaXN0KGRlZmF1bHRQcm9qZWN0Lm15VGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnSU5CT1gnKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0blRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBnZXRBbGxUYXNrcygpLmZpbHRlcih0YXNrID0+IGlzVG9kYXkodGFzay5kdWVEYXRlKSk7XG4gICAgcmVmcmVzaFRhc2tMaXN0KHRvZGF5VGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnVE9EQVknKTtcbiAgfSk7XG4gIFxuICBkaXNwbGF5LmJ0bldlZWsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgd2Vla1Rhc2tzID0gZ2V0QWxsVGFza3MoKS5maWx0ZXIodGFzayA9PiBpc1RoaXNXZWVrKHRhc2suZHVlRGF0ZSkpO1xuICAgIHJlZnJlc2hUYXNrTGlzdCh3ZWVrVGFza3MpO1xuICAgIHByb2plY3RNYW5hZ2VyLmFjdGl2ZVByb2plY3QgPSBkZWZhdWx0UHJvamVjdDtcbiAgICBkaXNwbGF5LnNldExpc3RUaXRsZSgnVEhJUyBXRUVLJyk7XG4gIH0pO1xuXG4gIGRpc3BsYXkuYnRuTmV3VGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkaXNwbGF5LmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlzcGxheS5pbnB1dENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkNvbmZpcm1FZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybUVkaXRIYW5kbGVyKTtcblxuICBkaXNwbGF5LmJ0bkxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHkgPSAwO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bk1pZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0YXNrTWFuYWdlci5jdXJyZW50UHJpb3JpdHkgPSAxO1xuICB9KTtcblxuICBkaXNwbGF5LmJ0bkhpZ2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdGFza01hbmFnZXIuY3VycmVudFByaW9yaXR5ID0gMjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRBcHAoKSB7XG4gICAgaG9va01lbnVMaXN0ZW5lcnMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZEFwcDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5teVRhc2tzID0gW107XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKHZhbHVlKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG15VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215VGFza3M7XG4gIH1cblxuICBzZXQgbXlUYXNrcyhsaXN0KSB7XG4gICAgdGhpcy5fbXlUYXNrcyA9IGxpc3Q7XG4gIH1cblxuICBhZGRUYXNrKHRhc2spIHtcbiAgICB0aGlzLm15VGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0NvbXBsZXRlO1xuICB9XG5cbiAgc2V0IGlzQ29tcGxldGUoc3RhdHVzKSB7XG4gICAgdGhpcy5faXNDb21wbGV0ZSA9IHN0YXR1cztcbiAgfVxuXG4gIHJlbW92ZVRhc2sodGFzaykge1xuICAgIHRoaXMubXlUYXNrcy5zcGxpY2UodGhpcy5teVRhc2tzLmluZGV4T2YodGFzayksIDEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQsIHZpc2libGUgPSBmYWxzZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBcbiAgc2V0IG5hbWUobmV3TmFtZSkge1xuICAgIHRoaXMuX25hbWUgPSBuZXdOYW1lO1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gIH1cblxuICBnZXQgZHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZHVlRGF0ZTtcbiAgfVxuXG4gIHNldCBkdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLl9kdWVEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIGdldCBwcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XG4gIH1cblxuICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbiAgICB0aGlzLl9wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICB9XG5cbiAgZ2V0IGNvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGxldGVkO1xuICB9XG5cbiAgc2V0IGNvbXBsZXRlZChjb21wbGV0ZSkge1xuICAgIHRoaXMuX2NvbXBsZXRlZCA9IGNvbXBsZXRlO1xuICB9XG5cbiAgZ2V0IHZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBzZXQgdmlzaWJsZShtb2RlKSB7XG4gICAgdGhpcy5fdmlzaWJsZSA9IG1vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkQXBwIGZyb20gJy4vZXZlbnRDb250cm9sbGVyJztcblxubG9hZEFwcCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==