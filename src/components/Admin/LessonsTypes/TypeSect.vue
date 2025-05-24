<script setup>

import imageServices from "@/services/admin/imageServices.js";
import Form from "@/views/admin/lessons/form.vue";
import draggable from "vuedraggable";
import {ref} from "vue";
import {useConfirm} from "primevue";

const confirm = useConfirm()
const newBlock = ref({})
const model = defineModel()
const blockModalVisible = ref(false)
const addBlock = () => {
    newBlock.value = {revert: true}
    blockModalVisible.value = true
}


const options = ref([
    { name: 'На русском', value: false },
    { name: 'На англ', value: true },
]);


const onCompleteNewBlock = () => {
    if (newBlock.value.index >= 0) {
        model.value.data[newBlock.value.index] = newBlock.value
    }  else {
        model.value.data.push({
            id: model.value.data.length + 1,
            ru: newBlock.value.ru,
            eng: newBlock.value.eng,
            revert: newBlock.value.revert ?? true
        })
    }
    blockModalVisible.value = false
}

const onDelete = (index) => {
    confirm.require({
        message: 'Вы уверены что хотите удалить блок?',
        header: 'Подтверждение',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Отмена',
        acceptProps: {
            label: 'Удалить',
            severity: 'danger',
        },
        accept: () => {
            model.value.data.splice(index,1)
        },
        reject: () => {
        },
    });
}

const onChange = (element, index) => {
    newBlock.value = {...element, index}
    blockModalVisible.value = true
}


</script>

<template>
    <div>
        <div class="flex flex-column gap-2 flex-1">
            <div class="flex justify-content-between align-items-center">
                <label for="title">Данные для урока</label>
                <Button @click="addBlock">Добавить</Button>
            </div>
            <Message size="small" severity="secondary" variant="simple"></Message>

        </div>

        <draggable
            class="flex flex-column gap-4"
            id="string"
            group="words"
            v-model="model.data"
            item-key="id"
        >
            <template #item="{element, index}">
                <div class="bg-gray-50 flex justify-content-between border-round-lg py-4 px-2 cursor-move">
                    <div class="flex flex-column gap-4 justify-content-between">
                        <div class="flex flex-column gap-4">
                            <div>
                                <label>Русский перевод предложения: </label>
                                <b>{{element.ru}}</b>
                            </div>
                            <div>
                                <label>Английский перевод предложения: </label>
                                <b>{{element.eng}}</b>
                            </div>

                            <div>
                                <label>Пользователь будет собирать предложение на: </label>
                                <b>{{element.revert ? "на англ" : "на русском"}}</b>
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <label class="hover:text-red-500 cursor-pointer font-bold" @click="onDelete(index)">удалить</label>
                            <label class="hover:text-green-500 cursor-pointer font-bold" @click="onChange(element, index)">изменить</label>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>

        <Dialog v-model:visible="blockModalVisible" modal header="Добавить новый блок" :style="{ width: '25rem' }">
            <form class="flex flex-column gap-4" @submit.prevent="onCompleteNewBlock">
                <div class="flex flex-column gap-2">
                    <label for="title">Русский перевод</label>
                    <Textarea :rows="2" autoResize  maxlength="300" id="title" v-model="newBlock.ru" aria-describedby="username-help" />
                </div>
                <div class="flex flex-column gap-2">
                    <label for="title">Английский перевод</label>
                    <Textarea :rows="2" autoResize  maxlength="300" id="title" v-model="newBlock.eng" aria-describedby="username-help" />
                </div>

                <div class="flex flex-column gap-2">
                    <label>Пользователь будет собирать предложение на:</label>
                    <SelectButton class="w-full" v-model="newBlock.revert" optionLabel="name" optionValue="value" :options="options" />
                </div>


                <div class="flex justify-content-end w-full gap-2">
                    <Button type="submit" :disabled="!newBlock.ru || !newBlock.eng" :label="newBlock.index >= 0 ? 'Изменить' : 'Добавить'" severity="secondary"></Button>
                </div>
            </form>

        </Dialog>

    </div>
</template>

<style scoped>

</style>