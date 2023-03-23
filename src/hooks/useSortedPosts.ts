import {computed, Ref, ref} from "vue";
import {PostType} from "@/store/postsModule";

export const useSortedPosts = (posts: Ref<PostType[]>) => {

  const selectedSort = ref('')
  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => a[selectedSort.value as keyof typeof a]?.localeCompare(b[selectedSort.value as keyof typeof b]))
  })

  return {
    selectedSort, sortedPosts
  }
}