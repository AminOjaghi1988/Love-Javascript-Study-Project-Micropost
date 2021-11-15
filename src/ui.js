class UI {

    constructor() {

        this.post = document.querySelector('#post');
        this.titleInput = document.querySelector('#post-title');
        this.bodyInput = document.querySelector('#post-body');
        this.postButton = document.querySelector('#post-it');
        this.id = document.querySelector('#id');
        this.endForm = document.querySelector('.end-form');
        this.state = 'add';
        
    }

    showPosts(posts) {

        let output = '';

        posts.forEach(post => {

            output += `
            <div class="card mt-2 mb-2">
        <div class="card-body bg-light">
          <h3 class="card-title">${post.title}</h3>
          <p class="lead card-text">${post.body}</p>
          <a href="#" class="card-link edit" data-id="${post.id}"><i class="fas fa-pencil-alt"></i></a>
          <a href="#" class="card-link delete" data-id="${post.id}"><i class="fas fa-times"></i></a>
        </div>
      </div>`

        });

        this.post.innerHTML = output;

    }

    showAlert(message, classname) {

        this.clearAlert();

        const div = document.createElement('div');
        
        div.id = "jump"
        div.className = classname;
        div.textContent = message;

        const container = document.querySelector('.post-container');

        container.insertBefore(div, this.post);

        setTimeout(()=>{this.clearAlert()},4000);

    }

    clearAlert() {

        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {

            currentAlert.remove();

        }

    }

    clearField() {

        this.titleInput.value = '';
        this.bodyInput.value = '';

    }

    fillForm(data) {

        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.id.value = data.id;

    }

    changeState(type) {

        if(type === 'edit') {

            this.state = 'edit';

            this.postButton.textContent = "Update Post";
            this.postButton.className = "btn btn-warning btn-block";
            if(!document.querySelector('.cancel-button')) {

                const cancelButton = document.createElement('button');

                cancelButton.textContent = "Cancel";
                cancelButton.className = "btn btn-light btn-block cancel-button m-3 mt-0"; 
                
                const cardForm = document.querySelector('.card-form');
    
                cardForm.insertBefore(cancelButton, this.endForm);

            }

        } else if(type === 'add') {

            this.state = 'add';

            this.postButton.className = "btn btn-primary btn-block";

            this.postButton.textContent = 'Post it'

            if(document.querySelector('.cancel-button')) {

                document.querySelector('.cancel-button').remove();

            }

            this.clearField();

        }

    }

}

export const ui = new UI();