import { ref, watchEffect } from 'vue'
import { theFirestore } from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref([])
    const collectionError = ref(null)
    let collectionRef = theFirestore.collection(collection).orderBy('createdAt')

    const unsub = collectionRef.onSnapshot((snap) => {
        let result = []
        snap.docs.forEach((doc) => {
            doc.data().createdAt && result.push({...doc.data(), id: doc.id })
        })
        documents.value = result
        collectionError.value = null
    }, (err) => {
        documents.value = []
        console.log(err.message)
        collectionError.value = 'Could Not Fetch Data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, collectionError}
}

export default getCollection