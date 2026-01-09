require("dotenv").config();
const app = require("./src/app"); // src içindeki dosyayı böyle çağırırız

const PORT = 3000; // Docker ile uyuşması için 3000 yaptık
app.listen(PORT, () => {
  console.log(`✅ User Service is listening on port ${PORT}`);
});