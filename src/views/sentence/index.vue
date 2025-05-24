<script setup>
import router from "@/router/router.js";
import CartLesson from "@/components/Cart/CartLesson.vue";
import {ref} from "vue";
import api from "@/api.js";

const data = ref([])
api.get('lessons', {type: 4}).then((res) => {
    data.value = res
})

</script>

<template>
    <div class="app-container">
        <RouterLink to="/" class="text-blue-500 app-link"><i class="pi pi-angle-left"/>Вернуться назад</RouterLink>
        <div class="grid align-items-center mb-4">
            <div class="col">
                <img class="max-w-full border-round-xl" src="https://www.cref.ru/wp-content/uploads/2020/08/image4.png"/>
            </div>
            <div class="col-7">
                <div class="text-center">
                    <div class="text-5xl font-bold text-blue-500 mb-4">
                        Стимул к учёбе
                    </div>
                    <p class="opacity-60">Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание</p>
                </div>
            </div>
        </div>
        <div>
            <div class="grid">
                <CartLesson v-for="lesson in data" :data="lesson" @click="async () => {
                await router.push('/sentence/' + lesson.id)
            }" class="col-3"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>