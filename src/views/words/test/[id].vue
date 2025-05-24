<script setup>
import CartWord from "@/components/Cart/CartWord.vue";
import {ref} from "vue";
import router from "@/router/router.js";
import speakService from "@/services/speakService.js";
import api from "@/api.js";
import {useRoute} from "vue-router";
const index = ref(0)

const buttons = ref([])

const valueSelected = ref()

const score = ref(0)

const canNext = ref(false)

const route = useRoute()

const data = ref([])

api.get('lessons/' + route.params.id).then((res) => {
    data.value = JSON.parse(res.data.data)
})
const selectValue = (text, event) => {
    buttons.value.forEach(btn => {
        btn.classList.remove('bg-orange-500', 'border-orange-500')
    })
    valueSelected.value = text
    if (data.value[index.value].revert) {
        speakService.speak(text)
    }
    event.target.classList.add('bg-orange-500', 'border-orange-500')
}

const check = () => {
    console.log(data.value[index.value])
    let correct = data.value[index.value].revert ? data.value[index.value].eng : data.value[index.value].ru
    console.log(correct)
    if (correct === valueSelected.value) {
        score.value++
    }
    buttons.value.forEach(btn => {
        btn.classList.remove('bg-orange-500', 'border-orange-500')
        btn.classList.add('pointer-events-none')
    })
    buttons.value.forEach(btn => {
        if (btn.value === correct) {
            btn.classList.add('bg-green-500', 'border-green-500')
        }
        if (valueSelected.value !== correct && btn.value === valueSelected.value) {
            btn.classList.add('bg-red-500', 'border-red-500')
        }
    })
    canNext.value = true
}

const goNext = () => {
    index.value++
    buttons.value.forEach(btn => {
        btn.classList.remove('bg-orange-500', 'border-orange-500','bg-green-500', 'border-green-500','bg-red-500', 'border-red-500', 'pointer-events-none')
    })
    canNext.value = false
    valueSelected.value = null
}
</script>

<template>
    <div class="app-container flex-column justify-content-between h-full">
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

            <div class="app-cart w-15rem mx-auto mb-5" @click="speakService.speak(data[index].revert ? data[index].ru : data[index].eng)">
                <div
                    :style="{'background-image' : `url(${data[index].icon})`}"
                    class="w-full aspect-1-1 bg-no-repeat bg-center bg-contain"></div>
                <div class="mx-auto w-fit mb-3 font-bold text-xl">{{data[index].revert ? data[index].ru : data[index].eng}}</div>
            </div>
            <div class="flex justify-content-center w-full gap-3">
                <button v-for="word in data[index].words"
                        ref="buttons"
                        :value="data[index].revert ? word.eng : word.ru"
                        class="app-button"
                        @click="selectValue(data[index].revert ? word.eng : word.ru, $event)">
                    {{data[index].revert ? word.eng : word.ru}}
                </button>
            </div>
            <div class="fixed bottom-0 right-0 w-full mb-3">
                <div class="app-container flex justify-content-between">
                    <button @click="router.push('/words/test')" class="app-button">Вернуться к урокам</button>
                    <button v-if="canNext === false" class="app-button" :disabled="!valueSelected" @click="check">Проверить</button>
                    <button v-else-if="index + 1 < data.length" class="app-button" @click="goNext">Далее</button>
                    <button v-else @click="index++;" class="app-button">Закончить</button>
                </div>
            </div>

        </template>

        <template v-else>
            <div class="mx-auto text-center border-round-xl mb-5 w-fit p-4 py-6 app-cart-static text-blue-500">
                <div class="text-3xl mb-5 font-bold">Вы молодец!</div>
                <p class=" text-center w-25rem">Таким образом реализация намеченных плановых заданий представляет собой интересный эксперимент проверки </p>
                <div class="font-medium">
                    <span>Вы правильно отметили</span> <span class="font-bold">{{score}} из {{data.length}}</span> <span>ответа!</span>
                </div>
            </div>
            <button @click="router.push('/words/test')" class="app-button mx-auto block">Вернуться к остальным урокам</button>
        </template>


    </div>
</template>

<style scoped>

</style>