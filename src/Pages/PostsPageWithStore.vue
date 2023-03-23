<template>
  <div>
    <h1>Страница с постами</h1>
    <custom-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery"
                  placeholder="Поиск....."></custom-input>
    <div class="app_btns">
      <custom-button @click="showDialog">Создать пост</custom-button>
      <custom-select :model-value="selectedSort" @update:model-value="setSelectedSort"
                     :options="sortOptions"></custom-select>
    </div>
    <custom-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </custom-dialog>
    <post-list v-if="!isPostLoaded" :posts="sortedAndSearchPosts" @remove="removePost"/>
    <div v-else>Идет загрузка</div>
    <div v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostForm from "@/Components/PostForm";
import PostList from "@/Components/PostList";
import CustomDialog from "@/Components/UI/CustomDialog";
import CustomButton from "@/Components/UI/CustomButton";
import CustomSelect from "@/Components/UI/CustomSelect";
import CustomInput from "@/Components/UI/CustomInput";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    PostForm, PostList, CustomDialog, CustomButton, CustomSelect, CustomInput
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'posts/setPage',
      setSearchQuery: 'posts/setSearchQuery',
      setSelectedSort: 'posts/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
      loadMorePosts: 'posts/loadMorePosts'
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(ps => ps.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      isPostLoaded: state => state.posts.isPostLoaded,
      selectedSort: state => state.posts.selectedSort,
      searchQuery: state => state.posts.searchQuery,
      page: state => state.posts.page,
      limit: state => state.posts.limit,
      totalPages: state => state.posts.totalPages,
      sortOptions: state => state.posts.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'posts/sortedPosts',
      sortedAndSearchPosts: 'posts/sortedAndSearchPosts',
    })
  },
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

