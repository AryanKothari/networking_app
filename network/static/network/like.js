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
        document.querySelector(`.unlike_button[data-post_id="${post_id}"]`).dataset.unlikeID = result.id
    });
  }

  function unlike(e) {
    let post_id = e.target.dataset.post_id
    let unlikeID = e.target.dataset.unlikeID

    fetch(`/likes/${unlikeID}`, {
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
  }

  function diplayButtons() {
    fetch('/likes/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
       }
    })
    .then(response => response.json())
    .then(result => {
      result.forEach(post => {

      })
    })
    Array.from(document.querySelectorAll('.like_button')).forEach(button => button.style.display = 'block')
    Array.from(document.querySelectorAll('.unlike_button')).forEach(button => button.style.display = 'none')
  }
