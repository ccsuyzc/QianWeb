import { ref, computed ,reactive} from 'vue'
import { defineStore } from 'pinia'

export const UsersStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const store = reactive({
    user:{}
  })
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment,store }
})

