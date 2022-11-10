export const usernameValidator = (username) => {
    return username ? username.match(/^[a-zA-Z0-9\-]+$/) : false;
}

export const emailValidator = (email) => {
    return email ? email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) : false;
}

// one digit, lower case, upper case , 8 characters
export const passwordValidator = (password) => {
    return password ? password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) : false;
}

export const phoneValidator = (phoneNumber) => {
    return phoneNumber ? phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) : false;
}