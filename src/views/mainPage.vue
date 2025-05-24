<script setup>

</script>

<template>
    <div class="app-container">
        <div class="grid align-items-center mb-4">
            <div class="col-7">
                <div>
                    <h3 class="text-5xl font-bold text-blue-500 mb-4">
                        Бесплатно. Весело.<br> Эффективно.
                    </h3>
                    <p class="opacity-60">Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание модели развития. Значимость этих проблем настолько очевидна, что консультация с широким активом влечет за собой процесс внедрения и модернизации дальнейших направлений</p>
                </div>
            </div>
            <div class="col">
                <img class="max-w-full border-round-xl" src="https://englex.ru/app/uploads/6-best-grammar-books.png"/>
            </div>
        </div>
        <div class="mb-6">
            <RouterLink :to="{name: 'alphabet'}" class="block p-4 flex align-items-center justify-content-between
             bg-pink-500 border-round-xl shadow-1 text-white no-underline select-none">
                <div class="text-4xl font-bold">Изучение Алфавита</div>
                <i class="pi pi-arrow-right text-4xl font-bold"/>
            </RouterLink>
        </div>

        <div class="grid align-items-center mb-4">
            <div class="col">
                <img class="max-w-full border-round-xl" src="https://www.cref.ru/wp-content/uploads/2020/08/image4.png"/>
            </div>
            <div class="col-7">
                <div class="text-center">
                    <h3 class="text-5xl font-bold text-blue-500 mb-4">
                        Стимул к учёбе
                    </h3>
                    <p class="opacity-60">Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание</p>
                </div>
            </div>
        </div>

        <div class="mb-4 flex gap-3">
            <RouterLink :to="'/words/learn'" class="flex-1 block p-4 h-20rem bg-yellow-500 border-round-xl shadow-1 no-underline select-none">
                <div class="text-4xl font-bold text-white">Слова</div>
            </RouterLink>
            <RouterLink :to="'/sentence'" class="flex-1 p-4 h-20rem bg-blue-500 border-round-xl shadow-1 no-underline select-none">
                <div class="text-4xl font-bold text-white">Предложения</div>
            </RouterLink>
        </div>
        <div class="mb-4 flex gap-3">
            <RouterLink :to="'/types'" class="flex-1 p-4 h-20rem bg-green-500 border-round-xl shadow-1 no-underline">
                <div class="text-4xl font-bold text-white">Типы слов</div>
            </RouterLink>
            <RouterLink :to="'/game'" class="flex-1 p-4 h-20rem bg-orange-500 border-round-xl shadow-1 no-underline">
                <div class="text-4xl font-bold text-white">Мини игра с картинками</div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>