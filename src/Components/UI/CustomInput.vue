<template>
    <input :value="modelValue" @input="updateInput" class="input">
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: {currentTarget: {value: string}}) {
      this.$emit('update:modelValue', event.currentTarget.value)
    }
  }
})
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>