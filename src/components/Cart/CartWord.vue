<script setup>
import speakService from "@/services/speakService.js";

const props = defineProps({
    data: {
        type: Object,
        default: {
            icon: null,     //string
            ru: null,    //string
            eng: null,    //string
        }
    }
})

</script>

<template>
    <div>
        <div class="app-cart" @click="speakService.speak(data.eng)">
            <div v-if="data.ru" class="px-4 py-3 font-bold  text-center text-3xl select-none">
                {{data.ru}}
            </div>
            <div
                :style="{'background-image' : `url(${data.icon})`}"
                class="w-full aspect-1-1 bg-no-repeat bg-center bg-contain"></div>
            <div class="flex justify-content-between align-items-center px-4 pb-3">
                <div class="text-xl font-medium select-none ">
                    {{data.eng}}
                </div>
                <div v-if="data.eng" class="app-link hover:bg-blue-500 hover:text-white cursor-pointer transition-duration-300 border-round-md">
                    <i class="p-2 pi pi-volume-down"></i>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>