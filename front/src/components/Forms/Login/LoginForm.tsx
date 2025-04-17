import { ILoginFormProps } from "./LoginForm.interface";
import styles from '../Login/styles/Login.module.css';
import { Link } from "react-router-dom";
import React from 'react';

export const LoginForm: React.FC<ILoginFormProps> = ({data: { email, password }, change, handleSubmit, errors}: ILoginFormProps) => {
    return(
        <form onSubmit={handleSubmit}>
            <fieldset className={styles.border}>
                <div className={styles.inputs}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="ejemplo@gamil.com"
                            value={ email }
                            onChange={change}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Contraseña_Ultra_Secreta"
                            value={ password }
                            onChange={change}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div>
                        <button type="submit">Iniciar sesión</button>
                    </div>
                    <div>
                        <Link to={'/registro'}><button>Registrarse</button></Link>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};