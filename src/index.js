require("./utils/db");
require("./utils/initialSetup");
const app = require("./app");
const PORT = 3000;
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
