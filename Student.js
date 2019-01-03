'use strict'
const signUpForm = document.getElementById('signUpForm');
const studPage = document.getElementById('studPage');
const studTitle = document.getElementById('studTitle');
const studDetels = document.getElementById('studDetels');
const cuorseForm = document.getElementById('cuorseForm');
const cuorsList = document.getElementById('cuorsList');


class Student {
    constructor(_name, _password, _course, _cNunber, _lectuer, _houers) {
        this.name = _name;
        this.password = _password;
        this.course = _course;
        this.cNunber = _cNunber;
        this.lectuer = _lectuer;
        this.houers = _houers;
    }

    loginTolocal() {
        if (localStorage.studLogin) {
            localStorage.removeItem(studLogin);
        }
        let studLogin = {
            'userName': this.name,
            'passWord': this.password
        };
        localStorage.setItem('studLogin', JSON.stringify(studLogin));
    }
    courseTolocal() {
        let studCourse = {
            'course': this.course,
            'cNunber': this.cNunber,
            'lectuer': this.lectuer,
            'houers': this.houers
        };
        localStorage.setItem('studCourse', JSON.stringify(studCourse));
    }
}

function onLoad() {
    let loing = JSON.parse(localStorage.getItem('studLogin'));
    location.hash = localStorage.studLogin ? '#table' : '';
    studTitle.innerHTML = loing.userName;
    pageHandle();
    setData(0);
}

var studetnObj = new Student();

function getData(form) {
    if (form == 1) {
        studetnObj.name = document.forms.signUp.name.value;
        studetnObj.password = document.forms.signUp.password.value;
        studetnObj.loginTolocal();
    }
    else {
        studetnObj.course = document.forms.course.courseName.value;
        studetnObj.cNunber = document.forms.course.courseNum.value;
        studetnObj.lectuer = document.forms.course.lecturerName.value;
        studetnObj.houers = document.forms.course.hourNum.value;
        studetnObj.courseTolocal();
    }
    setData(form);
}

function setData(form) {
    if (form == 1) {
        let loing = JSON.parse(localStorage.getItem('studLogin'));
        studTitle.innerHTML = loing.userName;
        location.hash = "cuorse";
    }
    else {
        let course = JSON.parse(localStorage.getItem('studCourse'));
        let td = '<td>' +
            course.cNunber + '</td> <td>' +
            course.course + '</td><td>' +
            course.houers + '</td><td>' +
            course.lectuer + '</td>';

        cuorsList.innerHTML = td;
        location.hash = "table";
    }
    pageHandle();
}

function pageHandle() {
    let loct = location.hash;
    switch (loct) {
        case "#cuorse":
            studDetels.style.display = 'none';
            signUpForm.style.display = 'none';
            studPage.style.display = 'block';
            cuorseForm.style.display = 'block'
            break;
        case "#table":
            cuorseForm.style.display = 'none'
            signUpForm.style.display = 'none';
            studPage.style.display = 'block';
            studDetels.style.display = 'block';
            break;
        case "#":
        default:
            studDetels.style.display = 'none';
            studPage.style.display = 'none';
            signUpForm.style.display = 'block';
            break;
    }
}