<script setup>
import {ref} from "vue";
import Menu from 'primevue/menu';

import ImageStore from "@/components/Admin/ImageStore.vue";
import imageServices from "@/services/admin/imageServices.js";

const items = ref([
    {
        label: 'Уроки',
        items: [
            {
                label: 'Создать',
                icon: 'pi pi-plus',
                route: '/admin/lessons/create'
            },
            {
                label: 'Список',
                icon: 'pi pi-list',
                route: '/admin/lessons'
            },
        ]
    },
    {
        label: 'Картинка на сервере',
        icon: 'pi pi-images',
        onClick: () => {
            imageServices.openDialogStore()
        }
    },
]);
</script>

<template>

    <div class="app-container flex">
        <div class="max-w-20rem flex-1 mr-2">
            <Menu :model="items">
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <div v-else  :id="item.id" v-bind="props.action" @click.prevent="item.onClick">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </div>
                </template>
            </Menu>
        </div>
        <div class="flex-1">
            <Suspense>
                <template #default>
                    <router-view />
                </template>
                <template #fallback>
                    <div class="w-full flex justify-content-center align-items-center">
                        <ProgressSpinner style="width: 100px; height: 100px"/>
                    </div>

                </template>
            </Suspense>

        </div>

        <ImageStore />

        <ConfirmDialog />

    </div>
</template>

<style scoped>

</style>