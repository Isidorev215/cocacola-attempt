import { ref } from 'vue'
import { theAuth } from '../firebase/config'

const error = ref(null);

const login = async (email, password) => {
    error.value = null
    try {
        const res = await theAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        return res
    } catch(err){
        console.log(err.message)
        error.value = "Invalid Login Credentials or No connection"
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin