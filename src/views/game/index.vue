<script setup>
    import {ref} from "vue";
    import speakService from "@/services/speakService.js";
    import router from "@/router/router.js";
    import SmartArrayService from "@/services/smartArrayService.js";
    import api from "@/api.js";

    let timer
    const seconds = ref(0)
    const maxSeconds = ref(0)
    const selectedSeconds = ref(20)

    const score = ref(0)

    const btn = ref()

    const round = ref()

    const stages = new SmartArrayService(
        async () => {
            return await api.get('game')
        }
    )

    const curStage = ref({})

    const nextWord = async (correct) => {

        if (correct) {
            score.value++;
            btn.value.classList.add('bg-green-500', 'border-green-500');
        } else {
            btn.value.classList.add('bg-red-500', 'border-red-500');
        }
        btn.value.click()
        await new Promise(r => setTimeout(r, 500));
        round.value.classList.toggle('opacity-0')
        await new Promise(r => setTimeout(r, 500));
        round.value.classList.toggle('opacity-0')
        curStage.value = await stages.getNext()
        btn.value.classList.remove('bg-green-500', 'border-green-500', 'bg-red-500', 'border-red-500')
    }

    const startTimer = async () => {
        score.value = 0
        stages.clear()
        if(timer) {
            clearInterval(timer);
            seconds.value = 0
        }
        seconds.value = selectedSeconds.value
        maxSeconds.value = selectedSeconds.value
        curStage.value = await stages.getNext()
        timer = setInterval(() => {
            seconds.value--;
            if(seconds.value <= 0) {
                clearInterval(timer);
            }
        }, 1000)
    }

    const endRound = () => {
        clearInterval(timer);
        seconds.value = 0
        stages.clear()
    }
</script>

<template>
    <div class="app-container flex-column justify-content-between h-full ">
        <div>
            <div class="flex gap-3 mb-2 align-items-center justify-content-between">
                <div>
                    <span class="text-blue-500 mr-2">Осталось времени:</span>
                    <span v-if="seconds" class=" font-bold text-blue-500">
                        {{seconds}} сек.
                    </span>
                    <span v-else class="text-blue-500 font-bold">
                        начните игру
                    </span>
                </div>
                <div v-if="seconds > 0">
                    <span class="text-blue-500 mr-2">Ваш счет:</span>
                    <span class=" font-bold text-blue-500">
                        {{score}} очков
                    </span>
                </div>
                <div v-if="seconds <= 0">
                    <span class="text-blue-500 mr-2">Установить время:</span>
                    <div class="inline-flex gap-2">
                        <span class="font-bold text-blue-500 cursor-pointer underline" @click="selectedSeconds = 20" :class="selectedSeconds === 20 ? 'text-orange-500' : ''">20 сек.</span>
                        <span class="font-bold text-blue-500 cursor-pointer underline" @click="selectedSeconds = 60" :class="selectedSeconds === 60 ? 'text-orange-500' : ''">60 сек.</span>
                        <span class="font-bold text-blue-500 cursor-pointer underline" @click="selectedSeconds = 120" :class="selectedSeconds === 120 ? 'text-orange-500' : ''">120 сек.</span>
                    </div>



                </div>

            </div>

            <div class="flex gap-3 mb-8 align-items-center ">
                <div class="bg-gray-200 h-1rem border-round-md flex-1 relative overflow-hidden ">
                    <div class="bg-orange-500 absolute left-0 top-0 bottom-0 transition-all transition-duration-500 ease-in" :style="{'padding-right' : (seconds / maxSeconds) * 100  + '%'}"></div>
                </div>
            </div>
            <Transition name="slide-fade" mode="out-in">
                <div v-if="seconds > 0" ref="round" class="transition-duration-200">
                    <div class="w-20rem mx-auto h-10rem">
                        <div class="w-full app-button cursor-pointer text-center font-bold text-3xl py-3  text-white capitalize relative" ref="btn" @click="speakService.speak(curStage.word)">
                            {{curStage.word}}
                            <div class="absolute bottom-0 right-0 m-2 border-round-md px-2">
                                <i class="p-2 pi pi-volume-down text-sm"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="image in curStage.images" class="w-6 cursor-pointer hover:border-orange-500 transition-duration-200 border-blue-500 border-3 flex-shrink-1 flex-1 border-round-xl shadow-2 overflow-hidden">
                            <img class="w-full aspect-1-1 img-contain" :src="image.src" @click="nextWord(image.isCorrect)"/>
                        </div>
                    </div>
                </div>
                <div v-else-if="timer">
                    <div class="mx-auto text-center border-round-xl mb-5 w-fit p-4 py-6 app-cart-static text-blue-500">
                        <div class="text-3xl mb-5 font-bold">Вы молодец!</div>
                        <p class=" text-center w-25rem">Таким образом реализация намеченных плановых заданий представляет собой интересный эксперимент проверки </p>
                        <div class="font-medium">
                            <span>Вы заработали</span> <span class="font-bold">{{score}}</span> <span>очков!</span>
                        </div>
                    </div>
                    <button @click="startTimer" class="app-button mx-auto block mb-4">Попробовать еще раз</button>
                    <button @click="router.push('/')" class="app-button mx-auto block">Вернуться на главную страницу</button>
                </div>
                <div v-else>
                    <div class="grid align-items-center mb-4">
                        <div class="col">
                            <img class="max-w-full border-round-xl" src="https://www.cref.ru/wp-content/uploads/2020/08/image4.png"/>
                        </div>
                        <div class="col-7">
                            <div class="text-center">
                                <h3 class="text-5xl font-bold text-blue-500 mb-4">
                                    Стимул к учёбе
                                </h3>
                                <p class="opacity-60">Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-20rem mx-auto app-cart text-center font-bold text-3xl py-3 bg-blue-500 text-white" @click="startTimer">СТАРТ</div>
                </div>
            </Transition>
        </div>
        <div class="fixed bottom-0 right-0 w-full mb-3">
            <div class="app-container flex justify-content-between">
                <button v-if="seconds >= 0 && timer === undefined" @click="router.push('/')" class="app-button">Вернуться к урокам</button>
                <button v-if="seconds > 0" class="app-button" :disabled="timer === undefined" @click="endRound">Закончить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>