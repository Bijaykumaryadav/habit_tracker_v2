const nodemailer = require("../config/nodemailer");

module.exports.forgottenPassword = function (userEmail, token) {
  let htmlString = nodemailer.renderTemplate(
    { userEmail: userEmail, token: token },
    "/password/forgotten_password.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: userEmail,
      subject: "Reset your password",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending reset password link", err);
      }
    }
  );
};
