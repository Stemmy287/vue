<template>
  <div>
    <h1>Страница с постами</h1>
    <custom-input v-focus v-model="searchQuery" placeholder="Поиск....."></custom-input>
    <div class="app_btns">
      <custom-button @click="showDialog">Создать пост</custom-button>
      <custom-select v-model="selectedSort" :options="sortOptions"></custom-select>
    </div>
    <custom-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </custom-dialog>
    <post-list v-if="!isPostLoaded" :posts="sortedAndSearchPosts" @remove="removePost"/>
    <div v-else>Идет загрузка</div>
    <div v-intersection="loadMorePosts"></div>
    <!--<div class="page_wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)" class="page"
             :class="{'current_page': pageNumber === page}">{{ pageNumber }}
        </div>
      </div>-->
  </div>
</template>

<script>
import PostForm from "@/Components/PostForm";
import PostList from "@/Components/PostList";
import CustomDialog from "@/Components/UI/CustomDialog";
import CustomButton from "@/Components/UI/CustomButton";
import CustomSelect from "@/Components/UI/CustomSelect";
import CustomInput from "@/Components/UI/CustomInput";
import axios from "axios";

export default {
  components: {
    PostForm, PostList, CustomDialog, CustomButton, CustomSelect, CustomInput
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoaded: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По Содержимому'}
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(ps => ps.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      this.isPostLoaded = true
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = res.data
      } catch (e) {
        alert('error')
      } finally {
        this.isPostLoaded = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...res.data]
      } catch (e) {
        alert('error')
      }
    }
    /*changePage(pageNumber) {
      this.page = pageNumber
    }*/
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(ps => ps.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    /*page() {
      this.fetchPosts()
    }*/
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

