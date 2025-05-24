<script setup>

import Form from "@/views/admin/lessons/form.vue";
import draggable from "vuedraggable";
import {ref} from "vue";
import {useConfirm} from "primevue";

const confirm = useConfirm()
const newBlock = ref({})
const model = defineModel()
const blockModalVisible = ref(false)
const newWord = ref({})

const addBlock = () => {
    newBlock.value = {title: ''}
    blockModalVisible.value = true
}

if (!model.value.data[0] || !model.value.data[0].groups) {
    model.value.data.push(
        {
            'groups': [],
            'words': []
        }
    )
}

const onCompleteNewBlock = () => {

    model.value.data[0].groups.push(newBlock.value.title)

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
            model.value.data[0].words = model.value.data[0].words.filter(item => item.group !== model.value.data[0].groups[index])
            model.value.data[0].groups.splice(index,1)
        },
        reject: () => {
        },
    });
}

const addNewWordToGroup = (groupTitle) => {
    model.value.data[0].words.push({
        word: newWord.value[groupTitle],
        group: groupTitle
    })
    newWord.value[groupTitle] = ''
}

const getWordsListByGroup = (groupTitle) => {
    return model.value.data[0].words.filter(item => item.group === groupTitle)
}

const onDeleteWordInGroup = (groupTitle, index, cb) => {
    let groupWords = model.value.data[0].words.filter(item => item.group === groupTitle);

    // получаем нужное слово по индексу
    const target = groupWords[index];
    if (!target) return;

    // фильтруем по объекту, а не по индексу
    model.value.data[0].words = model.value.data[0].words.filter(item => item !== target);

    cb();
}


</script>

<template>
    <div>
        <div class="flex flex-column gap-2 flex-1 mb-3">
            <div class="flex justify-content-between align-items-center">
                <label for="title">Данные для урока</label>
                <Button @click="addBlock">Добавить группу</Button>
            </div>
        </div>

        <draggable
            class="flex flex-column gap-4"
            id="string"
            group="words"
            v-model="model.data[0].groups"
            item-key="id"
        >
            <template #item="{element, index}">
                <div class="bg-gray-50 flex justify-content-between border-round-lg py-4 px-2 cursor-move relative">
                    <div class="flex flex-column gap-4 justify-content-between">
                        <div class="flex flex-column gap-4 w-full">
                            <Inplace>
                                <template #display>
                                    <label class="mb-2">Название группы: </label><b>{{model.data[0].groups[index]}}</b>
                                </template>
                                <template #content="{ closeCallback }">
                                    <span class="inline-flex items-center gap-2">
                                        <InputText v-model="model.data[0].groups[index]" autofocus />
                                        <Button icon="pi pi-check" text  @click="closeCallback" />
                                    </span>
                                </template>
                            </Inplace>
                            <div v-for="(word, i) in getWordsListByGroup(model.data[0].groups[index])">
                                <Inplace>
                                    <template #display>
                                        <div class="font-italic text-primary">{{ getWordsListByGroup(model.data[0].groups[index])[i].word }}</div>
                                    </template>
                                    <template #content="{ closeCallback }">
                                    <span class="inline-flex items-center gap-2">
                                        <InputText v-model="getWordsListByGroup(model.data[0].groups[index])[i].word" autofocus/>
                                        <Button icon="pi pi-check" text severity="success" @click="closeCallback" />
                                        <Button icon="pi pi-trash" text severity="danger" @click="onDeleteWordInGroup(model.data[0].groups[index], i, closeCallback)" />
                                    </span>
                                    </template>
                                </Inplace>

                            </div>

                            <div class="flex gap-2">
                                <form @submit.prevent="addNewWordToGroup(model.data[0].groups[index])">
                                    <InputText v-model="newWord[model.data[0].groups[index]]" placeholder="Добавить новое слово"/>
                                    <Button icon="pi pi-plus" :disabled="!newWord[model.data[0].groups[index]]" @click="addNewWordToGroup(model.data[0].groups[index])" variant="text" />
                                </form>

                            </div>

                        </div>
                        <div class="flex gap-2 absolute top-0 right-0 m-2">
                            <Button icon="pi pi-times" severity="danger" variant="text" @click="onDelete(index)"/>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>

        <Dialog v-model:visible="blockModalVisible" modal header="Добавить новый блок" :style="{ width: '25rem' }">
            <form class="flex flex-column gap-4" @submit.prevent="onCompleteNewBlock">
                <div class="flex flex-column gap-2">
                    <label for="title">Название группы</label>
                    <InputText maxlength="300" id="title" v-model="newBlock.title" aria-describedby="username-help" />
                </div>


                <div class="flex justify-content-end w-full gap-2">
                    <Button type="submit" :disabled="!newBlock.title" :label="newBlock.index >= 0 ? 'Изменить' : 'Добавить'" severity="secondary"></Button>
                </div>
            </form>

        </Dialog>

    </div>
</template>

<style scoped>

</style>