import api from "@/api.js";

export default new class AdminWordsService {


    getTypes() {
        return api.get('types')
    }

    getTypesByTerm(term) {
        return api.get('types', {search: term})
    }

    deleteWordById() {

    }

}