import './assets/main.css'
import FilterStatus from './components/FilterStatus.vue'
import Input from './components/Input.vue'
import Form from './components/Form.vue'
import ToDoCard from './components/ToDoCard.vue'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
app.component('FilterStatus', FilterStatus)
app.component('InputField', Input)
app.component('AppForm', Form)
app.component('ToDoCard', ToDoCard)
app.mount('#app')
