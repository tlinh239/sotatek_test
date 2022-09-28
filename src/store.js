import { defineStore } from 'pinia';
import Task from './entities/Task';

export const useStore = defineStore('store', {

    // State values
    state: () => ({
        tasks: [],
        nextTaskID: 1,
    }),

    getters: {

        // Getting all tasks sort date
        getTasks: (state) => {
            return state.tasks.sort((a, b) => new Date(a.date) - new Date(b.date))
        } ,

    },
        // Methods
        actions: {

            // Get values from local saved data every app refresh
            syncWithLocalStorage() {
                if(localStorage.getItem('tasks')) {
                    this.tasks = JSON.parse(localStorage.getItem('tasks'));
                }
                if(localStorage.getItem('nextTaskID')) {
                    this.nextTaskID = JSON.parse(localStorage.getItem('nextTaskID'));
                }
            },
    
            // Saving new task
            createTask(title, description, date, priority) {
                this.tasks.push(new Task(this.nextTaskID, title, description, date, priority));
                this.nextTaskID++;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                localStorage.setItem('nextTaskID', JSON.stringify(this.nextTaskID));
            },
    
            // Update task by ID
            updateTask(data) {
                let index = this.tasks.findIndex(task => {
                    return task.id == data.id;
                })
                if(index != -1) {
                    this.tasks[index] = data;
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            },
    
            // Deleting task from list
            deleteTask(id) {
                let index = this.tasks.findIndex(task => {
                    return task.id == id;
                })
                if(index != -1) {
                    this.tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            },
            deleteMultiTasks(ids) {
                const itemRemove =  this.tasks.filter(task => { console.log(task, ids);return !ids.includes(task.id.toString())})
                if(itemRemove ){
                    this.tasks = itemRemove
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        }
})