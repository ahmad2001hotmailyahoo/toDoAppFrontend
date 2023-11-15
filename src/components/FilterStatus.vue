<template>
  <div class="filterOptions">
    <span
      class="pointer"
      :class="param == modelValue ? 'blue-color-text' : ''"
      @click="$emit('update:modelValue', param)"
      >{{ param }}</span
    >
  </div>
</template>
<script setup>
defineProps({
	modelValue: String,
	param: String
})
</script>
