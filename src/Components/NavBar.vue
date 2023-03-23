<template>
  <div class="navBar">
    <div @click="$router.push('/')" class="logo">Vue 3</div>
    <div class="navBar_btns">
      <custom-button @click="$router.push('/posts')">Посты</custom-button>
      <custom-button @click="$router.push('/about')">О приложении</custom-button>
      <custom-button @click="$router.push('/store')">Посты со стором</custom-button>
      <custom-button @click="$router.push('/composition')">Посты с Composition Api</custom-button>
    </div>
  </div>
</template>

<script lang="ts">
import CustomButton from "@/Components/UI/CustomButton.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {CustomButton}

})
</script>

<style scoped>
.navBar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.logo {
    cursor: pointer;
}

.navBar_btns {
  margin-left: auto;
}

.btn {
  margin-left: 20px;
}
</style>