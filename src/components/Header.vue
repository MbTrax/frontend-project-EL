<script setup>

import BaseButton from "@/components/Base/BaseButton.vue";
</script>

<template>
    <div class="py-2">
        <div class="app-container flex justify-content-between align-items-center">

            <RouterLink :to="{name: 'mainPage'}" class="no-underline select-none">
                <h1 class="text-blue-500 m-0">English Lessons</h1>
            </RouterLink>

            <div>
                <RouterLink to="/admin">
                    <BaseButton>Админка</BaseButton>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>