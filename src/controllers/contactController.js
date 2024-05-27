// contactController.js

const nodemailer = require('nodemailer');

const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configurar el transporte de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectopaudavid@gmail.com', // Tu correo electrónico
      pass: 'proyecto12345678', // Tu contraseña
    },
  });

  // Configurar el correo electrónico
  const mailOptions = {
    from: 'proyectopaudavid@gmail.com', // Remitente
    to: 'proyectopaudavid@gmail.com', // Destinatario
    subject: 'Mensaje formulario de contacto reik barber', // Asunto del correo
    text: `Nombre: ${nombre}\nCorreo electrónico: ${email}\nMensaje: ${mensaje}`, // Cuerpo del correo
  };

  try {
    // Envío del correo electrónico
    await transporter.sendMail(mailOptions);
    res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
};

module.exports = { enviarCorreo };
