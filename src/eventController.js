/* eslint-disable no-restricted-syntax */

import DOM from './display';
import Task from './task';
import Project from './project';

const display = DOM();

const defaultProject = new Project('Default Project');

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
      const task = new Task(name, description, date, '', false);
      defaultProject.myTasks.push(task);
      display.showTasks(defaultProject.myTasks);
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      projectManager.projects.push(new Project(name));
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

export default loadApp;
