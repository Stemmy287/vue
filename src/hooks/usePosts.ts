import axios from "axios";
import {onMounted, ref} from "vue";

export const usePosts = (limit: number) => {

  const posts = ref([])
  const totalPages = ref(0)
  const isPostLoaded = ref(true)
  const fetching = async () => {

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _limit: limit,
          _page: 1
        }
      })
      totalPages.value = Math.ceil(res.headers['x-total-count'] / limit)
      posts.value = res.data
    } catch (e) {
      alert('error')
    } finally {
      isPostLoaded.value = false
    }

  }

  onMounted(fetching)

  return {
    posts, isPostLoaded, totalPages
  }

}