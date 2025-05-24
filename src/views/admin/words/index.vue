<script setup>

import {ref} from "vue";
import api from "@/api.js";
import Button from 'primevue/button';
import lessonsService from "@/services/admin/lessonsService.js";
import {useConfirm} from "primevue";

const lessons = ref()
const types = ref()
const confirm = useConfirm()

await api.get('words').then(data =>
    lessons.value = data
)

const getTypesTitleById = (id) => {
    return types.value.find((item => {
        return item.id === id
    }))
}

const onDelete = (id) => {
    confirm.require({
        message: 'Вы уверены что хотите удалить запись?',
        header: 'Подтверждение',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Отмена',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Удалить',
            severity: 'danger'
        },
        accept: async () => {
            await lessonsService.deleteLessonById(id)

            await api.get('lessons', {}).then(data =>
                lessons.value = data
            )
        },
        reject: () => {
        }
    });

}
</script>

<template>
    <Panel>
        <template #header>
            <div class="flex justify-content-between w-full">
                <b>Список уроков</b>
                <RouterLink to="/admin/lessons/create">
                    <Button icon="pi pi-plus"></Button>
                </RouterLink>
            </div>
        </template>
        <pre>
            {{lessons}}
        </pre>

<!--        <DataTable :value="lessons" tableStyle="min-width: 50rem">-->
<!--            <Column field="id" header="ID"></Column>-->
<!--            <Column header="Название урока">-->
<!--                <template #body="slotProps">-->
<!--                    <div class="flex align-items-center gap-2">-->
<!--                        <img :src="slotProps.data.icon" width="20px" class="border-circle"/>-->
<!--                        <label>{{slotProps.data.title}}</label>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </Column>-->
<!--            <Column header="Категория">-->
<!--                <template #body="slotProps">-->
<!--                    <div class="flex align-items-center gap-2">-->
<!--                        <label v-if="types">{{getTypesTitleById(slotProps.data['type_id']).title}}</label>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </Column>-->
<!--            <Column>-->
<!--                <template #body="slotProps">-->
<!--                    <div class="flex gap-2 justify-content-end">-->

<!--                        <Button icon="pi pi-trash" severity="danger" size="small" @click="onDelete(slotProps.data.id)"></Button>-->
<!--                        <RouterLink :to="`/admin/lessons/${slotProps.data.id}`">-->
<!--                            <Button icon="pi pi-pencil" size="small"></Button>-->
<!--                        </RouterLink>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </Column>-->
<!--        </DataTable>-->
    </Panel>

</template>

<style scoped>

</style>