<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFIxed from './components/LayoutFIxed.vue';
import { useCategoryStore } from '@/stores/category';
import {onMounted} from 'vue'


const caregorystore = useCategoryStore();
onMounted(()=>{
  caregorystore.getCategoty()
})
</script>

<template>
  <LayoutFIxed/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>