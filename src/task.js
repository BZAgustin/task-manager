/* eslint-disable no-underscore-dangle */
class Task {
  constructor(name, description, dueDate, priority, completed = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
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
}

export default Task;