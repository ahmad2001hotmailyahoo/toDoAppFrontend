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
  await axios.get(`http://localhost:5001/ToDoList?status=${status}`)
  .then( (res) => {
    toDoList.value = res.data.data;
  }).catch( (err) => {
    console.log(err)
  })
}

const createTodo = async () => {
  if( toDo.value != '' && toDo.value != undefined ) {
    await axios.post('http://localhost:5001/ToDoList',{
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
  await axios.delete(`http://localhost:5001/ToDoListByStatus/${status}`)
  .then( async (res) => {
    console.log(res)
    await getTodos(statusSearch.value)
  }).catch( (err) => {
    console.log(err)
  })
}


const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:5001/ToDoList/${id}`)
  .then( async (res) => {
    console.log(res)
    await getTodos(statusSearch.value)
  }).catch( (err) => {
    console.log(err)
  })
}

const updateStatus = async (item) => {
  item.status == 'Active' ? item.status = 'Completed' : item.status = 'Active'
  await axios.put(`http://localhost:5001/ToDoList/${item.id}`, {
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

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bellefair&family=Josefin+Sans&family=Manrope:wght@800&family=Outfit:wght@300;400;600&family=Rubik:wght@300;400;500&display=swap');

$Bright_Blue: hsl(220, 98%, 61%);
$Very_Light_Gray: hsl(0, 0%, 98%);
$Very_Light_Grayish_Blue: hsl(236, 33%, 92%);
$Light_Grayish_Blue: hsl(233, 11%, 84%);
$Dark_Grayish_Blue: hsl(236, 9%, 61%);
$Very_Dark_Grayish_Blue: hsl(235, 19%, 35%);

$Very_Dark_Blue: hsl(235, 21%, 11%); 
$Very_Dark_Desaturated_Blue: hsl(235, 24%, 19%);
$Light_Grayish_Blue: hsl(234, 39%, 85%);
$Light_Grayish_Blue : hsl(236, 33%, 92%);
$Dark_Grayish_Blue: hsl(234, 11%, 52%);
$Very_Dark_Grayish_Blue: hsl(233, 14%, 35%);
$Very_Dark_Grayish_Blue: hsl(237, 14%, 26%);

.bg-color{
  background-color: $Bright_Blue;
}

.blue-color-text{
  color: $Bright_Blue
}
.main {
  height: 100%;
  width: 100%;
  font-family: 'Josefin Sans', sans-serif;
}

.darkMode{
  background: url('./assets/images/bg-desktop-dark.jpg');
  background-color: $Very_Dark_Blue;
  background-repeat: no-repeat;
  background-size: 100% 300px;
}
.lightMode{
  background: url('./assets/images/bg-desktop-light.jpg');  
  background-color: $Light_Grayish_Blue;
  background-repeat: no-repeat;
  background-size: 100% 300px;
}

.article {
  width: 40%;
  margin: auto;
  padding-top: 1px;

  @media only screen and (max-width: 700px) {
    width: 90%;
  }
}

.header {
  color: $Very_Light_Grayish_Blue;
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 99px;

}

.app-input {
  margin-top: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 5px 0;
  width:100%;
  
}

.app-input-field {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  border: none;
  outline: none;
  display: block;
  padding: 10px 10px;
  margin-top: 6px;
  margin-left: 4px;
  outline-color: transparent;
  width: 70%;
}

.circle {
  margin-left: 4px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 20px;
  border: 1px solid $Light_Grayish_Blue;
  text-align: center;
}

.todoListCard {
  max-height: 300px;
  margin-top: 20px;
  background: white;
  overflow: auto;

  .footerCard {
    color: $Dark_Grayish_Blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-left: 14px;
    min-height: 30px;
  }
}

.todoListItem{
  border-bottom: 0.1px solid $Very_Dark_Grayish_Blue;
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 30px;
  
  .title{
    padding-top: 5px;
    padding-left: 5px;
    overflow: auto;
    margin-right: 2px;
  }

  .delete{
    padding-top: 5px;
    margin-left: auto;
    cursor: pointer;
  }
}

.filter{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height: 25px;
  background-color: white;

  .filterOptions{
    width: 60%;
    display: flex;
    justify-content: space-evenly;
    color: $Dark_Grayish_Blue;
  }
}

.todoListCard-darkMode {
  background: $Very_Dark_Desaturated_Blue;
  color: white;
}

.m-16 {
  margin-left: 16px;
}

.pointer{
    cursor: pointer;
}
</style>
