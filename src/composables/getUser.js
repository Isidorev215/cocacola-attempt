import { ref } from 'vue'
import { theAuth } from '../firebase/config'

const user = ref(theAuth.currentUser)
theAuth.onAuthStateChanged( _user => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser