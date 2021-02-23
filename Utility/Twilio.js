const dotenv = require("dotenv");
dotenv.config();

const accountSid = "ACfc3b52e5d312d018b83cce1909433362";
const authToken = "bab3136ec68dbbf4d12d1a7452302804";
const vtoken = "VAcf44dc1c66afb01a0e014ab85514fa64";
const client = require("twilio")(accountSid, authToken);

const initverify = async (reciver, res) => {
  console.log(reciver);
  await client.verify.services
    .create({ friendlyName: "Mob-inv" })
    .then((service) => console.log(service.sid))
    .catch((error) => {
      res.json({ status: "checked", response: error });
    });

  await client.verify
    .services(vtoken)
    .verifications.create({ to: reciver, channel: "sms" })
    .then((verification) => {
      console.log(verification);
      res.json({ status: "pending", response: verification });
    })
    .catch((error) => {
      res.json({ status: "checked", response: error });
    });
};
const verifytoken = async (phone, code, res) => {
  await client.verify
    .services("VAcf44dc1c66afb01a0e014ab85514fa64")
    .verificationChecks.create({ to: phone, code: code })
    .then((verification_check) => {
      console.log(verification_check);
      res.json({ status: "checked", response: verification_check.status });
    })
    .catch((error) => {
      res.json({ status: "checked", response: error });
    });
};

const sendsms = async (reciever, body) => {
  client.messages
    .create({ from: "+18703962161", body: body, to: reciever })
    .then((message) => console.log(message.sid));
};
const sendtowatsapp = async (recievers, body) => {
  Promise.all(
    recievers.map((number) => {
      if (number.toString().length <= 10) {
        console.log("whatsapp: +91" + number);
        return client.messages.create({
          body: body,
          from: "whatsapp:+18703962161",
          to: "whatsapp:+91" + number,
        });
      } else {
        return client.messages.create({
          body: body,
          from: "whatsapp:+18703962161",
          to: "whatsapp:" + number,
        });
      }
    })
  )
    .then((messages) => {
      console.log("Messages sent!");
    })
    .catch((err) => console.error(err));
};

exports.initverify = initverify;
exports.verifytoken = verifytoken;
exports.sendsms = sendsms;
exports.sendtowatsapp = sendtowatsapp;
