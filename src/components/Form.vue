<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form
    class="app-input"
    :class="darkMode ? 'todoListCard-darkMode' : ''"
    @submit.prevent="$emit('create')"
  >
    <div v-if="addFormData[0].checkbox" class="circle m-16" @click="$emit('toggleStatus')" :class="status ? 'bg-color' : ''">
      <svg
        v-if="status"
        style="margin-top: 5.5px"
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="9"
      >
        <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
      </svg>
    </div>
    <InputField v-model="toDo" type="text" :mode="darkMode" placeholder="Create a new todo" />
  </form>
</template>
<script setup>
defineProps({
  addFormData: Array,
  darkMode: Boolean,
  add: Function,
  toggleStatus: Function
})
</script>
