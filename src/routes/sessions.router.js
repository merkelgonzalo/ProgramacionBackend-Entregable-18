import { Router } from 'express';
import passport from 'passport';
import { GetUserDto } from '../dao/dto/user.dto.js';
import { addLogger } from '../utils/logger.js';
import { userModel } from '../dao/models/users.model.js';
import { generateEmailToken, verifyEmailToken, sendRecoveryPass } from '../utils/email.js';
import { createHash, validatePassword } from '../utils/utils.js';
import { config } from '../config/config.js';
import { transporter } from "../utils/email.js";

const router = Router();

router.post('/register', addLogger, passport.authenticate('register', {failureREdirect:'/failregister'}), async (req, res) =>{
    try {
        console.log(req.user.email);
        const contenido = await transporter.sendMail({
            from: config.gmail.emailAdmin,
            to: req.user.email,
            subject: "Successful registration 👏🎉",
            html: `<div>
            <h1>Welcome!</h1>
            <img src="https://nuevarioja.com.ar/galeria/fotos/2022/11/11/o_1668201035.jpg" style="width:250px"/>
            <p>You can start using our services now</p>
            <a href="http://localhost:8080/"> 👉 Enjoy now </a>
            </div>`
        })
        res.send({status:"success", message:"User registered"});
    }catch{

    }
});

router.get('/failregister', addLogger, async (req, res) => {
    console.log("Failed strategy");
    res.send({error:"Error ocurred when try to register"});
})

router.post('/login', addLogger, passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req,res)=>{
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
    
    req.session.user = {
        name: req.user.first_name,
        email: req.user.email,
        age: req.user.age,
        cart: req.user.cart,
        role: req.user.role
    }

    res.send({status:"success", payload:req.session.user, message:"Login!!!"})

});

router.get('/faillogin', addLogger, async (req, res)=>{

    console.log('Failed strategy');
    res.send({error: 'Error ocurred when try to login...'});

});

router.get('/logout', addLogger, (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"Couldn't close session"});
        res.redirect('/login');
    })
});

router.get('/github', addLogger, passport.authenticate('github'), async (req,res)=>{});

router.get('/githubcallback', addLogger, passport.authenticate('github',{failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/')
});

router.get('/current', addLogger, (req, res) => {

    if(!req.session.user) return res.status(400).send({status:"error", error: 'No user currently'});

    let user = new GetUserDto(req.session.user);
    
    res.send({status:"success", payload:user, message:"Current user!!!"})
});

router.post("/forgot-password", async (req, res)=>{
    try {
        const { email } = req.body;
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.send(`<div>Error, <a href="/forgot-password">Try again</a></div>`)
        }
        const token = generateEmailToken(email, 3*60);
        await sendRecoveryPass(email, token);
        res.send("We sent an email to your mail account for reset password, back to <a href='/login'>login</a>")
    } catch (error) {
        return res.send(`<div>Error, <a href="/forgot-password">Try again</a></div>`)
    }
});

router.post("/reset-password", async (req, res)=>{
    try {
           const token = req.query.token;
           const {email, newPassword} = req.body;
           const validEmail = verifyEmailToken(token);

           if(!validEmail){
            return res.send(`Invalid link, generate new one: <a href="/forgot-password">New link</a>.`);
           }

           const user = await userModel.findOne({email:email});
           if(!user){
            return res.send('Unregistered user.');
           }
           if(validatePassword(newPassword, user)){
            return res.send('Can not use the same password.');
           }
           const userData = {
            ...user._doc,
            password:createHash(newPassword)
           };
           const userUpdate = await userModel.findOneAndUpdate({email:email}, userData);
           res.render('login', {message:"Password updated"})

    } catch (error) {
        res.send(error.message)
    }
});

export default router;