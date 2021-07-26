import { ref, watchEffect } from 'vue'
import { theFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
    const oneDoc = ref(null)
    const docError = ref(null)

    let documentRef = theFirestore.collection(collection).doc(id)
    const unsub = documentRef.onSnapshot(doc => {
        if(doc.data()){
            oneDoc.value = { ...doc.data(), id: doc.id }
            docError.value = null
        }else{
            docError.value = 'Document does not exist'
        }
    }, err => {
        docError.value = err.message
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { oneDoc, docError }
}

export default getDocument