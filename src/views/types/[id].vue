<script setup>
import CartWord from "@/components/Cart/CartWord.vue";
import {ref} from "vue";
import draggable from 'vuedraggable'
import router from "@/router/router.js";
import normaliserService from "@/services/NormaliserService.js";
import speakService from "@/services/speakService.js";
import api from "@/api.js";
import {useRoute} from "vue-router";

const allCorrect = ref(false)

let genIndex = 0

const groups = ref({})

const words = ref({})

const score = ref(0)

const route = useRoute()

const data = ref()

await api.get('lessons/' + route.params.id).then((res) => {
    data.value = JSON.parse(res.data.data)[0]
})
const dragOptions = {
    animation: 200,
    disabled: false,
    ghostClass: "opacity-0"
}

const getListWords = (words) => {
    return words.map(item => {return {value: item.word, id: genIndex++}})
}

const check = async () => {
    score.value = 0
    Object.keys(groups.value).forEach(item => {
        groups.value[item].forEach(word => {
            const element = document.querySelector('#word-' + word.id);
            element.classList.remove('bg-green-500', 'border-green-500', 'bg-red-500', 'border-red-500');
            console.log(data.value.words.find(tword => {return (tword.group === item && tword.word === word.value)}))
            if(data.value.words.find(tword => {return (tword.group === item && tword.word === word.value)})){
                element.classList.add('bg-green-500', 'border-green-500');
                score.value++
            } else {
                element.classList.add('bg-red-500', 'border-red-500');
            }
        })
    })
    if(score.value >= data.value.words.length) {
        await new Promise(r => setTimeout(r, 500));
        allCorrect.value = true
    }
}

data.value.groups.forEach(group => {
    groups.value[group] = []
})

words.value = getListWords(data.value.words)

</script>

<template>
    <div class="app-container flex flex-column justify-content-between h-full ">
        <template v-if="!allCorrect">
            <div class="flex flex-row-reverse gap-3">
                <div class="w-30rem relative h-full sticky top-0 mt-2">
                    <div class="mb-2 font-bold text-blue-500">
                        Отсортируйте слова по группам
                    </div>
                    <draggable
                        class="flex h-30rem shadow-1  flex-wrap align-content-start gap-2 border-round-lg h-20rem overflow-y-auto min-h-10rem px-3 py-2  bg-gray-50 mb-4"
                        id="string"
                        group="words"
                        v-model="words"
                        v-bind="dragOptions"
                        item-key="id"
                    >
                        <template #item="{element}">
                            <div
                                @click="speakService.speak(element.value)"
                                :id="'word-' + element.id"
                                class="app-button-static shadow-none relative pr-6">
                                {{element.value}}
                                <div class="absolute bottom-0 right-0 m-2 border-round-md px-2 cursor-pointer">
                                    <i class="p-1 pi pi-volume-down text-sm"></i>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="flex-1">
                    <div v-for="group in data.groups">
                        <div class="mb-2 font-bold text-blue-500">
                            {{group}}
                        </div>
                        <draggable
                            class="shadow-1 flex h-20rem sticky flex-wrap align-content-start gap-2 border-round-lg h-20rem overflow-y-auto overflow-x-hidden min-h-10rem px-3 py-2  bg-gray-50 mb-4"
                            id="string"
                            group="words"
                            v-model="groups[group]"
                            v-bind="dragOptions"
                            item-key="id"
                        >
                            <template #item="{element}">
                                <div
                                    @click="speakService.speak(element.value)"
                                    :id="'word-' + element.id"
                                    class="app-button-static shadow-none relative pr-6">
                                    {{element.value}}
                                    <div class="absolute bottom-0 right-0 m-2 border-round-md px-2 cursor-pointer">
                                        <i class="p-1 pi pi-volume-down text-sm"></i>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>


            <div class="fixed bottom-0 right-0 w-full mb-3">
                <div class="app-container flex justify-content-between">
                    <button @click="router.push('/types')" class="app-button">Вернуться к урокам</button>
                    <button class="app-button" :disabled="words.length > 0 " @click="check">Проверить</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="mx-auto text-center border-round-xl mb-5 w-fit p-4 py-6 app-cart-static text-blue-500">
                <div class="text-3xl mb-5 font-bold">Вы молодец!</div>
                <p class=" text-center w-25rem">Таким образом реализация намеченных плановых заданий представляет собой интересный эксперимент проверки </p>
            </div>
            <button @click="router.push('/types')" class="app-button mx-auto block">Вернуться к остальным урокам</button>
        </template>



    </div>
</template>

<style scoped>

</style>