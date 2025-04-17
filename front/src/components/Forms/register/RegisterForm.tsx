import React from 'react'
import styles from './style/register.module.css';
import { IRegisterFormProps } from './RegisterForm.interface';

export const RegisterForm: React.FC<IRegisterFormProps> = ({data: { name, email, password, passwordConfirmation }, change, submit, errors}) => {
    return (
        <main>
            <form className={styles.form} onSubmit={submit}>
                <fieldset className={styles.border}>
                    <div>
                        <legend className={styles.title}>Registro</legend>
                    </div>
                    <div>
                        <div className={styles.inputs}>
                            <label htmlFor="name">Nombre</label>
                            <input 
                                id="name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={change}
                                placeholder="Gustavo Cerati"
                                
                            />
                            {errors?.name && <p>{errors?.name}</p>}
                        </div>
                        <div className={styles.inputs}>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={change}
                                placeholder="Torpeman.Gus@gmail.com"
                                
                            />
                            {errors?.email && <p>{errors?.email}</p>}
                        </div>
                    </div>
                    <div>
                        <div className={styles.inputs}>
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={change}
                                placeholder="Mer3cEs-l0-qUe-sueña5"
                                
                            />
                            {errors?.password && <p>{errors?.password}</p>}
                        </div>
                        <div className={styles.inputs}>
                            <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
                            <input 
                                id="passwordConfirmation"
                                type="password"
                                name="passwordConfirmation"
                                value={passwordConfirmation}
                                onChange={change}
                                placeholder="Mer3cEs-l0-qUe-sueña5"
                            />
                            {errors?.passwordConfirmation && <p>{errors?.passwordConfirmation}</p>}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button>Registrarse</button>
                        <button>Inicar sesión</button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
};