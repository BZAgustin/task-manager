import { format, isToday, isThisWeek } from 'date-fns';
import DOM from './display';
import Task from './task';
import Project from './project';

const display = DOM();
const defaultProject = new Project('Default Project');

function plugListeners() {
  display.btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    if(display.getTaskName() !== '') {
      const name = display.getTaskName();
      const description = display.getDescription();
      const date = display.getDate();
      const task = new Task(name, description, date, '', false);
      defaultProject.myTasks.push(task);
      display.showTasks(defaultProject.myTasks);
    }
  });
  
  display.btnConfirmProject.addEventListener('click', () => {
    if(display.getProjectName() !== '') {
      const name = display.getProjectName();
      const project = new Project(name);
      Project.myProjects.push(project);
      display.showProjects(Project.myProjects);
    }
  });
}

function loadApp() {
  plugListeners();
}

export default loadApp;
