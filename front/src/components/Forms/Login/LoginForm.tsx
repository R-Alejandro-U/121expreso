import { ILoginFormProps } from "./LoginForm.interface";
import styles from '../Login/styles/Login.module.css';
import { Link } from "react-router-dom";

export const LoginForm = ({data: { email, password }, change, handleSubmit, errors}: ILoginFormProps) => {
    return(
        <form onSubmit={handleSubmit}>
            <fieldset className={styles.border}>
            <h2 className={styles.title}>Hola, ¡Logueate!</h2>
            <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>
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
                        <Link to={'/register'}><button>Registrarse</button></Link>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};