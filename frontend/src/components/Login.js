import React from 'react';

function Login({ onLogin }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    const { email, password } = userData;
    e.preventDefault();
    onLogin(password, email);
  }

  return(
    <div className="authentication">
      <h3 className="authentication__title">Вход</h3>

      <form className="form form_type_auth" name="login" onSubmit={handleSubmit} noValidate>
        <input id="email-user" value={userData.email} onChange={handleChange} type="url" name="email" className="form__input form__input_type_auth" placeholder="Email" required />
        <span className="form__input-error email-user-error"></span>

        <input id="password" value={userData.password} onChange={handleChange} type="password" name="password" className="form__input form__input_type_auth" placeholder="Password" required />
        <span className="form__input-error password-error"></span>

        <button type="submit" className="form__btn form__btn_type_auth">Войти</button>
      </form>

    </div>
  );
}

export default Login;
