document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let isValid = true;

     document.getElementById('username-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('subject-error').textContent = '';

    // Username 
    const username = document.getElementById('username').value;
    const nameRegex = /^[A-Za-z]{3,}$/;
    if (username.trim() === '') {
        document.getElementById('username-error').textContent = 'Please enter your name.';
        document.getElementById('username-error').style.color = 'red';
        document.getElementById('username-error').style.marginBottom = '5px';
        isValid = false;
    }else if (!nameRegex.test(username)) {
        document.getElementById('username-error').textContent = 'Please enter a valid name with at least 3 characters.';
        document.getElementById('username-error').style.color = 'red';
        document.getElementById('username-error').style.marginBottom = '5px';
        isValid = false;
    }

    
    const email = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        document.getElementById('email-error').style.color = 'red';
        document.getElementById('email-error').style.marginBottom = '5px';
        isValid = false;
    }
     
    const subject = document.getElementById('subject').value;
    if (subject.trim() === '') {
        document.getElementById('subject-error').textContent = 'Please enter a Message.';
        document.getElementById('subject-error').style.color = 'red';
        document.getElementById('subject-error').style.marginBottom = '5px';
        isValid = false;
    }else if(subject.length <= 10){
        document.getElementById('subject-error').textContent = 'Message must be at least 10 characters.';
        document.getElementById('subject-error').style.color = 'red';
        document.getElementById('subject-error').style.marginBottom = '5px';
        isValid = false;
    }
     if (isValid) {
         console.log('Form is valid');
         document.getElementById('username').value = '';
         document.getElementById('email').value = '';
         document.getElementById('subject').value = '';
         
          document.getElementById('username-error').textContent = '';
         document.getElementById('email-error').textContent = '';
         document.getElementById('subject-error').textContent = ''
     } else {
        console.log('Form is invalid');
    }
});


document.getElementById('username').addEventListener('input', function() {
    const username = this.value;
    const usernameError = document.getElementById('username-error');
    const nameRegex = /^[A-Za-z]{3,}$/;
    
    if (username.trim() === '') {
        usernameError.textContent = 'Please enter your name.';
        usernameError.style.color = 'red';
    } else if (!nameRegex.test(username)) {
        usernameError.textContent = 'Please enter a valid name with at least 3 characters.';
        usernameError.style.color = 'red';
    } else {
        usernameError.textContent = ''; 
    }
});

document.getElementById('email').addEventListener('input', function() {
    const email = this.value;
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.color = 'red';
    } else {
        emailError.textContent = ''; // Clear error message if valid
    }
});

document.getElementById('subject').addEventListener('input', function() {
    const subject = this.value;
    const subjectError = document.getElementById('subject-error');
    
    if (subject.trim() === '') {
        subjectError.textContent = 'Please enter a message.';
        subjectError.style.color = 'red';
    } else if (subject.length <= 10) {
        subjectError.textContent = 'Message must be at least 10 characters.';
        subjectError.style.color = 'red';
    } else {
        subjectError.textContent = ''; // Clear error message if valid
    }
});

// //////////////////////////////////////////////
 

 
document.getElementById('subscription-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let isValid = true;

    // Check Name field
    const username = document.getElementById('SubUser');
    const usernameError = document.getElementById('name-error');
    if (username.value.trim() === '') {
        username.setCustomValidity('Please enter your name.');
        isValid = false;
    } else if (username.value.length < 3) {
        username.setCustomValidity('Name must be at least 3 characters.');
        isValid = false;
    } else {
        username.setCustomValidity('');  
        usernameError.textContent = '';  
    }

    // Check Email field
    const email = document.getElementById('SubEmail');
    const emailError = document.getElementById('Subemail-error');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        email.setCustomValidity('Please enter a valid email address. Email@gmail.com');
        
        isValid = false;
    } else {
        email.setCustomValidity('');  
        emailError.textContent = ''; 
    }

     if (isValid) {
        console.log('Form is valid');
        document.getElementById('SubUser').value = '';
        document.getElementById('SubEmail').value = '';
    } else {
        console.log('Form is invalid');
    }
});

// Real-time validation for Name field
document.getElementById('SubUser').addEventListener('input', function() {
    const username = this;
    if (username.value.trim() === '') {
        username.setCustomValidity('Please enter your name.');
    } else if (username.value.length < 3) {
        username.setCustomValidity('Name must be at least 3 characters.');
    } else {
        username.setCustomValidity('');  
        
    }
});
document.getElementById('SubEmail').addEventListener('input', function() {
    const email = this;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        email.setCustomValidity('Please enter a valid email address.');
    } else {
        email.setCustomValidity('');  
     }
});
 