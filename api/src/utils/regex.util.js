export const usernameValidator = (username) => {
    return username ? (/^[a-zA-Z0-9\-]+$/).test(username) : false;
}

export const emailValidator = (email) => {
    return email ? (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) : false;
}

// one digit, lower case, upper case , 8 characters
export const passwordValidator = (password) => {
    return password ? (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(password) : false;
}

