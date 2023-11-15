<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <input 
    :type="type?type:'text'" 
    class="app-input-field"
   	:class="mode?'todoListCard-darkMode':''"
    :placeholder="placeholder" 
    :value="modelValue"
    @input="$emit('update:modelValue',$event.target.value)"
  />
</template>
<script setup>
defineProps({
  modelValue: String,
	type:String,
  placeholder:String,
  mode:String
})
</script>
