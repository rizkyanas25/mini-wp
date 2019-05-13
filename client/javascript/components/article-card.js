Vue.component('articlecard', {
  props: ['article'],
  template : `
  <div>
    <a id="article-title" href="" v-on:click.prevent="$emit('find-article', article._id)"><img v-bind:src="article.img" class="img-fluid mw-50%">
    <div class="card-header bg-secondary" >{{article.title}}</div></a>
    <div class="card-body">
      <div class="d-flex justify-content-around" style=" margin-top: -10px; margin-bottom: 10px" >
        <p class="detail"><i class="far fa-user"></i> {{article.author}}</p>
        <p class="detail"><i class="far fa-clock"></i> {{article.postedAt.substring(0,10)}}</p>
      </div>
      <p class="card-text">{{article.content.substring(0,100)+"..."}}</p>
    </div>
  </div>
  `,
})