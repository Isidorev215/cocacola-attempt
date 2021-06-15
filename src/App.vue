<template>
  <nav id="nav">
    <div class="nav-item logo-home">
      <router-link :to="{ name: 'Home'}">Home</router-link>
    </div>
    <ul class="nav-item nav-links">
      <li><router-link :to="{ name: 'Products'}">PRODUCTS</router-link></li>
      <li><router-link :to="{ name: 'Whatsnew'}">WHAT'S NEW</router-link></li>
      <li><router-link :to="{ name: 'Newsletter'}">NEWSLETTER</router-link></li>
      <li><router-link :to="{ name: 'Contactus'}">CONTACT US</router-link></li>
    </ul>
    <div class="nav-item purchase-btn">
      <router-link :to="{ name: 'Products'}">BUY PRODUCT</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
}
#nav {
  padding: 3% 5% 0;
}
#nav .nav-item a {
  font-weight: light;
  font-size: 0.6rem;
  color: white;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: rgb(116, 10, 10);
}

/* My styling comes in */
#nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav .logo-home{
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
#nav .logo-home a{
  background-image: url("./assets/cocacola-logo.png");
  background-size: 90px;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 50px;
  display: inline-block;
  text-indent: -9999999px;
}

#nav .nav-links{
  flex: 2;
  display: flex;
  justify-content: space-between;
  list-style: none;
}
#nav .purchase-btn{
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
#nav .purchase-btn a{
  border: 2px solid white;
  border-radius: 25px;
  padding: 4% 7%;
}
#nav .purchase-btn a.router-link-exact-active{
  color: white;
  border: 2px solid rgb(116, 10, 10);
}
</style>
