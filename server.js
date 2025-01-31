const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const { ConnectRedis } = require('./config/Redis.config');
const storeRoutes = require("./routes/storeRoutes");
const menuRoutes = require("./routes/menuRoutes");
const getMenus = require("./routes/getMenus");
const middleware = require("./middleware/authenticate");
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({
    origin: [process.env.FRONTEND_URI, "https://scanfest.vercel.app"],
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],  
}));


app.use(cookieParser());

connectDB();

app.get("/api", (req, res) => {
    res.json({
        message: "API Routes",
        Ok: "202",
        body: req.body,
        cookies: req.cookies,
        token : req.cookies.authToken 
    });
});
//  this is basically routes  that 
app.use("/api/menu", getMenus);
app.use("/api/store", storeRoutes);
app.use("/api/menu", middleware, menuRoutes);


app.listen(PORT,  () => console.log(`Server running on port ${PORT}`));






