/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
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
      const task = new Task(name, description, date, taskManager.currentPriority, false);
      projectManager.activeProject.myTasks.push(task);
      refreshTaskList(projectManager.activeProject.myTasks);
      display.container.style.display = 'none';
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new Project(name));
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

export default loadApp;
