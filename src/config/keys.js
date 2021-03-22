const {
  DB_USER = "root",
  DB_PASS = "password",
  DB_HOST = "localhost",
  DB_NAME = "db"
} = process.env;

module.exports = {
  mongoURI: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
}