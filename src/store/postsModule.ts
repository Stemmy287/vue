import axios from "axios";

export const postsModule = {
  state: (): PostsStateType => ({
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
    sortedPosts(state: PostsStateType) {
      return [...state.posts].sort((a, b) => a[state.selectedSort as keyof typeof a]?.localeCompare(b[state.selectedSort as keyof typeof b]))
    },
    sortedAndSearchPosts(state: PostsStateType, getters: { sortedPosts: PostType[], sortedAndSearchPosts: PostType[] }) {
      return getters.sortedPosts.filter(ps => ps.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state: PostsStateType, posts: PostType[]) {
      state.posts = posts
    },
    setIsPostLoaded(state: PostsStateType, isPostLoaded: boolean) {
      state.isPostLoaded = isPostLoaded
    },
    setSelectedSort(state: PostsStateType, selectedSort: string) {
      state.selectedSort = selectedSort
    },
    setSearchQuery(state: PostsStateType, searchQuery: string) {
      state.searchQuery = searchQuery
    },
    setPage(state: PostsStateType, page: number) {
      state.page = page
    },
    setTotalPages(state: PostsStateType, totalPages: number) {
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

//types
export type PostsStateType = {
  posts: PostType[],
  isPostLoaded: boolean
  selectedSort: string
  searchQuery: string
  page: number
  limit: number,
  totalPages: number
  sortOptions: SortOptionType[]
}

export type PostType = {
  id: string
  title: string
  body: string
}

export type SortOptionType = {
  value: string
  name: string
}