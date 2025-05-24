<script setup>
    import {ref} from "vue";
    import speakService from "@/services/speakService.js";

    const audio = ref()

    const speak = (src) => {
        audio.value.src=src
    }

    speakService.initSource(speak)
</script>

<template>
    <audio autoplay ref="audio"></audio>
</template>

<style scoped>

</style>