<template>
  <div class="main-container">
    <AddTask/>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from './feature/ToDoList'
import AddTask from './feature/AddTask'
export default {
  name: 'App',
  components: {
    TodoList,
    AddTask,
  }
}
</script>

<style lang="scss" >
.main-container {
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 85vh;
  border: 1px solid #000;
  margin-top: 5vh;
}
</style>
