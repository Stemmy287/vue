import axios from "axios";

export const postsModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state: any) {
      return [...state.posts].sort((a, b) => a[state.selectedSort]?.localeCompare(b[state.selectedSort]))
    },
    sortedAndSearchPosts(state: any, getters: {sortedPosts: any[], sortedAndSearchPosts: any[]}) {
      return getters.sortedPosts.filter(ps => ps.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state: any, posts: any) {
      state.posts = posts
    },
    setIsPostLoaded(state: any, isPostLoaded: boolean) {
      state.isPostLoaded = isPostLoaded
    },
    setSelectedSort(state: any, selectedSort: string) {
      state.selectedSort= selectedSort
    },
    setSearchQuery(state: any, searchQuery: string) {
      state.searchQuery = searchQuery
    },
    setPage(state: any, page: number) {
      state.page = page
    },
    setTotalPages(state: any, totalPages: number) {
      state.totalPages = totalPages
    }
  },
  actions: {
    async fetchPosts({state, commit}: any) {
      commit('setIsPostLoaded', true)
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limit,
            _page: state.page
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', res.data)
      } catch (e) {
        alert('error')
      } finally {
        commit('setIsPostLoaded', false)
      }
    },
    async loadMorePosts({state, commit}: any) {
      try {
        commit('setPage', state.page + 1)
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: state.limit,
            _page: state.page
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...res.data])
      } catch (e) {
        alert('error')
      }
    }
  },
  namespaced: true
}