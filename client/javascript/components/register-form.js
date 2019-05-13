Vue.component('register-form',{
  template: `
  <div v-if="isRegister" class="container d-flex justify-content-center">
    <div class="col-md-5 login-form-1 bg-dark" style="margin-top:100px">
        <h2>miniWP</h2>
            <div class="form-group">
                <input v-model="newUser.name" type="text" class="form-control" placeholder="Your Name *" value="" />
            </div>
            <div class="form-group">
                <input v-model="newUser.profilePic" type="text" class="form-control" placeholder="Your Profile Picture Url *" value="" />
            </div>
            <div class="form-group">
                <input v-model="newUser.email" type="text" class="form-control" placeholder="Your Email *" value="" />
            </div>
            <div class="form-group">
                <input v-model="newUser.password" type="password" class="form-control" placeholder="Your Password *" value="" />
            </div>
            <div class="form-group d-flex justify-content-center">
                <input v-on:click.prevent="register" type="submit" class="btnSubmit" value="Register" />
            </div>
            <div class="form-group d-flex justify-content-center">
                <a href="" v-on:click.prevent="isRegister= false;">Back to login screen</a>
            </div>
    </div>
  </div>
  `
})