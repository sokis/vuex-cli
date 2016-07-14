<template>
  <div :class="['v-<%= dashesEntityName%>', class]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-<%= dashesEntityName %>',
  props: {
    class: {
      type: String,
      default: ''
    }
  }
}
</script>

<style src="styles/components/<%= dashesEntityName %>"></style>