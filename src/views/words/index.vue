<script setup>
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
        <div class="flex gap-3 mb-4">
            <RouterLink :to="{name: 'learn'}" class="no-underline flex-1 app-button py-2 text-center"  activeClass="bg-orange-500 border-orange-500 text-white">
                Изучение
            </RouterLink>
            <RouterLink :to="{name: 'test'}" class="no-underline flex-1 app-button py-2 text-center"  activeClass="bg-orange-500 border-orange-500 text-white">
                Тестирование
            </RouterLink>
        </div>
        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </router-view>

    </div>
</template>

<style scoped>

</style>