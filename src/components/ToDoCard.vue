<template>
  <div class="todoListCard" :class="darkMode ? 'todoListCard-darkMode' : ''">
    <div class="todoListItem" v-for="item in toDoList" :key="item.id">
      <div
        class="circle"
        :class="item.status == 'Completed' ? 'bg-color' : ''"
        @click="$emit('updateStatus',item)"
      >
        <svg
          v-if="item.status == 'Completed'"
          style="margin-top: 5.5px"
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="9"
        >
          <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
        </svg>
      </div>
      <div class="title">
        <del v-if="item.status == 'Completed'">
          {{ item.description }}
        </del>
        <span v-else>
          {{ item.description }}
        </span>
      </div>
      <div class="delete" @click="$emit('delete',item.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </div>
    </div>

    <div class="footerCard">
      <span class="listCount">{{ toDoList?.length }} item left</span>
      <span class="clear pointer" @click="$emit('deleteTodoByStatus','Completed')">Clear Completed</span>
    </div>
  </div>
</template>
<script setup>
defineProps({
	darkMode: Boolean,
  toDoList: Array,
  updateStatus: Function,
  delete: Function,
	deleteTodoByStatus:Function
})

</script>
