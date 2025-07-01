import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from "@/views/mainPage.vue";
import Alphabet from "@/views/alphabet.vue";
import Words from "@/views/words/index.vue";
import WordsTest from "@/views/words/test/index.vue";
import WordsLearn from "@/views/words/learn/index.vue";
import WordsLearnId from "@/views/words/learn/[id].vue";
import WordsTestId from "@/views/words/test/[id].vue";
import Sentence from "@/views/sentence/index.vue";
import SentenceId from "@/views/sentence/[id].vue";
import Types from "@/views/types/index.vue";
import TypesId from "@/views/types/[id].vue";
import Game from "@/views/game/index.vue";


import Admin from "@/views/admin/index.vue";
import AdminLessons from "@/views/admin/lessons/index.vue";
import AdminLessonsForm from "@/views/admin/lessons/form.vue";

import AdminWords from "@/views/admin/words/index.vue";
import AdminWordsForm from "@/views/admin/words/form.vue";


const routes = [
    { path: '/', name: 'mainPage', component: MainPage },

    { path: '/alphabet', name: 'alphabet', component: Alphabet },

    { path: '/words', name: 'words', component: Words, children: [
            { path: 'learn', name: 'learn', component: WordsLearn },
            { path: 'test', name: 'test', component: WordsTest },
        ]
    },
    { path: '/words/learn/:id', component: WordsLearnId },
    { path: '/words/test/:id', component: WordsTestId },
    { path: '/sentence', component: Sentence },
    { path: '/sentence/:id', component: SentenceId },
    { path: '/types', component: Types },
    { path: '/types/:id', component: TypesId },
    { path: '/game', component: Game },
    { path: '/admin', component: Admin, children: [
            { path: 'lessons', name: 'adminLessons', component: AdminLessons },
            { path: 'lessons/:id', name: 'adminLessonsForm', component: AdminLessonsForm },

            { path: 'words', name: 'adminWords', component: AdminWords },
            { path: 'words/:id', name: 'adminWordsForm', component: AdminWordsForm },
        ]},
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})