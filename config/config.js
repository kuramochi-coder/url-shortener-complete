const mongoURI =
  "mongodb+srv://raphaelkw:raphaelkw@cluster0.qo3nr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const baseUrl =
  process.env.NODE_ENV == "production"
    ? "https://my-tinyurl.herokuapp.com"
    : "http://localhost:8080";

module.exports = {
  mongoURI: mongoURI,
  baseUrl: baseUrl,
};
