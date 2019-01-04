'use strict'
const signUpForm = document.getElementById('signUpForm');
const studPage = document.getElementById('studPage');
const studTitle = document.getElementById('studTitle');
const studDetels = document.getElementById('studDetels');
const cuorseForm = document.getElementById('cuorseForm');
const cuorsList = document.getElementById('cuorsList');
const elem = document.getElementsByTagName('td');




/// Student Obj
class Student {
    constructor(_name, _password, _course, _cNunber, _lectuer, _houers) {
        this.name = _name;
        this.password = _password;
        this.course = _course;
        this.cNunber = _cNunber;
        this.lectuer = _lectuer;
        this.houers = _houers;
    }

    loginTolocal() { // insert user name and pass to loacal
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
    if (localStorage.studLogin) {
        let loing = JSON.parse(localStorage.getItem('studLogin'));
        studTitle.innerHTML = loing.userName;
        setData(0);
    }
    location.hash = localStorage.studLogin ? '#table' : '';
    pageHandle();
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
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener("click", function () {
                editTab(i);
            })
        }
    }
    pageHandle();
}

function editTab(tab){
    var person = prompt("Please enter your name:", "Harry Potter");
}

function deleteHandle(arg) {
    var aprove = confirm("Do you wish to Delete ?");
    if (arg === 0) { // 0 delete all student arg from local
        deletStudent(aprove).then(function (result) {
            localStorage.clear();
             onLoad();
        }), function (error) {
            console.log(error);
        };
    }
    if (arg === 1) {//  1 delete only cuorse arg from local
        deletCuorse(aprove).then(function (result) {
            localStorage.removeItem('studCourse');
            while (cuorsList.firstChild) {
                cuorsList.removeChild(cuorsList.firstChild);
            }

        }), function (error) {
            console.log(error);
        }
    }
}

function deletCuorse(confirm) {
    var myPromise = new Promise(function (resolve, reject) {
        if (confirm) {
            resolve();
        }
        else {
            reject('deletCuorse Not aprove');
        }
    })
    return myPromise;
}

function deletStudent(confirm) {
    var myPromise = new Promise(function (resolve, reject) {
        if (confirm) {
            resolve();
        }
        else {
            reject('deletStudent Not aprove');
        }
    })
    return myPromise;
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