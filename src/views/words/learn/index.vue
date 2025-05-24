<script setup>
import CartLesson from "@/components/Cart/CartLesson.vue";
import router from "@/router/router.js";
import api from "@/api.js";
import {ref} from "vue";
const data = ref([])
api.get('lessons', {type: 2}).then((res) => {
    data.value = res
})

</script>

<template>
    <div class="app-container">
        <div class="grid">
            <CartLesson v-for="lesson in data" :data="lesson" @click="async () => {
                await router.push('/words/learn/' + lesson.id)
            }" class="col-3"/>
        </div>
    </div>
</template>

<style scoped>

</style>