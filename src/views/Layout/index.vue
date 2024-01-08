<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFIxed from './components/LayoutFIxed.vue';

import { useCategoryStore } from '@/stores/category';
import {onMounted} from 'vue'


const caregorystore = useCategoryStore();
onMounted(()=>{
  caregorystore.getCategoty()
})
</script>

<template>
  <!-- 固定头部 -->
  <LayoutFIxed/>
    <!-- 导航栏 -  -->
  <LayoutNav />
  <!-- 头部 -->
  <LayoutHeader />
  <RouterView />
</template>