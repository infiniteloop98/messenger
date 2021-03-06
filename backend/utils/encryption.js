const CryptoJS = require("crypto-js"),
  _env = process.env,
  unicode = CryptoJS.enc.Utf8,
  encrypt = (data) => {
    return CryptoJS.AES.encrypt(
      typeof data === "string" ? data : data.toString(),
      _env.PASS_SEC
    ).toString();
  },
  decrypt = (data) => {
    return CryptoJS.AES.decrypt(
      typeof data === "string" ? data : data.toString(),
      _env.PASS_SEC
    ).toString(unicode);
  };

module.exports = {
  encrypt,
  decrypt,
};
