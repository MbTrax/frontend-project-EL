<script setup>
    import speakService from "@/services/speakService.js";

    const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
    const data = alphabet.split(' ')


</script>

<template>
    <div class="app-container">
        <RouterLink to="/" class="text-blue-500 app-link"><i class="pi pi-angle-left"/>Вернуться назад</RouterLink>
        <h2 class="text-blue-500 select-text">Английский алфавит</h2>
        <div class="grid">
            <div v-for="char in data" class="col-2">
                <div class="app-button w-full flex justify-content-center align-items-center aspect-1-1 relative" @click="speakService.speak(char)">
                    <span class="text-5xl">
                        {{char.toUpperCase()}} - {{char}}
                    </span>
                    <div class="absolute bottom-0 right-0 hover:bg-orange-500 cursor-pointer transition-duration-300 m-2 border-round-md px-2">
                        <i class="p-2 pi pi-volume-down"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>