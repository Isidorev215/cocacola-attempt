import { ref } from 'vue'
import { theAuth } from '../firebase/config'

const error = ref(null)

const logout = async () => {
    error.value = null
    try{
        await theAuth.signOut()
    }catch(err) {
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, logout }
}
export default useLogout