<script setup>
    import Dialog from 'primevue/dialog';
    import {onMounted, onUnmounted, ref} from "vue";
    import api from "@/api.js";
    import Button from 'primevue/button';
    import FileUpload from 'primevue/fileupload';
    import Image from 'primevue/image';
    import imageServices from "@/services/admin/imageServices.js";


    const visible = ref(false)

    const images = ref([])
    const selectMode = ref([])
    const callback = ref()

    api.get('images').then(data => {
        images.value = data
    })


    const onUploadError = (data) => {
        console.log(data)
    }

    const onUploadSuccess = (data) => {
        api.get('images').then(data => {
            images.value = data
        })
    }

    onMounted(() => {
        imageServices.openDialogSelect = openDialogSelect
        imageServices.openDialogStore = openDialogStore
    })

    const openDialogSelect = (cb) => {
        callback.value = cb
        selectMode.value = true
        visible.value = true
    }

    const openDialogStore = () => {
        selectMode.value = false
        visible.value = true
    }

    const onSelect = (src) => {
        if (typeof callback.value === 'function') {
            callback.value(src)
        }
        visible.value = false
    }

    const onDelete = (id) => {
        imageServices.deleteImage(id).then(
            images.value = images.value.filter(item => {return item.id !== id})
        )
    }


</script>

<template>
    <Dialog v-model:visible="visible" modal header="Картинки на сервере" :style="{ width: '90rem' }">
        <div class="relative h-screen">
            <div class="sticky top-0 bg-white z-2">
                <FileUpload name="files[]"

                            :url="api.baseUrl+'images/upload'"
                            accept="image/*"
                            :maxFileSize="2000000"
                            :auto="true"
                            @upload="onUploadSuccess"
                            @error="onUploadError">
                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                            <div class="flex gap-2">
                                <Button @click="chooseCallback()" outlined severity="success"><i class="pi pi-cloud-upload"/>Выбрать и загрузить картинку</Button>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <span>Перетащите картинку сюда что бы загрузить.</span>
                    </template>
                </FileUpload>
            </div>
            <div class="grid  mt-2">
                <div v-for="image in images" class="col-2 relative">
                    <Image :src="image.src" alt="Image" class="shadow-2 border-round-md block overflow-hidden" image-style="object-fit: cover;" width="100%"  style="aspect-ratio: 1/1" preview>
                        <template #image>
                            <div class="w-full h-full bg-cover bg-center" :style="{
                                backgroundImage: `url('${image.src}')`
                            }">
                            </div>
                        </template>
                    </Image>
                    <Button v-if="selectMode" @click="onSelect(image.src)" class="absolute bottom-0 right-0 m-3" :icon="'pi pi-check'" label="Выбрать"></Button>
                    <Button @click="onDelete(image.id)" class="absolute top-0 right-0 m-3" rounded outlined severity="danger"  :icon="'pi pi-times'"></Button>
                </div>
            </div>
        </div>





    </Dialog>
</template>

<style scoped>

</style>