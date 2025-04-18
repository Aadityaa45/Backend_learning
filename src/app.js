import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))


app.use(express.json({limit:"16kb"}))

//this is for the data coming in url, usually in url's many encoding and decoding is done and somehow and somewhere it is a triky task to do 
//lets explore it 

app.use(express.urlencoded({extended:true,limit:"16kb"}))  // here urlencoded is the method provided by express itself and we have used here extended true it is to deal with nested objects but uisally it doenst come in use much



/* Cookies are small pieces of data that a server sends to a user's browser. The browser stores them and sends them back with every future request to the same server.

Think of them like little notes the server gives to the browser:

"Hey, remember this for next time!" */



/*The cookie-parser is a middleware in Node.js (typically used with Express.js) that helps you read cookies sent by the client (usually the browser) in HTTP requests.

🔍 What does it do?
When a client (like a browser) sends a request to your server, it may include cookies in the Cookie header. cookie-parser parses this header and makes the cookie data easily accessible in your app via req.cookies. */


app.use(express.CookieParser())
export default app