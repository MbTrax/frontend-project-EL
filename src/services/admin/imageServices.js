import api from "@/api.js";

export default new class ImageService {

    list(){
        return api.get('images')
    }

    deleteImage(id) {
        return api.delete('images/' + id)
    }

    openDialogStore
    openDialogSelect



}