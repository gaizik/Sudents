'use strict'
const signUpForm = document.getElementById('signUpForm');
const studPage = document.getElementById('studPage');
const studTitle = document.getElementById('studTitle')
class Student {
    constructor(_name, _password) {
        this.name = _name;
        this.password = _password;
    }

}

let studetnObj = new Student();
function getData() {
    var name = document.forms.signUp.name.value;
    var password = document.forms.signUp.password.value;
    studetnObj.name = name;
    studetnObj.password = password;
    setData(studetnObj);
    console.log(studetnObj);
}

function setData(studArg) {
    localStorage.setItem(studArg.name, studArg.password);
    studTitle.innerHTML = studArg.name;
    location.hash = "stud";
    pageHandle();
}

function pageHandle() {
    var loct = location.hash;
    switch (loct) {
        case "#stud":
            signUpForm.style.display = 'none';
            studPage.style.display = 'block';
            break;

        default:
            break;
    }
}