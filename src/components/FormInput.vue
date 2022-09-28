<template>
  <div class="new-task-form">
    <input type="text" name="title" v-model="task.title" placeholder="Add new task..." />
    <p class='error' v-if='titleValid'>Title task is required</p>
    <div class="divider"></div>
    <div class="item-description">
      <label class="item-label">Description</label>
      <textarea name="description" v-model="task.description" />
    </div>
    <div class="divider"></div>
    <div class="contents">
      <div class="content-item">
        <div class="item-label">
          <label>Due date</label>
        </div>
        <div class="item-control">
          <Datepicker class="dateView" name="dueDate" :minDate="new Date()" v-model="task.date" :format="format"/>
        </div>
      </div>
      <div class="content-item">
        <div class="item-label">
          <label>Priority</label>
        </div>
        <div class="item-control">
          <select name="priority" v-model="task.priority">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
    <button v-if="!taskDetail" class="item-submit" type="submit" @click=' createTask'> Add</button>
    <button v-else class="item-submit" type="submit" @click=' updateTask'> Update</button>

  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useStore } from '../store';
import { ref } from 'vue';


export default {
  name: "FormInput",
  components: {
    Datepicker,
  },
  setup() {
    const store = useStore();
    const titleValid = ref(false)
    const task = ref({
      title: '',
      description: '',
      priority: 'normal',
      date: new Date()
    })
    const format = 'dd/MM/yyy'
    return {
      task,
      format,
      store,
      titleValid
    }
  },

  props: {
    taskDetail: Object
  },
  mounted() {
    if (this.taskDetail) {
      this.task.id = this.taskDetail.id
      this.task.title = this.taskDetail.title
      this.task.description = this.taskDetail.description
      this.task.date = this.taskDetail.date
      this.task.priority = this.taskDetail.priority
    }
  },
  methods: {
    createTask() {
      if(this.task.title === '') {
        this.titleValid = true
        return
      }else{
        this.titleValid = false
        this.store.createTask(this.task.title, this.task.description, this.task.date, this.task.priority)
      }
    },
    updateTask() {
      this.store.updateTask(this.task)
    }
  }
};

</script>

<style>

</style>
