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
/* harmony export */   "DOM": () => (/* binding */ DOM),
/* harmony export */   "taskFactory": () => (/* binding */ taskFactory)
/* harmony export */ });
const DOM = () => {
  // Sidebar
  const btnInbox = document.getElementById('btn-inbox');
  const btnToday = document.getElementById('btn-today');
  const btnWeek = document.getElementById('btn-week');
  const btnAddProject = document.getElementById('btn-add-project');

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

  // Methods
  function getTitle() {
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

  return { btnInbox, btnToday, btnWeek, btnAddProject, btnNewTask, 
           btnLow, btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, 
           getTitle, getDescription, getDate, taskListAdd, projectListAdd }
};

const taskFactory = (name, dueDate, taskId) => {
    const task = document.createElement('div');
    task.classList.add('task');

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task-checkbox';
    const label = document.createElement('label');
    label.id = `task-${taskId}`;
    label.innerHTML = name;

    leftSection.appendChild(checkbox);
    leftSection.appendChild(label);

    const date = document.createElement('input');
    date.type = 'date';
    date.value = dueDate;

    const edit = document.createElement('img');
    edit.alt = 'X';

    rightSection.appendChild(date);
    rightSection.appendChild(edit);

    task.appendChild(leftSection);
    task.appendChild(rightSection);

    return task;
};



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
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* eslint-disable max-classes-per-file */


const display = (0,_display__WEBPACK_IMPORTED_MODULE_0__.DOM)();

const taskOne = (0,_display__WEBPACK_IMPORTED_MODULE_0__.taskFactory)('name', 'date', '1');
const taskTwo = (0,_display__WEBPACK_IMPORTED_MODULE_0__.taskFactory)('name', new Date('12/03/1994'), '2');

display.taskListAdd(taskOne);
display.taskListAdd(taskTwo);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztVQ2xGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDNEM7O0FBRTVDLGdCQUFnQiw2Q0FBRzs7QUFFbkIsZ0JBQWdCLHFEQUFXO0FBQzNCLGdCQUFnQixxREFBVzs7QUFFM0I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKSA9PiB7XG4gIC8vIFNpZGViYXJcbiAgY29uc3QgYnRuSW5ib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWluYm94Jyk7XG4gIGNvbnN0IGJ0blRvZGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi10b2RheScpO1xuICBjb25zdCBidG5XZWVrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi13ZWVrJyk7XG4gIGNvbnN0IGJ0bkFkZFByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWFkZC1wcm9qZWN0Jyk7XG5cbiAgLy8gVGFzayBMaXN0XG4gIGNvbnN0IGJ0bk5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy10YXNrJyk7XG5cbiAgLy8gQ3JlYXRlIFRhc2sgRm9ybVxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1pbnB1dCcpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbi1pbnB1dCcpO1xuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtaW5wdXQnKTtcbiAgY29uc3QgYnRuTG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1sb3cnKTtcbiAgY29uc3QgYnRuTWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1taWQnKTtcbiAgY29uc3QgYnRuSGlnaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4taGlnaCcpO1xuICBjb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1hZGQtdGFzaycpO1xuXG4gIC8vIFBhcmVudCBOb2Rlc1xuICBjb25zdCBwcm9qZWN0TGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgY29uc3QgdGFza0xpc3RQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1saXN0Jyk7XG5cbiAgLy8gTWV0aG9kc1xuICBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGl0bGUudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb24udmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIHJldHVybiBkYXRlLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFza0xpc3RBZGQodGFzaykge1xuICAgIHRhc2tMaXN0UGFyZW50LmFwcGVuZENoaWxkKHRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdExpc3RBZGQocHJvamVjdCkge1xuICAgIHByb2plY3RMaXN0UGFyZW50LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICB9XG5cbiAgcmV0dXJuIHsgYnRuSW5ib3gsIGJ0blRvZGF5LCBidG5XZWVrLCBidG5BZGRQcm9qZWN0LCBidG5OZXdUYXNrLCBcbiAgICAgICAgICAgYnRuTG93LCBidG5NaWQsIGJ0bkhpZ2gsIGJ0bkFkZFRhc2ssIHByb2plY3RMaXN0UGFyZW50LCB0YXNrTGlzdFBhcmVudCwgXG4gICAgICAgICAgIGdldFRpdGxlLCBnZXREZXNjcmlwdGlvbiwgZ2V0RGF0ZSwgdGFza0xpc3RBZGQsIHByb2plY3RMaXN0QWRkIH1cbn07XG5cbmNvbnN0IHRhc2tGYWN0b3J5ID0gKG5hbWUsIGR1ZURhdGUsIHRhc2tJZCkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcblxuICAgIGNvbnN0IGxlZnRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcmlnaHRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnbGVmdC1zZWN0aW9uJyk7XG4gICAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LXNlY3Rpb24nKTtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICBjaGVja2JveC5pZCA9ICd0YXNrLWNoZWNrYm94JztcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWwuaWQgPSBgdGFzay0ke3Rhc2tJZH1gO1xuICAgIGxhYmVsLmlubmVySFRNTCA9IG5hbWU7XG5cbiAgICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgbGVmdFNlY3Rpb24uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUudmFsdWUgPSBkdWVEYXRlO1xuXG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXQuYWx0ID0gJ1gnO1xuXG4gICAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKGRhdGUpO1xuICAgIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChlZGl0KTtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcblxuICAgIHJldHVybiB0YXNrO1xufTtcblxuZXhwb3J0IHsgRE9NLCB0YXNrRmFjdG9yeSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbmltcG9ydCB7IERPTSwgdGFza0ZhY3Rvcnl9IGZyb20gJy4vZGlzcGxheSc7XG5cbmNvbnN0IGRpc3BsYXkgPSBET00oKTtcblxuY29uc3QgdGFza09uZSA9IHRhc2tGYWN0b3J5KCduYW1lJywgJ2RhdGUnLCAnMScpO1xuY29uc3QgdGFza1R3byA9IHRhc2tGYWN0b3J5KCduYW1lJywgbmV3IERhdGUoJzEyLzAzLzE5OTQnKSwgJzInKTtcblxuZGlzcGxheS50YXNrTGlzdEFkZCh0YXNrT25lKTtcbmRpc3BsYXkudGFza0xpc3RBZGQodGFza1R3byk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=