// Importa el módulo Sendinblue
const { TransactionalEmailsApi } = require('@sendinblue/client');

// Configura el cliente de Sendinblue con tus credenciales
const client = new TransactionalEmailsApi({ apiKey: '8b514f988e44ebe47141cbfbddd54e76bf6e8dab9e613afa3850117ed677c0e9' });

// Define la función para enviar correos electrónicos
const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Define los parámetros del correo electrónico
  const params = {
    to: [{ email: 'proyectopaudavid@gmail.com' }], // Dirección de correo electrónico del destinatario
    templateId: 1, // ID de la plantilla de correo electrónico en Sendinblue
    params: { nombre, mensaje,email } // Parámetros para personalizar la plantilla
  };

  try {
    // Envía el correo electrónico utilizando Sendinblue
    const response = await client.sendTransacEmail(params);

    // Envío exitoso
    console.log('Correo electrónico enviado correctamente:', response);
    res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    // Error al enviar el correo electrónico
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
};

module.exports = { enviarCorreo };

