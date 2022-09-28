<template>
  <div class="new-task-container">
    <h3 class="new-task-title">New tasks</h3>
    <FormInput/>
  </div>
</template>

<script>
import FormInput from '../../components/FormInput.vue'
export default {
  name: 'Add-task',
  components : {
    FormInput
  }
}
</script>

<style lang="scss">
   @import './style.scss'; 
</style>
