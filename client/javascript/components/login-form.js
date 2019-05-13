Vue.component('login-form', {

  template: `
  <div v-if="!isLogin && !isRegister" class="container d-flex justify-content-center">
      
        <div class="col-md-5 login-form-1 bg-dark" style="margin-top:100px">
            <h2>miniWP</h2>
                <div class="form-group">
                    <input v-model="email" type="text" class="form-control" placeholder="Your Email *" value="" />
                </div>
                <div class="form-group">
                    <input v-model="password" type="password" class="form-control" placeholder="Your Password *" value="" />
                </div>
                <div class="form-group d-flex justify-content-center">
                    <input v-on:click="login" type="submit" class="btnSubmit" value="Login" />
                </div>
                <div class="form-group d-flex justify-content-center">
                    <a href="" v-on:click.prevent="isRegister = true">Register</a>
                </div>
        </div>
      </div>
  `
})