<template>
  <div>
    <custom-button>Like</custom-button>
        <h1>Страница с постами</h1>
        <custom-input v-focus v-model="searchQuery" placeholder="Поиск....."></custom-input>
        <div class="app_btns">
          <custom-button>Создать пост</custom-button>
          <custom-select v-model="selectedSort" :options="sortOptions"></custom-select>
        </div>
        <custom-dialog v-model:show="dialogVisible">
          <post-form/>
        </custom-dialog>
        <post-list v-if="!isPostLoaded" :posts="sortedAndSearchedPosts"/>
        <div v-else>Идет загрузка</div>
  </div>
</template>

<script>
import PostForm from "@/Components/PostForm";
import PostList from "@/Components/PostList";
import CustomDialog from "@/Components/UI/CustomDialog";
import CustomButton from "@/Components/UI/CustomButton";
import CustomSelect from "@/Components/UI/CustomSelect";
import CustomInput from "@/Components/UI/CustomInput";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm, PostList, CustomDialog, CustomButton, CustomSelect, CustomInput
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По Содержимому'}
      ]
    }
  },
  setup() {

    const {posts, isPostLoaded, totalPages} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {sortedAndSearchedPosts, searchQuery} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      isPostLoaded,
      totalPages,
      sortedPosts,
      selectedSort,
      sortedAndSearchedPosts,
      searchQuery
    }
  }
}
</script>

<style>

.input {
  margin-top: 15px;
}

.app_btns {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current_page {
  border: 2px solid teal;
}
</style>

