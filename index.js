const express = require('express');
const {connectToMongoDb} = require('./connect');
const path = require('path');
const URL= require('./model/url');

const cookieParser = require('cookie-parser');
    const {checkForAuthentication,  restrictTO, } = require('./middlewares/auth');
//routes
const urlRoutes = require('./routes/url');
const staticRoute= require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 8001;

connectToMongoDb('mongodb://localhost:27017/short-id')
.then(()=>{
    console.log('connected to mongo db');})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);


//
 app.use('/', staticRoute);
app.use("/url",urlRoutes);
app.use("/user", userRoute);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.get('/urls/:shortId', async (req,res)=>{

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId

        },

        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }

);
res.redirect(entry.redirectURL);

});


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
} )