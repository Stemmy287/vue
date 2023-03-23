import {computed, Ref, ref} from "vue";

export const useSortedAndSearchedPosts = (sortedPosts: Ref<any[]>) => {
  const searchQuery = ref('')

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(ps => ps.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  return {
    searchQuery, sortedAndSearchedPosts
  }
}