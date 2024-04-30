const nodemailer = require("../config/nodemailer");

module.exports.signUp = function (user) {
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    "/sign_up/sing_up_mailer.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "ybijayyadav468@gmail.com",
      to: user.email,
      subject: "Leading to Wealthy life",
      html: htmlString,
    },
    function (err, info) {
      if (err) {
        console.log("Error in sending mail", err);
      }
      console.log("message sent", info);
    }
  );
};
