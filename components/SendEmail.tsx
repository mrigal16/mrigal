import React from "react";
import nodemailer from "nodemailer";

import { fileURLToPath } from "url";
import path from "path";
const SendEmail = async ({
  to,

  text,
}: {
  to: string;

  text: string;
}) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const transporter = nodemailer.createTransport({
    host: "mail.digitservz.dz",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "mrigal@digitservz.dz",
      pass: "mrigal1616",
    },
  });

  const info = transporter.sendMail({
    from: '"DigitservZ"<mrigal@digitservz.dz>', // sender address
    to: [to], // list of receivers
    subject: "Mrigal", // Subject line
    text: "Inscription dans le service Mrigal", // plain text body
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
        <div>
          <div>
          <img src="cid:uniqueImageCID" alt="Mrigal"/>
          <h1>Bonjour !</h1>
          </div>
          <div>
          <p style="font-size: 110%;">Vous êtes inscrit avec succès sur notre plateforme Mrigal </p>
          </div>
          <div>
          <p>Pour plus d'informations, contactez-nous au numéro de téléphone : 0775 96 96 42</p>
          </div>
          <div>
          <p>appuyer sur le lien pour accéder à notre site web : <a href="http://localhost:3000">${text}</a></p>
          </div>
        </body>
      </html>`,
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/imgs/logo.png",
        cid: "uniqueImageCID",
      },
    ],
  });
  return <div></div>;
};

export default SendEmail;
