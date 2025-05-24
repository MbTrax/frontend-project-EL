<script setup>

import {defineAsyncComponent, nextTick, ref, watch} from "vue";
import imageServices from "@/services/admin/imageServices.js";
import typesServices from "@/services/admin/typesServices.js";
import lessonsService from "@/services/admin/lessonsService.js";
import {useRoute, useRouter} from "vue-router";
import api from "@/api.js";
import {useConfirm} from "primevue";

const formBody = ref({image: '', typeId: null, data: []})

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const types = ref([])
const error = ref('')
const typeDataForm = ref()
const confirm = useConfirm()

await typesServices.getTypes().then((data) => {
    types.value = data
})

const onSubmit = () => {
    if (loading.value) return false
    loading.value = true
    error.value = null
    if (route.params.id !== 'create') {
        lessonsService.updateLessonById(route.params.id, formBody.value)
            .then(data => {
                loading.value = false
            }
        ).catch(err => {
            console.log(err)
            error.value = err
            loading.value = false
        })

    } else {
        lessonsService.createLesson(formBody.value)
            .then(data => {
                loading.value = false
                router.push('/admin/lessons/' + data.id)
            }
        ).catch(err => {
            console.log(err)
            error.value = err
            loading.value = false
        })
    }

}

const onDelete = () => {
    if (loading.value) return false
    loading.value = true
    error.value = null
    lessonsService.deleteLessonById(route.params.id)
        .then(data => {
                loading.value = false
                router.push('/admin/lessons')
            }
        ).catch(err => {
            console.log(err)
            error.value = err
            loading.value = false
    })
}

const getDataFormByType = {
    'слова':  defineAsyncComponent(() => import('@/components/Admin/LessonsTypes/TypeWord.vue')),
    'тест': defineAsyncComponent(() => import('@/components/Admin/LessonsTypes/TypeTest.vue')),
    'типы': defineAsyncComponent(() => import('@/components/Admin/LessonsTypes/SolutionsType.vue')),
    'предложения': defineAsyncComponent(() => import('@/components/Admin/LessonsTypes/TypeSect.vue')),
}

if (route.params.id !== 'create') {
    await api.get('lessons/' + route.params.id).then(data => {
        formBody.value.title = data.title
        formBody.value.typeId = data.type_id
        formBody.value.image = data.icon
        formBody.value.data = JSON.parse(data.data.data)
    }).catch(err => {
        error.value = err
    })
}

const getTitleByTypeId = (id) => {
    return types.value.find(item => {
        return item.id === id
    })
}


const onChangeType = () => {
    confirm.require({
        message: 'При смене категории данные урока будут утеряны',
        header: 'Подтверждение',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Отмена',
        acceptProps: {
            label: 'Сменить',
            severity: 'danger',
        },
        accept: () => {
            formBody.value.typeId = null
            formBody.value.data = [];
        },
        reject: () => {
        },
    });
}
</script>

<template>
    <Panel>
        <template #header>
            <div class="flex w-full justify-content-between">
                <div>
                    <b>Добавить урок</b>
                </div>
                <div class="flex gap-4 justify-content-end">
                    <Button v-if="route.params.id !== 'create'" @click="onDelete" severity="danger" icon="pi pi-trash" />
                    <Button :label="route.params.id !== 'create' ? 'Обновить' : 'Создать'" :loading="loading" @click="onSubmit" :disabled="!formBody.image || !formBody.data || !formBody.typeId || !formBody.title" icon="pi pi-check"/>
                </div>
            </div>
        </template>

        <div class="flex flex-column gap-4">
            <div class="flex flex-column gap-2 flex-1">
                <label for="title">Название урока</label>
                <InputText id="title" v-model="formBody.title" aria-describedby="username-help" />
            </div>
            <div class="flex gap-2">
                <div class="flex flex-column flex-1 gap-4">
                    <div class="flex flex-column gap-2 flex-1">
                        <label for="title">Категория <b v-if="getTitleByTypeId(formBody.typeId)?.title">: {{getTitleByTypeId(formBody.typeId)?.title}}</b></label>
                        <Select v-if="!formBody.typeId" v-model="formBody.typeId" :options="types" optionValue="id" optionLabel="title" placeholder="Выбрать категорию" class="w-full md:w-56" />
                        <Button v-else label="Сменить категорию" @click="onChangeType"></Button>
                    </div>
                    <component :is="getDataFormByType[getTitleByTypeId(formBody.typeId)?.title.toLowerCase()]" v-model="formBody" ref="typeDataForm"/>
                </div>
                <div class="flex flex-column gap-2">
                    <label>Иконка</label>
                    <div v-if="formBody.image">
                        <Button label="Удалить картинку" @click="formBody.image = undefined"></Button>
                    </div>
                    <div v-else>

                        <Button label="Выбрать картинку" @click="imageServices.openDialogSelect(src => {formBody.image = src})"></Button>
                    </div>
                    <div v-if="formBody.image" class="w-10rem h-10rem lessons-form-icon" :style="`background-image: url(${formBody.image})`">

                    </div>
                </div>
            </div>
            <Message v-if="error" severity="error">
                {{error?.message}}
            </Message>
        </div>



    </Panel>
</template>

<style scoped>
    .lessons-form-icon{
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>