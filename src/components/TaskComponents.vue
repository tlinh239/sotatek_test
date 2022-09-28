<template>
  <div >
    <div class="item-task-container" >
      <div class="item-task-left">
        <input :value="task.id" type="checkbox" class="item-task-left-checkbox" @change="listCheckedTask($event)"  />
        <p class="item-task-left-title">{{task.title}}</p>
      </div>
      <div class="item-task-right">
        <div class="item-task-right-detail">
          <button @click="taskDetail = !taskDetail">Detail </button>
        </div>
        <div class="item-task-right-remove">
          <button @click="removeTask()">Remove</button>
        </div>
      </div>
    </div>
    <FormInputVue v-show="taskDetail" :taskDetail="task" class="task-list-items-detail" />
  </div>
</template>

<script>
import FormInputVue from "./FormInput.vue";
import { useStore } from '../store';
import { ref} from 'vue';

export default {
  name: "task-component",
  components: {
    FormInputVue,
  },
  data: function() {
    return {
    listChecked1 : []
  };
},
  props: {
     task:{
      type: Object,
     } ,
  },
  setup() {
    const store = useStore();
    const taskDetail = ref(false);
    return {
      store,
      taskDetail,
    }
  },

  methods: {
    removeTask() {
      this.store.deleteTask(this.task.id)
    },
    listCheckedTask(e){
      this.$emit('checkTask', e.target.value)
    }
  },
};
</script>

<style>

</style>
