import createError from '../utils/createError.js';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res,next) => {

    if(!req.body.name || !req.body.email || !req.body.password) {
        return next(createError({ status: 400, message:'Name,email,password'}));

    }

try{
    const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(req.body.password, salt); 

const newUser = new User({
name: req.body.name,
email : req.body.email,
password : hashedPassword
});

await newUser.save();
return res.status(201).json('New user Created');
} catch(err) {
console.log(err);
return next(err); 

}
};

export const login = async (req, res, next) => {
if(!req.body.email || !req.body.password){
return next(createError({status: 400, message: 'Name, email password is requiresd'}));
}
try{
    const user = await User.findOne({email: req.body.email}).select(
        'name email password'
    );
    if(!user){
        return next(createError({ status : 404, message:'no user found'}));
    }
    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
    if(!isPasswordCorrect){
        return next(createError({status : 400, message: 'password is incorrect'}));
    }
    const payload = {
        id: user._id,
        name: user.name
    }
    const token = jwt.sign(payload, "palace",{
        expiresIn: '1d'
    }) 
return res.cookie('access_token', token, {
httpOnly : true
}).status(200).
json({'message': "login success"});
}catch(err){
    console.log(err);
return next(err);
}
};

export const logout = (req,res) => {
    res.clearCookie('access_token');
    return res.status(200).json({message: 'logged out'})
};
export const isLoggedIn = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.json(false);
    }
    return jwt.verify(token, "palace", (err) => {
        if(err) {
            return res.json(false);
        }
 return res.json(true);
    });
}; 