document.getElementById('login-btn').addEventListener('click',function(){
    // 1: get the username input
    const inputUsername = document.getElementById("login-username");
    const username = inputUsername.value;
    console.log(username);

    // 2: get the password input
    const inputPassword = document.getElementById("login-password");
    const password = inputPassword.value;
    console.log(password);

    // 3: match username and password number
    if(username=='admin' && password == 'admin123'){
        
        alert('Login Successful');
        window.location.assign('./home.html')
    }
    else{
        alert('Login Unsuccessful')
        return;
    }

})