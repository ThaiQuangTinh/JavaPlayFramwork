// Handle login form

// Handle when user enter password

const handlePassword = function() {
    const password = document.getElementById('password-ip');
    const showPwEye = document.querySelector('.fa-eye');
    const hidePwEye = document.querySelector('.fa-eye-slash');

    document.getElementById('password-ip').oninput = function(event) {
        showPwEye.style.display = 'inline-block';
        if (event.target.value === '') {
            showPwEye.style.display = 'none';
            hidePwEye.style.display = 'none';
            password.type = 'password';
        }
    };

    document.querySelector('.fa-eye').addEventListener('click', function() {
        if (password.type === 'password') {
            password.type = 'text';
            showPwEye.style.display = 'none';
            hidePwEye.style.display = 'inline-block';
        }
    });

    document.querySelector('.fa-eye-slash').addEventListener('click', function() {
        if (password.type === 'text') {
            password.type = 'password';
            showPwEye.style.display = 'inline-block';
            hidePwEye.style.display = 'none';
        }
    });
};

handlePassword();

// This function is used to get data from login form
const getData = () => {
    let username = document.getElementById('username-ip').value;
    let password = document.getElementById('password-ip').value;

    return {
        Username: username,
        Password: password
    }
}

//Function used to create cookie
const createCookieAccount = function(username, password) {
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (720 * 60 * 1000));
    let expires = "expires=" + expiryDate.toUTCString();
    document.cookie = `usernameCK=${username}; ${expires}`;
    document.cookie = `passwordCK=${password}; ${expires}`;
};

//Function used to get cookie value of users
const getCookieValue = function(cookieName) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

// This function is used to handel when 'remember me' checkbox is checked
const rememberMe = (username, password) => {
    console.log(username, password);
    const chkRememberMe = document.getElementById('chk-remember-user');
    if (chkRememberMe.checked) {
        createCookieAccount(username, password);
    }
}

// This function is used to handle when user click to login button
const handleBtnLoin = () => {
    const btnLogin = document.getElementById('btn-login');
    const messageElement = document.getElementById('message');

    btnLogin.addEventListener('click', function(event) {
        event.preventDefault();
        const data = getData();
        const username = data.Username;
        const password = data.Password;

        if ((username !== '' && password !== '')) {
            messageElement.innerText = '';

            fetch(`http://localhost:9000/isValidUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    if (result) {
                        rememberMe(username, password);
                        messageElement.innerText = '';
                        document.getElementById('login-form').submit();
                    } else {
                        messageElement.innerText = 'Wrong account or password';
                    }
                })
        } else {
            messageElement.innerText = 'Please enter complete information';
        }
    })
}

handleBtnLoin();

document.addEventListener('DOMContentLoaded', function() {
    let usernameCk = getCookieValue('usernameCK');
    let passwordCk = getCookieValue('passwordCK');

    if (usernameCk !== '' && passwordCk !== '') {
        document.getElementById('username-ip').value = usernameCk;
        document.getElementById('password-ip').value = passwordCk;
    }
});