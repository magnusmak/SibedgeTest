 import React, { useEffect, useState } from "react";

 const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    

     useEffect(() => {
         for (const validation in validations) {
             switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;


             }
         }

     }, [value])

     useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || emailError){
            setInputValid(false)
        } else {
            setInputValid(true)
        }
     }, [isEmpty, maxLengthError, minLengthError, emailError])

     return {
         isEmpty,
         minLengthError,
         emailError,
         maxLengthError,
         inputValid
     }
 }
        


 
 const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
    setValue(e.target.value)

    }

    const onBlur = (e) => {
    setDirty(true)

    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
  }

function App() {
    const email = useInput('', {isEmpty: true, minLength: 3, maxLength: 25})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})


    if (email.isDirty && email.isEmpty && !email.maxLengthError) {
        document.querySelector('.email').classList.add('empty')
    } else if (email.isDirty && email.minLengthError) {
        document.querySelector('.email').classList.add('filled')
    } else if (email.isDirty && email.maxLengthError) {
        document.querySelector('.email').classList.add('empty')
    } 
    
    if (password.isDirty && password.isEmpty && !password.maxLengthError) {
        document.querySelector('.password').classList.add('empty')
    } else if (password.isDirty && password.minLengthError) {
        document.querySelector('.password').classList.add('filled')
    } else if (password.isDirty && password.maxLengthError) {
        document.querySelector('.password').classList.add('empty')
    } 

    
    function handleClick(e) {
        e.preventDefault()
        document.querySelector('.inputs').style.display='none'
        document.querySelector('button').style.display='none'
        document.querySelector('.helloBlock').style.display='block'

    }

  return (
    <div className="loginPanel">
                <form id="login" name="login" action="#" method="post">
                    <h1>Вход в систему</h1>
                    <div className="inputs">
                        <div className="InputBlock titles">
                            {(email.isDirty && email.isEmpty) && <div className='descr'>Поле не может быть пустым</div>}
                            {(email.isDirty && !email.minLengthError && !email.maxLengthError) && <div className='sucsess'>Успешно</div>}
                            {(email.isDirty && email.maxLengthError) && <div className='long'>Слишком длинно</div>}
                            {/* {(email.isDirty && email.emailError) && <div style={{color:'red'}}>Недопустимый эмейл</div>} */}
                            <input 
                                className="email"
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                                value={email.value}
                                name="email" 
                                type="text" 
                                placeholder="Логин" 
                            />
                        </div>
                        <div className="InputBlock titles">
                            {(password.isDirty && password.isEmpty) && <div className='descr'>Поле не может быть пустым</div>}
                            {(password.isDirty && !password.minLengthError && !password.maxLengthError) && <div className='sucsess'>Успешно</div>}
                            {(password.isDirty && password.maxLengthError) && <div className='long'>Слишком длинно</div>}
                            <input 
                                className="password"
                                onChange = {e => password.onChange(e)}
                                onBlur = {e => password.onBlur(e)}
                                value = {password.value}
                                name="password" 
                                type="password" 
                                placeholder="Пароль" 
                            /> 
                            
                        </div>
                    </div>
                    <button 
                        onClick={handleClick}
                        type="submit" 
                        name="submit"
                        disabled={!email.inputValid || !password.inputValid}>Войти</button>
                <div className='helloBlock'>
                    Вы успешно вошли в систему, {email.value}!
                </div>
                </form>
            </div>
    
  );
}

export default App;