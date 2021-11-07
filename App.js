var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from "react";

var useValidation = function useValidation(value, validations) {
    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        isEmpty = _useState2[0],
        setEmpty = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        minLengthError = _useState4[0],
        setMinLengthError = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        maxLengthError = _useState6[0],
        setMaxLengthError = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        emailError = _useState8[0],
        setEmailError = _useState8[1];

    var _useState9 = useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        inputValid = _useState10[0],
        setInputValid = _useState10[1];

    useEffect(function () {
        for (var validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
                    break;
                case 'isEmail':
                    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break;

            }
        }
    }, [value]);

    useEffect(function () {
        if (isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError]);

    return {
        isEmpty: isEmpty,
        minLengthError: minLengthError,
        emailError: emailError,
        maxLengthError: maxLengthError,
        inputValid: inputValid
    };
};

var useInput = function useInput(initialValue, validations) {
    var _useState11 = useState(initialValue),
        _useState12 = _slicedToArray(_useState11, 2),
        value = _useState12[0],
        setValue = _useState12[1];

    var _useState13 = useState(false),
        _useState14 = _slicedToArray(_useState13, 2),
        isDirty = _useState14[0],
        setDirty = _useState14[1];

    var valid = useValidation(value, validations);

    var onChange = function onChange(e) {
        setValue(e.target.value);
    };

    var onBlur = function onBlur(e) {
        setDirty(true);
    };

    return Object.assign({
        value: value,
        onChange: onChange,
        onBlur: onBlur,
        isDirty: isDirty
    }, valid);
};

function App() {
    var email = useInput('', { isEmpty: true, minLength: 3, maxLength: 10 });
    var password = useInput('', { isEmpty: true, minLength: 5, maxLength: 8 });

    if (email.isDirty && email.isEmpty && !email.maxLengthError) {
        document.querySelector('.email').classList.add('empty');
    } else if (email.isDirty && email.minLengthError) {
        document.querySelector('.email').classList.add('filled');
    } else if (email.isDirty && email.maxLengthError) {
        document.querySelector('.email').classList.add('empty');
    }

    if (password.isDirty && password.isEmpty && !password.maxLengthError) {
        document.querySelector('.password').classList.add('empty');
    } else if (password.isDirty && password.minLengthError) {
        document.querySelector('.password').classList.add('filled');
    } else if (password.isDirty && password.maxLengthError) {
        document.querySelector('.password').classList.add('empty');
    }

    return React.createElement(
        'div',
        { className: 'loginPanel' },
        React.createElement(
            'form',
            { id: 'login', name: 'login', action: '#', method: 'post' },
            React.createElement(
                'h1',
                null,
                '\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443'
            ),
            React.createElement(
                'div',
                { className: 'inputs' },
                React.createElement(
                    'div',
                    { className: 'InputBlock titles' },
                    email.isDirty && email.isEmpty && React.createElement(
                        'div',
                        { className: 'descr' },
                        '\u041F\u043E\u043B\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C'
                    ),
                    email.isDirty && !email.minLengthError && !email.maxLengthError && React.createElement(
                        'div',
                        { className: 'sucsess' },
                        '\u0423\u0441\u043F\u0435\u0448\u043D\u043E'
                    ),
                    email.isDirty && email.maxLengthError && React.createElement(
                        'div',
                        { className: 'long' },
                        '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E'
                    ),
                    React.createElement('input', {
                        className: 'email',
                        onChange: function onChange(e) {
                            return email.onChange(e);
                        },
                        onBlur: function onBlur(e) {
                            return email.onBlur(e);
                        },
                        value: email.value,
                        name: 'email',
                        type: 'text',
                        placeholder: '\u041B\u043E\u0433\u0438\u043D'
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'InputBlock titles' },
                    password.isDirty && password.isEmpty && React.createElement(
                        'div',
                        { className: 'descr' },
                        '\u041F\u043E\u043B\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C'
                    ),
                    password.isDirty && !password.minLengthError && !password.maxLengthError && React.createElement(
                        'div',
                        { className: 'sucsess' },
                        '\u0423\u0441\u043F\u0435\u0448\u043D\u043E'
                    ),
                    password.isDirty && password.maxLengthError && React.createElement(
                        'div',
                        { className: 'long' },
                        '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E'
                    ),
                    React.createElement('input', {
                        className: 'password',
                        onChange: function onChange(e) {
                            return password.onChange(e);
                        },
                        onBlur: function onBlur(e) {
                            return password.onBlur(e);
                        },
                        value: password.value,
                        name: 'password',
                        type: 'password',
                        placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C'
                    })
                )
            ),
            React.createElement(
                'button',
                {
                    type: 'submit',
                    name: 'submit',
                    disabled: !email.inputValid || !password.inputValid },
                '\u0412\u043E\u0439\u0442\u0438'
            )
        )
    );
}

export default App;