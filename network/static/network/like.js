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

    fetch('/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user_id,
        post: post_id,
      })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        let old_count = document.querySelector(`#likes_count_${post_id}`).dataset.all_likes
        old_count = parseInt(old_count)
        let new_count = old_count + 1
        document.querySelector(`#likes_count_${post_id}`).innerHTML = `❤️${new_count}`
        this.style.display = 'none'
        document.querySelector(`.unlike_button[data-post_id="${post_id}"]`).style.display = 'block'
    });
  }

  function unlike(e) {
    let post_id = e.target.dataset.post_id
    let user_id = e.target.dataset.user_id

  }

  function diplayButtons() {
    Array.from(document.querySelectorAll('.unlike_button')).forEach(button => button.style.display = 'none')
  }
