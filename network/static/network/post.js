document.addEventListener('DOMContentLoaded', function() {
      displayBasicView()

      Array.from(document.querySelectorAll('.delete')).forEach(button => 
      button.onclick = delete_post)

      Array.from(document.querySelectorAll('.edit')).forEach(button => 
        button.onclick = editView)

      Array.from(document.querySelectorAll('.compose-form')).forEach(form =>
        form.onsubmit = updatePost)
    })

    function updatePost(e) {
      let post_id = e.target.dataset.post_id
      fetch(`/posts/${post_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
        },
        body: JSON.stringify({
          body: document.querySelector(`.compose-body[data-post_id="${post_id}"]`).value,
        })
      })
      .then(response => response.json())
      .then(result => {
        document.querySelector(`.compose-body[data-post_id="${post_id}"]`).value = result.body
      })
    }


    function editView(e) {
      let post_id = e.target.dataset.post_id
      document.querySelector(`.post_body[data-post_id="${post_id}"]`).style.display = 'none'
      document.querySelector(`.edit-view[data-post_id="${post_id}"]`).style.display = 'block'
    }
    

    function delete_post(e) {
      let post_id = e.target.dataset.post_id
  
      fetch(`/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
         }
      })
      .then(result => {
        document.querySelector(`.post[data-post_id="${post_id}"]`).remove()
      });
    }

    function displayBasicView() {
      Array.from(document.querySelectorAll('.post_bobdy')).forEach(div => div.style.display = 'block')
      Array.from(document.querySelectorAll('.edit-view')).forEach(div => div.style.display = 'none')
    }
  