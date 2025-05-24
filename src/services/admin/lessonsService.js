import api from "@/api.js";

export default new class AdminLessonsService {

    list(){
        return api.get('lessons')
    }
    getLessonById(id){
        return api.get('lessons/id', {id})
    }
    createLesson(data) {
        return api.post('lessons', data)
    }

    updateLessonById(id, data) {
        return api.patch('lessons/'+id, data)
    }

    deleteLessonById(id) {
        return api.delete('lessons/' + id)
    }

}