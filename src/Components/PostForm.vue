<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <custom-input placeholder="Название" type="text" v-model.trim="post.title"/>
    <custom-input placeholder="Описание" type="text" v-model.trim="post.body"/>
    <custom-button @click="createPost">Создание</custom-button>
  </form>
</template>

<script lang="ts">
import CustomButton from "@/Components/UI/CustomButton.vue";
import CustomInput from "@/Components/UI/CustomInput.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {CustomButton, CustomInput},
  data() {
    return {
      post: {
        title: '',
        body: ''
      } as {id?: number, title: string, body: string}
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input {
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>