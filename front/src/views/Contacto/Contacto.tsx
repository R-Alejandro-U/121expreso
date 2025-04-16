import React, { useState, useRef } from 'react';
import styles from './Contacto.module.css';
import { FaEnvelope } from 'react-icons/fa';
import guitar from '../../assets/images/guitar.svg';
import qr from '../../assets/images/qr-expreso.svg';
import emailjs from '@emailjs/browser';


const Contacto: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar el formulario usando EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      // Usar las variables de entorno para las credenciales de EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Verificar que las variables de entorno estén definidas
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Las credenciales de EmailJS no están configuradas correctamente');
      }
      
      if (form.current) {
        const result = await emailjs.sendForm(
          serviceId,
          templateId,
          form.current,
          publicKey
        );
        
        if (result.text === 'OK') {
          setMessage('¡Mensaje enviado con éxito! Gracias por contactarnos.');
          // Limpiar el formulario
          setFormData({ username: '', email: '', subject: '', message: '' });
        }
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      if (error instanceof Error) {
        setMessage(`Error al enviar el mensaje: ${error.message}`);
      } else {
        setMessage('Error al enviar el mensaje. Por favor intenta nuevamente.');
      }
    } finally {
      setLoading(false);
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
            <form ref={form} onSubmit={handleSubmit} className={styles.formContacto}>
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
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'ENVIANDO...' : 'ENVIAR'}
              </button>
            </form>
            {message && (
              <p className={`${styles.message} ${message.includes('Error') ? styles.errorMessage : styles.successMessage}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
    
  );
};

export default Contacto;