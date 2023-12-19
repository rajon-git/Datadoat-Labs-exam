const User=require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load input  validation
const validateRegisterInput = require("../validation/register");

const register=async (req,res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", 
        r: "pg", 
        d: "mm" 
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

//login

const login=async (req,res)=>{
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    //Find user by email
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      //check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User Match
  
          //Create jt payload
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            role: user.role
          };
          //Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                first_name: user.first_name,
                last_name: user.last_name
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
}

module.exports= {register, login}