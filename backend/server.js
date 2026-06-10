const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recommendationRoutes =
  require("./routes/recommendation");

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb"
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Academic Pathway Recommendation API Running"
  });
});



app.use(
  "/api",
  recommendationRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});