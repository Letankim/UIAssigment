


function getCheck(formId) {
    check.form=formId;
    validation(check);
}

const check = {
    form: "",
    formGroup: ".form-group",
    errorsSelector: ".form-message",
    rules: [
        validation.isRequired('#fullname'),
        validation.isRequired('#email'),
        validation.isEmail('#email'),
        validation.isRequired('#password'),
        validation.isMinLeght('#password', 6),
        validation.isRequired('#password_confimation'),
        validation.isConfirmation('#password_confimation', function () {
            return document.querySelector(`${form} #password`).value;
        },
            // chỉnh sưa thông báo
            'Nhập lại password không chính xác'
        )
    ],
    onsubmit: ""
};

// show / hide form login
const elementToHide = document.getElementById("register-active-show");
const showFormLogin = document.getElementById("login-active-show");
window.addEventListener('hashchange', function () {
    handelShowForm();
});

// Đảm bảo rằng khi trang được tải, phần tử "register-active-show" có trạng thái hiển thị ban đầu phù hợp
window.addEventListener('load', function () {
    handelShowForm();
});

const handelShowForm = () => {
    let hash = window.location.hash;
    if (hash === "#pills-register") {
        document.querySelector("title").innerHTML = "Register";
        document.getElementById("tab-login").classList.remove("active");
        document.getElementById("tab-register").classList.add("active");
        document.getElementById("pills-login").classList.remove("active", "show");
        
        // Hiển thị phần tử "register-active-show"
        elementToHide.style.display = "block"; // Hoặc "inline" hoặc giá trị hiển thị mong muốn
        showFormLogin.style.display = "none";
    } else {
        document.querySelector("title").innerHTML = "Login";
        document.getElementById("tab-login").classList.add("active");
        document.getElementById("tab-register").classList.remove("active");
        document.getElementById("pills-login").classList.add("active", "show");
        // Ẩn phần tử "register-active-show"
        elementToHide.style.display = "none";
        showFormLogin.style.display = "block";
    }
}

