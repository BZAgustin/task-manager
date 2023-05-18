/* eslint-disable max-classes-per-file */
import { DOM, taskFactory} from './display';

const display = DOM();

const taskOne = taskFactory('name', 'date', '1');
const taskTwo = taskFactory('name', new Date('12/03/1994'), '2');

display.taskListAdd(taskOne);
display.taskListAdd(taskTwo);
