import React from 'react';
import styles from './style/register.module.css';
import { IRegisterFormProps } from './RegisterForm.interface';
import { Link } from 'react-router-dom';

export const RegisterForm: React.FC<IRegisterFormProps> = ({
  data: { name, email, password, passwordConfirmation },
  change,
  submit,
  errors,
}) => {
  return (
    <main className={styles['register-page']}>
      <form className={styles['register-form']} onSubmit={submit}>
        <fieldset className={styles['register-border']}>
          <div className={styles['register-inputs']}>
          <legend className={styles['register-title']}>Registro</legend>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={change}
                placeholder="Gustavo Cerati"
              />
              {errors?.name && <p>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={change}
                placeholder="Torpeman.Gus@gmail.com"
              />
              {errors?.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={change}
                placeholder="Mer3cEs-l0-qUe-sueña5"
              />
              {errors?.password && <p>{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
              <input
                id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={change}
                placeholder="Mer3cEs-l0-qUe-sueña5"
              />
              {errors?.passwordConfirmation && <p>{errors.passwordConfirmation}</p>}
            </div>
          </div>
          <div className={styles['register-buttons']}>
            <button type="submit">Registrarse</button>
            <Link to='/login'><button type="button">Iniciar sesión</button></Link>
          </div>
        </fieldset>
      </form>
    </main>
  );
};