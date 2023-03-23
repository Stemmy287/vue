<template>
  <div class="post">
    <div>
      <div><strong>likes: </strong> {{$store.state.likes}}</div>
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
    <div class="post_btns">
      <custom-button class="btn" @click="$router.push(`post/${post.id}`)">Открыть</custom-button>
      <custom-button class="btn" @click="$emit('remove', post)">Удалить</custom-button>
    </div>
  </div>
</template>

<script lang="ts">
import CustomButton from "@/Components/UI/CustomButton.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    CustomButton
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  }
})

</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn {
  color: mediumvioletred;
  border: 1px solid mediumvioletred;
}

.post_btns {
  display: flex;
}
</style>