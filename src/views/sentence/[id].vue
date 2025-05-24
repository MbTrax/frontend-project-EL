<script setup>
import CartWord from "@/components/Cart/CartWord.vue";
import {ref} from "vue";
import draggable from 'vuedraggable'
import router from "@/router/router.js";
import normaliserService from "@/services/NormaliserService.js";
import speakService from "@/services/speakService.js";
import api from "@/api.js";
import {useRoute} from "vue-router";


const index = ref(0)
const route = useRoute()
let genIndex = 0
let score = 0

// const data = [
//     {
//         revert: true,
//         translate: 'Я ем грушу?',
//         correct: 'Am I eating a pear?',
//     },
//     {
//         revert: false,
//         translate: 'Am I eating a pear?',
//         correct: 'Я ем грушу?',
//     },
// ]

const data = ref([])
const currentSentence = ref([])
const wordsData = ref([])
const canNext = ref(false)

await api.get('lessons/' + route.params.id).then((res) => {
    data.value = JSON.parse(res.data.data)
})

const dragOptions = {
    animation: 200,
    disabled: false,
    ghostClass: "opacity-0"
}

const getListWords = (string)=>{
    const words = []
    let tWord = ''
    string.split('').forEach(char => {
        if (/^[,!?.]+$/.test(char)) {
            words.push({value: char, id: ++genIndex})
            if (tWord.length) {
                words.push({value: tWord, id: ++genIndex})
                tWord = ''
            }
            return true
        }
        if (char === ' ' && tWord.length > 0) {
            words.push({value: tWord.trim(), id: ++genIndex})
            tWord = ''
            return true
        }
        tWord += char
    })
    return normaliserService.shuffle(words)
}


const changeSentence = (tData) => {
    currentSentence.value = []
    if (tData.revert) {

        //Убираем последний знак при
        if (!/^[,!?.]+$/.test(tData.ru[tData.ru.length - 1])){
            tData.ru+= '.'
        }
        wordsData.value = getListWords(tData.eng)
    } else {
        wordsData.value = getListWords(tData.ru)

    }

}
changeSentence(data.value[index.value])

const goNext = () => {
    score++
    index.value++
    changeSentence(data.value[index.value])
    canNext.value = false
}

const onClickWord = (word) => {
    if (data.value[index.value].revert) {
        speakService.speak(word)
    }

    console.log(word)
}

const check = () => {
    const stringEl = document.getElementById('string');
    let isFullyCorrect = true;


    let correctData = data.value[index.value].revert ?
        normaliserService.splitString(data.value[index.value].eng) :
        normaliserService.splitString(data.value[index.value].ru)



    currentSentence.value.forEach((word, i) => {
        const element = stringEl.querySelector('#word-' + word.id);
        element.classList.remove('bg-green-500', 'border-green-500', 'bg-red-500', 'border-red-500');
        if (normaliserService.normalize(correctData[i])[0] === normaliserService.normalize(word.value)[0]) {
            element.classList.add('bg-green-500', 'border-green-500');
        } else {
            element.classList.add('bg-red-500', 'border-red-500');
            isFullyCorrect = false;
        }
    });
    if (isFullyCorrect) {
        score++
        speakService.speak(data.value[index.value].eng)
    }
    canNext.value = isFullyCorrect;
}
</script>

<template>
    <div class="app-container flex-column justify-content-between h-full ">
        <div>
            <div class="flex gap-3 mb-2 align-items-center">
                <div class="text-blue-500 flex-1">Прогресс урока</div>
                <div v-if="index < data.length" class="flex-1 font-bold text-blue-500">
                    {{index}} / {{data.length}}
                </div>
                <i class="pi pi-heart-fill text-red-500"/>
            </div>

            <div class="flex gap-3 mb-8 align-items-center">
                <div class="bg-gray-200 h-1rem border-round-md flex-1 relative overflow-hidden ">
                    <div class="bg-orange-500 absolute left-0 top-0 bottom-0 transition-all transition-duration-500 ease-in" :style="{'padding-right' : ( index /  data.length) * 100  + '%'}"></div>
                </div>
            </div>
        </div>
        <template v-if="index < data.length">
            <div class="mb-4 text-blue-500 font-medium">Переведите и составьте это предложение:</div>
            <div v-if="data[index].revert" class="text-xl font-bold mb-4 text-blue-500">{{data[index].ru}}</div>
            <div v-else class="text-xl font-bold mb-4 text-blue-500 cursor-pointer flex align-items-center gap-2 hover:text-orange-500" @click="speakService.speak(data[index].eng)">{{data[index].eng}} <i class="pi pi-volume-up"/></div>

            <div class="relative">
                <draggable
                    class="flex align-items-center gap-2 bg-gray-50 border-round-lg h-5rem px-3 py-2 mb-5"
                    id="string"
                    group="people"
                    v-model="currentSentence"
                    v-bind="dragOptions"
                    item-key="id"
                >

                    <template #item="{element}">
                        <div
                            @click="onClickWord(element.value)"
                            :id="'word-' + element.id"
                            class="app-button-static shadow-none">
                            {{element.value}}
                        </div>
                    </template>
                </draggable>
                <div v-if="!currentSentence.length" class="top-50 left-50 font-medium text-gray-500 absolute -translate-xy-50">Составьте предложение</div>
            </div>
            <draggable
                class="flex gap-2 justify-content-center"
                group="people"
                v-model="wordsData"
                v-bind="dragOptions"
                item-key="id"
            >

                <template #item="{element}">
                    <div
                        @click="onClickWord(element.value)"
                        :id="'word-' + element.id"
                        class="app-button-static">
                        {{element.value}}
                    </div>
                </template>
            </draggable>

            <div class="fixed bottom-0 right-0 w-full mb-3">
                <div class="app-container flex justify-content-between">
                    <button @click="router.push('/sentence')" class="app-button">Вернуться к урокам</button>
                    <button class="app-button" :disabled="Object.values(wordsData).length > 0 " @click="check">Проверить</button>
                    <button v-if="index + 1 < data.length" :disabled="canNext === false" class="app-button" @click="goNext">Далее</button>
                    <button v-else @click="index++;" :disabled="canNext === false" class="app-button">Закончить</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="mx-auto text-center border-round-xl mb-5 w-fit p-4 py-6 app-cart-static text-blue-500">
                <div class="text-3xl mb-5 font-bold">Вы молодец!</div>
                <p class=" text-center w-25rem">Таким образом реализация намеченных плановых заданий представляет собой интересный эксперимент проверки </p>
                <div class="font-medium">
                    <span>У вас получилось составить</span> <span class="font-bold">{{score - 2}}</span> <span>предложения!</span>
                </div>
            </div>
            <button @click="router.push('/sentence')" class="app-button mx-auto block">Вернуться к остальным урокам</button>
        </template>



    </div>
</template>

<style scoped>

</style>