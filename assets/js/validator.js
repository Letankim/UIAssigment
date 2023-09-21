// hàm validation
function validation(options) {
// get parent 
   function getParent(element, selector) {
        if(element) {
            while (element.parentElement) {
                if(element.parentElement.matches(selector)) {
                    return element.parentElement;
                }
                element = element.parentElement;
            }
        }
        return null;
   }
// hàm xử lí fullname
var selectorRules = {};
function validate(inputElement, rule) {
    var errorMessage;
    var messageElement = getParent(inputElement, options.formGroup).querySelector(options.errorsSelector);
// lấy ra các rudes của selector
    var rules = selectorRules[rule.selector];
// lập qua từng rule và ktra
// if có lỗi dừng việc kiểm tra
    for(var i = 0; i < rules.length; i++) {
        switch(inputElement.type) {
            case 'radio':
            case 'checkbox':
                errorMessage = rules[i](
                    formElement.querySelector(rule.selector + ':checked')
                );
                break;
            default:
                errorMessage = rules[i](inputElement.value);

        }
        if(errorMessage) break;
    }
    if(errorMessage) {
         messageElement.innerText = errorMessage;
        if(getParent(inputElement, options.formGroup)) {
        getParent(inputElement, options.formGroup) .classList.add('invalid');
        }
        
    }
    else {
        messageElement.innerText = '';
        if(getParent(inputElement, options.formGroup)) {
            getParent(inputElement, options.formGroup).classList.remove('invalid');
        }
    }
    return !errorMessage;
}
// hàm xử lý hi người dùng nhập lại dữ liệu vào 
function validateRepeat(inputElement) {
        var messageElement = getParent(inputElement, options.formGroup).querySelector(options.errorsSelector);
        messageElement.innerText = '';
        getParent(inputElement, options.formGroup).classList.remove('invalid');
}
// lấy element của form cần validate
   var formElement = document.querySelector(options.form);
   if(formElement) {
    //    khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();
    // lập qua tưng rude và thực hiện 
        var isFormValid = true;
        options.rules.forEach(function(rule) {
            var inputElement = document.querySelector(rule.selector);
            var isValid = validate(inputElement, rule);
            if(!isValid) {
                isFormValid = false;
            };
        });
     
    // xử lí dữ liệu nhận về
        if (isFormValid) {
        // submit với Javascript
            if (typeof options.onsubmit === 'function') {
                var enabledInput = formElement.querySelectorAll('[name]:not(disabled)');
                var dataInput = [...enabledInput].reduce(function(values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name = "'+input.name+ '"]:checked').value;
                            break;
                        case 'checkbox':
                           if (!input.matches(':checked')) {
                            return values;
                           }
                           if(!Array.isArray(values[input.name])) {
                            values[input.name] = [];
                           }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default: 
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});
                options.onsubmit(dataInput);
            }
        // submit với mặc định
            else {
                formElement.submit();
            }
        } 
    }
    //   lập qua mỗi rude và xử lí
        options.rules.forEach(function(rule) {
          var inputElements = document.querySelectorAll(rule.selector);
          [...inputElements].forEach(inputElement => {
        //  xử lý khi người dùng onblur ra ngoài
                inputElement.onblur = function() {
                validate(inputElement, rule);
                }
        //   xử lí khi người dùng nhập lại dữ liệu
                inputElement.oninput = function() {
                validateRepeat(inputElement, rule);
                }
          })
        //  lưu các rules cho  
        if(Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }
       });
   }
}

validation.isRequired = function(selector, message) {
   return {
      selector: selector,
      test: function(value) {
          return value ? undefined : message || "Vui lòng điền vào trường này"
      }
   };
}

validation.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Trường này phải là email"
        }
     };
}
validation.isMinLeght = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length > min ? undefined : message || `Vui lòng nhập lớn hơn ${min} kí tự`
        }
     };
}

validation.isConfirmation = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}
