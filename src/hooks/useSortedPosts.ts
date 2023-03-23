import {computed, Ref, ref} from "vue";

export const useSortedPosts = (posts: Ref<any[]>) => {

  const selectedSort = ref('')
  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => a[selectedSort.value]?.localeCompare(b[selectedSort.value]))
  })

  return {
    selectedSort, sortedPosts
  }
}