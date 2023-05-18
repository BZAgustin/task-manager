class Project {
  constructor() {
    this.myTasks = [];
    this.isComplete = false;
  }

  static myProjects = [];

  get tasks() {
    return this.myTasks;
  }

  addTask(task) {
    this.myTasks.push(task);
  }

  get complete() {
    return this.isComplete;
  }

  set complete(status) {
    this.isComplete = status;
  }
}

export default Project;