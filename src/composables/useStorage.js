import { ref } from 'vue'
import { theStorage } from '../firebase/config'

const useStorage = () => {
    const storageError = ref(null)
    const isPending = ref(false)
    const url = ref(null)
    const filePath = ref(null)
    
    // I have decided that we pass in the parts of the path as argument
    const uploadImage = async (file, firstFolder, secondFolder) => {
        isPending.value = true
        storageError.value = null
        filePath.value = `${firstFolder}/${secondFolder}/${file.name}`

        try {
            const storageRef = theStorage.ref(filePath.value)
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
            isPending.value = false
        }
        catch(err) {
            storageError.value = err.message
            console.log(storageError.value)
            isPending.value = false
        }
    }


    return { storageError, url, filePath, isPending, uploadImage }
}

export default useStorage