import { http } from "./http";
import { ui } from "./ui";
document.addEventListener('DOMContentLoaded', getPost);


// add post

document.querySelector('#post-it').addEventListener('click', submitPost);

document.querySelector('#post').addEventListener('click', actionPost);

document.querySelector('.card-form').addEventListener('click', cancelEdit);

// get post handler

function getPost() {

  http.get('http://localhost:3000/post')
  .then(posts => ui.showPosts(posts))
  .catch(err => console.log(err));

}



// submit post handler

function submitPost() {

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;

  const data = {

    title,
    body

  }

  if(ui.state === "add") {

    if(title === '' || body === '') {
      ui.showAlert('Please inser the following fields...', 'alert alert-danger');
    } else {

      http.post('http://localhost:3000/post', data)
      .then(data => {
    
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearField();
        getPost();
    
      })
      .catch(err => console.log(err));

    }

  } else if(ui.state === "edit") {

    const id = document.querySelector('#id').value;

    http.put(`http://localhost:3000/post/${id}`, data)
    .then(data => {

        ui.showAlert('Post was updated...', 'alert alert-success');

        ui.changeState('add');

        getPost();

    });



  }


}



function actionPost(e) {

  e.preventDefault();

  const id = e.target.parentElement.dataset.id;

  if(e.target.parentElement.classList.contains('delete')) {

    if(confirm('Are you sure that you want delete?')) {

      http.delete(`http://localhost:3000/post/${id}`)
      .then(data => {
        
        ui.showAlert('Post was Deleted...', 'alert alert-warning');

        getPost();

        ui.changeState('add');
        
      }).catch(err => console.log(err));

    }

  } else if (e.target.parentElement.classList.contains('edit')) {

    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {

      id,
      title,
      body

    }    

    ui.fillForm(data);

    ui.changeState('edit');

  }

}


function cancelEdit(e) {

  e.preventDefault();

  if(e.target.classList.contains('cancel-button')) {

    ui.changeState('add');

  }

}