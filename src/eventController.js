/* eslint-disable no-underscore-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import DOM from './display';
import Task from './task';
import Project from './project';
import { saveProjects, loadProjects, loadDefaultProject } from './appStorage';

const display = DOM();

const defaultProject = new Project('INBOX');

const projectManager = {
  projects: [],
  activeProject: defaultProject
}

const taskManager = {
  activeTask: undefined,
  currentPriority: 0
}

function retrieveTask(task) {
  return new Task(task._name, task._description, new Date(task._dueDate), task._priority, task._completed);
}

function retrieveProject(project) {
  return new Project(project._name);
}

if("projects" in localStorage) {
  const storageTasks = loadDefaultProject()._myTasks;
  for(const task of storageTasks) {
    defaultProject.myTasks.push(retrieveTask(task));
  }

  const storageProjects = loadProjects();
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
    const task = new Task(name, description, date, taskManager.currentPriority, false);
    projectManager.activeProject.myTasks.push(task);
    refreshTaskList(projectManager.activeProject.myTasks);
    display.container.style.display = 'none';
    display.clearFields();
    saveProjects(projectManager.projects, defaultProject);
  }
}

function confirmEditHandler() {
  display.taskOverlay.style.display = 'none';
  const task = taskManager.activeTask;
  task.name = display.titleEdit.value;
  task.description = display.descriptionEdit.value;
  task.date = display.dateEdit.value;
  refreshTaskList(projectManager.activeProject.myTasks);
  saveProjects(projectManager.projects, defaultProject);
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
    saveProjects(projectManager.projects, defaultProject);
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
    projectManager.projects.push(new Project(name));
    projectManager.activeProject = projectManager.projects[projectManager.projects.length-1];
    showProjects(projectManager.projects);
    display.setListTitle(projectManager.activeProject.name);
    display.inputContainer.style.display = '';
    display.projectNameInput.value = '';
    saveProjects(projectManager.projects, defaultProject);
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

      saveProjects(projectManager.projects, defaultProject);
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

export default loadApp;
