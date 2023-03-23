import {computed, Ref, ref} from "vue";
import {PostType} from "@/store/postsModule";

export const useSortedAndSearchedPosts = (sortedPosts: Ref<PostType[]>) => {
  const searchQuery = ref('')

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(ps => ps.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  return {
    searchQuery, sortedAndSearchedPosts
  }
}