<script setup>
    const props = defineProps({
        value: {
            type: String,
            required: false
        },
        pending: {
            type: Boolean,
            required: false
        }
    })
</script>

<template>
    <button v-bind="$attrs" class="px-3 py-2 border-none border-round-md bg-blue-500 text-white
     cursor-pointer hover:bg-pink-500 transition-duration-200 select-none"
            :class="{'pointer-events-none opacity-70' : pending}">
        <slot>
            {{value}}
        </slot>
    </button>
</template>

<style scoped>

</style>