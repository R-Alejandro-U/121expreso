import { ILoginFormProps } from "./LoginForm.interface";

export const LoginForm = ({data: { email, password }, change, handleSubmit, errors}: ILoginFormProps) => {
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
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
                <div>
                    <button type="submit">Iniciar sesión</button>
                </div>
            </fieldset>
        </form>
    );
};