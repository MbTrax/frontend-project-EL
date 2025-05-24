<script setup>
    import CartWord from "@/components/Cart/CartWord.vue";
    import {ref} from "vue";
    import router from "@/router/router.js";
    import api from "@/api.js";
    import {useRoute} from "vue-router";

    const route = useRoute()
    let index = ref(0)
    const data = ref()

    api.get('lessons/' + route.params.id).then((res) => {
        data.value = JSON.parse(res.data.data)
    })
</script>

<template>
    <div class="app-container">
        <div class="flex gap-3 mb-2 align-items-center">
            <div class="text-blue-500 flex-1">Прогресс урока</div>
            <div v-if="index < data.length" class="flex-1 font-bold text-blue-500">
                {{index}} / {{data.length}}
            </div>
            <i class="pi pi-heart-fill text-red-500"/>
        </div>

        <div class="flex gap-3 mb-8 align-items-center">
            <div class="bg-gray-200 h-1rem border-round-md flex-1 relative overflow-hidden ">
                <div class="bg-orange-500 absolute left-0 top-0 bottom-0 transition-all transition-duration-500 ease-in" :style="{'padding-right' : ( index /  data.length) * 100  + '%'}"></div>
            </div>
        </div>
        <template v-if="index < data.length">
            <div class="grid mb-4 relative">
                <CartWord v-for="word in data.slice(index, index + 3)" :key="word" :data="word" class="col-4"></CartWord>
            </div>
            <div class="fixed bottom-0 right-0 w-full mb-3">
                <div class="app-container flex justify-content-between">
                    <button @click="router.push('/words/learn')" class="app-button">Вернуться к урокам</button>
                    <button v-if="index + 3 < data.length" class="app-button" @click="index+=3">Далее</button>
                    <button v-else @click="index+=3" class="app-button">Закончить</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="mx-auto text-center border-round-xl mb-5 w-fit p-4 py-6 app-cart-static text-blue-500">
                <div class="text-3xl mb-5 font-bold">Вы молодец!</div>
                <p class=" text-center w-25rem">Таким образом реализация намеченных плановых заданий представляет собой интересный эксперимент проверки </p>
                <div class="font-medium">
                    <span>Вы узнали</span> <span class="font-bold">{{data.length}}</span> <span>новых слов!</span>
                </div>
            </div>
            <button @click="router.push('/words/learn')" class="app-button mx-auto block">Вернуться к остальным урокам</button>

        </template>


    </div>
</template>

<style scoped>

</style>