<script setup>

import router from "@/router/router.js";
import CartLesson from "@/components/Cart/CartLesson.vue";
import api from "@/api.js";
import {ref} from "vue";


const data = ref([])
api.get('lessons', {type: 3}).then((res) => {
    data.value = res
})

</script>

<template>
    <div class="app-container">
        <div class="grid">
            <CartLesson v-for="lesson in data" :data="lesson" @click="router.push('/words/test/' + lesson.id)" class="col-3"/>
        </div>

    </div>
</template>

<style scoped>

</style>