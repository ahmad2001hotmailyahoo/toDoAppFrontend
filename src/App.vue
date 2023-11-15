<template>
  <main 
    :class="darkMode?'darkMode':'lightMode'"
    class="main"
  >
    <article class="article">
      <div class="header">
        <span class="head">TODO</span>
        <span class="theme-switch" @click="darkMode=!darkMode">
          <svg v-if="!darkMode" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
        </span>        
      </div>

      <form 
        class="app-input"
        :class="darkMode?'todoListCard-darkMode':''"
        @submit.prevent="createTodo()"
      >
        <div 
          class="circle m-16"
          @click="toggleStatus()"
          :class="status ? 'bg-color' : ''"
        >
        <svg v-if="status" style="margin-top: 5.5px;" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
        </div>
        <input 
          type="text" 
          class="app-input-field"
          :class="darkMode?'todoListCard-darkMode':''"
          placeholder="Create a new todo" 
          v-model="toDo"
        />
      </form>

      <div 
        class="todoListCard" 
        :class="darkMode?'todoListCard-darkMode':''"
      >
        <div class="todoListItem" v-for="item in toDoList" :key="item.id">
          <div class="circle" :class="item.status == 'Completed'?'bg-color':''" @click="updateStatus(item)">
            <svg v-if="item.status == 'Completed'" style="margin-top: 5.5px;" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
          </div>
          <div class="title">
            <del v-if="item.status == 'Completed'">
              {{ item.description }}
            </del>
            <span v-else>
              {{ item.description }}
            </span>
          </div>
            <div class="delete" @click="deleteTodo(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
            </svg>
          </div>
        </div>

        <div class="footerCard">
          <span class="listCount">{{ toDoList?.length }} item left</span>
          <span class="clear pointer" @click="deleteTodoByStatus('Completed')">Clear Completed</span>
        </div>
      </div>
      <div 
        class="filter"
        :class="darkMode?'todoListCard-darkMode':''"
      >
          <div class="filterOptions">
            <span class="pointer" :class="statusSearch == 'All' ? 'blue-color-text' : ''" @click="getTodos('All')">All</span>
            <span class="pointer" :class="statusSearch == 'Active' ? 'blue-color-text' : ''" @click="getTodos('Active')">Active</span>
            <span class="pointer" :class="statusSearch == 'Completed' ? 'blue-color-text' : ''" @click="getTodos('Completed')">Completed</span>
          </div>
        </div>
    </article>
  </main>
</template>

<script setup>
import { ref, onBeforeMount  } from 'vue'
import axios from 'axios'

let darkMode = ref(false)
let toDo = ref()
let toDoList = ref([])
let status = ref(false)
let statusSearch = ref('All')

const toggleStatus = () => {
  status.value = status.value ? false : true 
}

const getTodos = async (status) => {
  statusSearch.value = status
  await axios.get(`https://to-do-app-backend-seven.vercel.app/ToDoList?status=${status}`)
  .then( (res) => {
    toDoList.value = res.data.data;
  }).catch( (err) => {
    console.log(err)
  })
}

const createTodo = async () => {
  if( toDo.value != '' && toDo.value != undefined ) {
    await axios.post('https://to-do-app-backend-seven.vercel.app/ToDoList',{
      description: toDo.value,
      status:status.value?"Completed":"Active"
    })
    .then( async (res) => {
      console.log(res)
      await getTodos(statusSearch.value)
    }).catch( (err) => {
      console.log(err)
    })
  }
}

const deleteTodoByStatus = async (status) => {
  await axios.delete(`https://to-do-app-backend-seven.vercel.app/ToDoListByStatus/${status}`)
  .then( async (res) => {
    console.log(res)
    await getTodos(statusSearch.value)
  }).catch( (err) => {
    console.log(err)
  })
}


const deleteTodo = async (id) => {
  await axios.delete(`https://to-do-app-backend-seven.vercel.app/ToDoList/${id}`)
  .then( async (res) => {
    console.log(res)
    await getTodos(statusSearch.value)
  }).catch( (err) => {
    console.log(err)
  })
}

const updateStatus = async (item) => {
  item.status == 'Active' ? item.status = 'Completed' : item.status = 'Active'
  await axios.put(`https://to-do-app-backend-seven.vercel.app/ToDoList/${item.id}`, {
    ...item
  })
  .then( async (res) => {
    console.log(res)
    await getTodos(statusSearch.value)
  }).catch( (err) => {
    console.log(err)
  })
}


// eslint-disable-next-line no-undef
onBeforeMount(async ()=>{
  await getTodos('All')
})

</script>

<style lang="scss" src="./assets/style/main.scss" scoped>
</style>
