<script setup>
    const props = defineProps({
        data: {
            type: Object,
            default: {
                icon: null,     //string
                title: null,    //string
                desc: null,    //string
                id: null,       //number
            }
        }
    })
</script>

<template>
    <div>
        <div class="app-cart px-4 py-3  border-round-md  text-blue-500 hover:text-orange-500">
            <div class="flex justify-content-end mb-3">
                <img class="w-3rem bg-orange-500 p-2 border-circle" :src="data.icon" style="aspect-ratio: 1/1; object-fit: contain; object-position: center"/>
            </div>
            <div class="flex justify-content-start">
                <span class="w-8 text-md font-medium">{{data.title}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>