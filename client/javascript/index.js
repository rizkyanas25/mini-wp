function truncateText(selector, maxLength) {
  var element = document.querySelector(selector),
      truncated = element.innerText;

  if (truncated.length > maxLength) {
      truncated = truncated.substr(0,maxLength) + '...';
  }
  return truncated;
}

document.querySelector('p').innerText = truncateText('p', 50);

function articles() {
  $("#article-container").append(`
  <h1>Articles</h1>
  `)
  for (let i = 0; i < 5; i++) {
    $("#article-container").append(`
    <div id="articles">
      <div class="card bg-dark mb-3 mr-5" style="max-width: 18rem;">
        <div class="card-header">Apakah Lorem Ipsum itu?</div>
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <h6 class="card-title">Posted: 05/05/2019 </h6>
        </div>
      </div>
      <div class="card bg-dark mb-3 mr-5" style="max-width: 18rem;">
        <div class="card-header">Apakah Lorem Ipsum itu?</div>
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <h6 class="card-title">Posted: 05/05/2019 </h6>
        </div>
      </div>
      <div class="card bg-dark mb-3 mr-5" style="max-width: 18rem;">
        <div class="card-header">Apakah Lorem Ipsum itu?</div>
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <h6 class="card-title">Posted: 05/05/2019 </h6>
        </div>
      </div>
    </div>
    `)
  }
  
}

$(document).ready(() => {
  console.log('ready')
  $("#article-container").empty()
  articles()
  $("#article-form").hide()

  $("#new-article").click(() => {
    event.preventDefault()
    $("#article-container").empty()
    $("#article-container").hide()
    $("#search").hide()
    $("#article-form").show()

  })

  $("#logo").click(() => {
    event.preventDefault()
    $("#article-container").empty()
    articles()
    $("#article-container").show()
    $("#search").show()
    $("#article-form").hide()

  })
})