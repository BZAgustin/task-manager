/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import DOM from './display';
import Task from './task';
import Project from './project';

const display = DOM();

const defaultProject = new Project('Default');

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
      const task = new Task(name, description, date, taskManager.currentPriority, false);
      defaultProject.myTasks.push(task);
      refreshTaskList(defaultProject.myTasks);
      display.container.style.display = 'none';
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new Project(name));
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

export default loadApp;
