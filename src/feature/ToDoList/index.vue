<template>
  <div class="task-list-container">
    <h3 class="task-list-title">To Do List </h3>
    <input class='task-list-search' type="text" placeholder='Search...' v-model="searchTask" />
    <div class="divider" />
    <div class="task-list-items">
      <TaskComponentsVue  v-for="(task) in searchedProducts" :key="task.id" :task="task" :searchedProducts="searchedProducts" @checkTask="checkTask" />
    </div>
     <div class='task-list-footer' v-if="checkListTask && checkListTask.length >  0" >
        <div class='task-list-footer-content'>
          <p>Bulk Action:</p>
        </div>
        <div class='task-list-footer-action'>
          <div class="item-task-right-detail">
            <button>Done</button>
          </div>
          <div class="item-task-right-remove">
            <button @click="deleteTasks" >Remove</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { useStore } from '@/store.js'
import TaskComponentsVue from '@/components/TaskComponents.vue';
import { ref, computed } from 'vue';

export default {
  name: 'Todo-list',
  setup() {
    const store = useStore();
    store.syncWithLocalStorage()
    const searchTask = ref("")
    const checkListTask = ref([])
    const searchedProducts = computed(() => {
      if(searchTask.value){
        return store.getTasks.filter((product) => {
        return (
          product.title
            .toLowerCase()
            .indexOf(searchTask.value.toLowerCase()) != -1
        );
      });
      }else {
        return store.getTasks
      }

});
    return {
      store,
      searchTask,
      searchedProducts,
      checkListTask
    }
  },
  components: {
    TaskComponentsVue
  },
  methods: {
    checkTask(e){
      if(this.checkListTask.includes(e)){
        const checkIndex = this.checkListTask.findIndex((val) => val === e  )
        this.checkListTask.splice(checkIndex, 1)
      }else{
        this.checkListTask.push(e)
      }
    },
    deleteTasks() {
      this.store.deleteMultiTasks(this.checkListTask)
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
