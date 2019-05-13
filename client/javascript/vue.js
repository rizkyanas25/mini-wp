const app = new Vue({
  el: "#app",
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    isLogin : false,
    isRegister : false,
    articlesSeen : true,
    articleFormSeen : false,
    editFormSeen : false,
    articleDetail : false,

    name: "",
    email: "",
    password: "",
    profilePic : "",

    articles : [],
    articleData : {},
    search: "",

    newUser : {
      name: '',
      profilePic:'',
      email: '',
      password: ''
    },

    newArticle : {
      title : "",
      img : "",
      content : ""
    }
  },

  mounted() {
    // this.getArticles()
  },

  methods : {

    getArticles() {
      this.articles = []
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles',
      })
        .then(response => {
          // console.log(response.data.data)
          response.data.data.forEach(article => {
            // article.show = true
            this.articles.push(article)
          });
        })
        .catch(err => {
          console.log(err)
        })
    },

    login() {
      // console.log(this.email, this.password)
      axios({
        method: 'post',
        url: `http://localhost:3000/login`,
        data : {
          email : this.email,
          password : this.password
        },
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        // console.log(data)
        this.profilePic = ''
        this.email = ''
        this.password = ''
        window.localStorage.setItem('token', data.access_token)
        window.localStorage.setItem('email', data.email)
        window.localStorage.setItem('name', data.name)
        window.localStorage.setItem('profilePic', data.profilePic)

        let timerInterval
        Swal.fire({
          title: `Welcome, ${data.name}`,
          timer: 1000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = Swal.getTimerLeft()
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
            this.isRegister = false
            this.isLogin = true
          }
        })
        .then((result) => {
          // console.log(localStorage)

          this.email = localStorage.getItem('email')
          this.name = localStorage.getItem('name')
          this.profilePic = localStorage.getItem('profilePic')
          if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
          }
        })

        

      })
      .catch(err => {
        console.log(err)
      })
    },

    logout() {
      Swal.fire({
        title: 'Logout?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          let timerInterval
      Swal.fire({
        title:`Goodbye ${this.name}`,
        timer: 1000,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('strong')
              .textContent = Swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      })
      .then((result) => {
        this.profilePic = ''
        this.email = ''
        this.password = ''
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('profilePic')
        localStorage.removeItem('id')
        if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
            this.isLogin = false
        }
      })
        } else {

        }
      }) 
    },

    register() {
      axios({
        method: 'post',
        url: `http://localhost:3000/register`,
        data : this.newUser,
      })
      .then(({data}) => {
        // console.log(data)
        this.profilePic = this.newUser.profilePic
        this.email = this.newUser.email
        this.password = this.newUser.password
        this.login()
      })
      .catch(err => {
        console.log(err)
      })
    },

    checkLogin() {
      // console.log(localStorage)
      if (localStorage.length > 0) {
        this.isLogin = true
        this.email = localStorage.getItem('email')
        this.name = localStorage.getItem('name')
        this.profilePic = localStorage.getItem('profilePic')
      }
      else {
        this.email = ''
        this.password = ''
      }
    },

    findArticle(articleId) {
      // console.log(articleId)
      this.articleData = {}
      // console.log(this.articleData)
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${articleId}`,
      })
        .then(article => {
          // console.log(article.data.data)
          this.articlesSeen = false;
          this.articleDetail = true; 
          this.articleData = article.data.data
          // console.log(this.articleData)
        })
        .catch(err => {
          console.log(err)
        })
    },

    clearForm() {
      this.newArticle.title = ''
      this.newArticle.img = ''
      this.newArticle.content = ''
    },

    createArticle() {
      axios({
        method: 'post',
        url: `http://localhost:3000/articles`,
        data : {
          title : this.newArticle.title,
          img : this.newArticle.img,
          content : this.newArticle.content,
          author: this.name
        },
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        let timerInterval
        Swal.fire({
          title: 'Posting Article',
          timer: 2500,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = Swal.getTimerLeft()
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        })
        .then((result) => {
          if (
            result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
            console.log(data)
            this.articles.push(data)
            this.getArticles()
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000
            });
            
            Toast.fire({
              type: 'success',
              title: 'Article Posted'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      })
    },

    updateArticle(articleId) {
      axios({
        method: 'put',
        url: `http://localhost:3000/articles/${articleId}`,
        data : {
          title : this.articleData.title,
          img : this.articleData.img,
          content : this.articleData.content,
          author : this.articleData.author
        },
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        let timerInterval
        Swal.fire({
          title: 'Updating Article',
          timer: 1000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = Swal.getTimerLeft()
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
            this.articlesSeen = true; 
            this.editFormSeen = false;
            // console.log(data)
            this.getArticles()
            const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 3000
            });
            
            Toast.fire({
              type: 'success',
              title: 'Article Updated'
            })
          }
        })

        // this.articles.push(data.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    deleteArticle(articleId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
        // console.log(articleId)
        this.articles.map( article => {
          // console.log(article._id, articleId)
          if (article._id !== articleId) {
            return article
          }
        })
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/${articleId}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(data => {
        this.articlesSeen = true
        this.articleFormSeen = false
        this.articleDetail = false;
        this.getArticles()
      })
      .catch(err => {
        console.log(err)
      })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  },

  watch : {
    articles : function() {
      this.articles.map(article => {
        return article
      })

    }
  },

  computed : {
    filteredList() {
      // console.log(this.search.length)
      if (this.search.length > 0) {
        return this.articles.filter(article => {
          return article.title.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        return this.articles
      }
    }
  },
  
  created() {
    this.getArticles()
    this.checkLogin()
  },
})

