document.addEventListener('DOMContentLoaded', function() {
  Array.from(document.querySelectorAll('.like_button')).forEach(button => 
    button.onclick = like)

    Array.from(document.querySelectorAll('.unlike_button')).forEach(button => 
      button.onclick = unlike)
  
    diplayButtons()
  })

   
  function like(e) {
    let post_id = e.target.dataset.post_id
    let user_id = e.target.dataset.user_id

    fetch('/likes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      },
      body: JSON.stringify({
        user: user_id,
        post: post_id,
      })
    })
    .then(response => response.json())
    .then(result => {
        let old_count = document.querySelector(`#likes_count_${post_id}`).dataset.all_likes
        old_count = parseInt(old_count)
        let new_count = old_count + 1
        document.querySelector(`#likes_count_${post_id}`).innerHTML = `❤️${new_count}`
        this.style.display = 'none'
        document.querySelector(`#likes_count_${post_id}`).dataset.all_likes = new_count
        document.querySelector(`.unlike_button[data-post_id="${post_id}"]`).style.display = 'block'
    });
  }

  
  function unlike(e) {
    let post_id = e.target.dataset.post_id
    let user_id = e.target.dataset.user_id

    fetch(`/likes/?user=${user_id}&post=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
       }
    })
    .then(response => response.json())
    .then(result => {
      fetch(`/likes/${result[0].id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
         }
      })
      .then(result => {
          let old_count = document.querySelector(`#likes_count_${post_id}`).dataset.all_likes
          old_count = parseInt(old_count)
          let new_count = old_count - 1
          document.querySelector(`#likes_count_${post_id}`).dataset.all_likes = new_count
          document.querySelector(`#likes_count_${post_id}`).innerHTML = `❤️${new_count}`
          this.style.display = 'none'
          document.querySelector(`.like_button[data-post_id="${post_id}"]`).style.display = 'block'
      });
    });
  }


  function diplayButtons() {
    const user_id = JSON.parse(document.getElementById('user_id').textContent);
    fetch( `/likes/?user=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
       }
    })
    .then(response => response.json())
    .then(result => {
    Array.from(document.querySelectorAll('.like_button')).forEach(button => button.style.display = 'block')
    Array.from(document.querySelectorAll('.unlike_button')).forEach(button => button.style.display = 'none')
      for(var i=0; i<result.length; i++) {
        document.querySelector(`.like_button[data-post_id="${result[i].post}"]`).style.display = 'none'
        document.querySelector(`.unlike_button[data-post_id="${result[i].post}"]`).style.display = 'block'
      }
    })
    Array.from(document.querySelectorAll('.like_button')).forEach(button => button.style.display = 'block')
    Array.from(document.querySelectorAll('.unlike_button')).forEach(button => button.style.display = 'none')
  }
