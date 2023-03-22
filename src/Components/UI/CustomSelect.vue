<template>
  <select @change="changeOption">
    <option disabled value="">Выберете из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value"  >{{option.name}}</option>
  </select>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  },
})
</script>

<style scoped>

</style>