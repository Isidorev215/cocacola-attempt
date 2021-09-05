<template>
  <div class="form-container">
    <form class="login" @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email" autocomplete="off">
      </div>

      <div class="password">
        <label for="password">Password</label>
        <input :type="passwordType" name="password" v-model="password">
        <div class="toggle-password-visibility" @click="toggleVisibility">
          <span class="material-icons" v-if="passwordVisibility">visibility</span>
          <span class="material-icons" v-else>visibility_off</span>
        </div>
      </div>

      <div class="button">
        <button type="submit">Login</button>
      </div>

      <span class="error" v-if="error">{{error}}</span>
      
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin'
import getUser from '../composables/getUser'
export default {
  name: 'LoginAdmin',
  setup(){
    const router = useRouter()
    const email = ref(null)
    const password = ref(null)

    const { error, login } = useLogin()
    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
        console.log('user logged in')
        router.push({ name: 'Admin', params: {admin: res.user.uid}})
      }
    }

    return {email, password, error, handleSubmit }
  },
  data(){
    return {
      passwordVisibility: false,
      passwordType: "password"
    }
  },
  methods: {
    toggleVisibility(){
      this.passwordVisibility = !this.passwordVisibility
      if(this.passwordVisibility == false){
        this.passwordType = "password"
      }
      if (this.passwordVisibility == true){
        this.passwordType = "text"
      }
    }
  },
  beforeRouteLeave(){
    const { user } = getUser()
    this.currentUser = user.value
  }
}
</script>

<style>
.form-container{
  height: 90vh;
  overflow-y: hidden;
  position: relative;
  padding: 10%;
  display: flex;
  justify-content: flex-end;
}
.form-container .login{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border-left: 1px solid rgb(86, 126, 68);
}
.form-container .login div{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 20%;
}
.form-container .login div input{
  padding: 7px;
  width: 70%;
  background-color: black;
  outline: none;
  border-bottom: 1px solid rgb(116, 10, 10);
  border-right: none;
  border-radius: 7px;
  color: white;
}
.form-container .login div input:active, .form-container .login div input:focus{
  background: transparent;
  color: white;
}
.form-container .login div.password{
  position: relative;
}
.form-container .login div.password .toggle-password-visibility{
  position: absolute;
  top: 50%;
  right: 5px;
  width: 5%;
  color: grey;
  cursor: pointer;
}
.form-container .login div.password .toggle-password-visibility span{
  font-size: 17px;
}

.form-container .login div.button button{
  width: 20%;
  padding: 1.5%;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgb(116, 10, 10);
  color: white;
  cursor: pointer;
}
.form-container .login div.button button:hover{
  background-color: rgb(116, 10, 10);
}
.form-container .login .error{
  color: rgb(255, 0, 0);
  font-size: 12px;
}

/* media queries */
@media (max-width: 768px){
  .form-container .login{
    width: 80%;
  }
  .form-container .login div input{
    width: 70%;
  }
  .form-container .login div.button button{
    width: 30%;
    padding: 2%;
  }
}

@media (max-width: 576px){
  .form-container .login{
    width: 100%;
    border-left: unset;
  }
  .form-container .login div input{
    width: 100%;
  }
  .form-container .login div.button button{
    width: 30%;
    padding: 2%;
  }
}


</style>