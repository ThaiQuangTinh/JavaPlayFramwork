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

// This function is used to read cookies
const getCookie = (name) => {
    const cookieArray = document.cookie.split(';');
    for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

// This function is used to set username and password
const setUsAndPw = () => {
    let username = document.getElementById('username-ip');
    let password = document.getElementById('password-ip');

    username.value = getCookie('username');
    password.value = getCookie('password');
}

setUsAndPw();

// This function is used to get data from login form
const getData = () => {
    let username = document.getElementById('username-ip').value;
    let password = document.getElementById('password-ip').value;

    return {
        Username: username,
        Password: password
    }
}

// This function is used to create cookie
function createCookie(name, value, minutes) {
    var expires = "";

    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

// This function is used to handel when 'remember me' checkbox is checked
const rememberMe = (username, password) => {
    const chkRememberMe = document.getElementById('chk-remember-user');
    chkRememberMe.addEventListener('change', function() {
        if (chkRememberMe.checked) {
            createCookie('username', username, 1);
            createCookie('password', password, 1);
        }
    })
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

            fetch(`http://localhost:9000/isValidUser?username=${data.Username}&password=${data.Password}`)
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