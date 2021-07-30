import { ref } from 'vue'
import { theFirestore } from '../firebase/config'

const useCollection = (collection) => {
    const firestoreError = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        isPending.value = true
        firestoreError.value = null
        try {
            await theFirestore.collection(collection).add(doc)
            isPending.value = false
        } 
        catch(err) {
            firestoreError.value = err.message
            isPending.value = false
            console.log(err.message)
        }
    }

    return { firestoreError, isPending, addDoc}
}

export default useCollection