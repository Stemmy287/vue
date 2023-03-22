<template>
  <div v-if="posts.length">
    <h3>Список пользователей</h3>
    <transition-group name="post-list">
      <post-item v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)"/>
    </transition-group>
  </div>
  <div v-else>
    <h2 class="warn">Список пользователей пуст</h2>
  </div>
</template>

<script lang="ts">

import PostItem from "@/Components/PostItem.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.warn {
  color: mediumvioletred;
}

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s, ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.8s ease;
}

</style>