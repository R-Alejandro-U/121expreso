import React from 'react'
import styles from './style/register.module.css';

export const RegisterForm: React.FC = () => {
    return (
        <main>
            <form className={styles.form}>
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
                                placeholder="Gustavo Cerati"
                                
                            />
                        </div>
                        <div className={styles.inputs}>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Torpeman.Gus@gmail.com"
                                
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.inputs}>
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Mer3cEs-l0-qUe-sueña5"
                                
                            />
                        </div>
                        <div className={styles.inputs}>
                            <label htmlFor="confirm">Confirmar contraseña</label>
                            <input 
                                id="confirm"
                                type="password"
                                name="confirm"
                                placeholder="Mer3cEs-l0-qUe-sueña5"
                            />
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