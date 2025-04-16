import React, { useState } from 'react';
import styles from './Contacto.module.css'; // Asegúrate de que el nombre del archivo sea correcto (parece que hay un typo: "Conatcto" debería ser "Contacto")
import { FaEnvelope } from 'react-icons/fa'; // Cambiar a FaEnvelope para un ícono de correo más genérico
import guitar from '../../assets/images/guitar.svg';
import qr from '../../assets/images/qr-expreso.svg';
import axios, { AxiosError } from 'axios';

const Contacto: React.FC = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Debes iniciar sesión para enviar un mensaje.');
        return;
      }

      const response = await axios.post(
        '/contact',
        {
          username: formData.username,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'application/json',
          },
        }
      );

      setMessage(response.data.message || 'Mensaje enviado con éxito');
      // Limpiar el formulario
      setFormData({ username: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error al enviar el mensaje:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setMessage(error.response?.data?.message || 'Error al enviar el mensaje');
      } else if (error instanceof Error) {
        console.error('Error general al enviar el mensaje:', error.message);
        setMessage(error.message || 'Error al enviar el mensaje');
      } else {
        console.error('Error desconocido:', error);
        setMessage('Error desconocido al enviar el mensaje');
      }
    }
  };

  return (
    <div className={styles.containerContacto}>
      <div className={styles.firstContainer}>
        <h2 className={styles.firstTitle}>Contacto</h2>
        <p className={styles.firstParrafo}>
          Si necesitas más información, ¡no dudes en ponerte en contacto con nosotros! Podés utilizar nuestro formulario de contacto online o comunicarte directamente a través de correo electrónico, teléfono o redes sociales.
        </p>
      </div>



      <div className={styles.threeContainer}>
        <div className={styles.firstColumn}>
          <div className={styles.firstImage}>
            <img src={guitar} alt="Guitarra form" />
          </div>

          <div className={styles.secondImageContainer}>
            <div className={styles.secondImage}>
              <img src={qr} alt="QR de expreso" />
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.titleInfo}>
                <h5 className={styles.scanMe}>ESCANEA AQUÍ O ESCRIBÍNOS:</h5>
              </div>
              <div className={styles.socialLogo}>
                <a
                  href="mailto:121expreso@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FaEnvelope />
                  <p className={styles.mail}>121expreso@gmail.com</p>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.formulario}>

        <div className={styles.secondContainer}>
        <h2 className={styles.secondTitle}>¿Tenés una banda? ¿Hacés música?</h2>
        <p className={styles.secondParrafo}>
          Contactate con #121expreso y difundi tú música. Ah! Es gratis eh?
        </p>
      </div>

          <div className={styles.cardForm}>
            <form onSubmit={handleSubmit} className={styles.formContacto}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre"
                className={styles.nameInput}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Mail"
                className={styles.emailInput}
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto"
                className={styles.subjectInput}
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mensaje"
                required
                className={styles.messageInput}
              />
              <button type="submit" className={styles.submitButton}>
                ENVIAR
              </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;