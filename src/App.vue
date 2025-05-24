<script setup>
import Header from "@/components/Header.vue";
import AudioSource from "@/components/Base/BaseAudioSource.vue";
</script>

<template>
    <Header class="mb-4"/>
    <Suspense>
        <template #default>
            <RouterView class="mb-8"/>
        </template>
        <template #fallback>
            <ProgressSpinner class="mt-8 mx-auto w-full text-center"/>
        </template>
    </Suspense>
    <AudioSource/>
</template>

<style scoped>
</style>
