const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports = class UserController{
    static async register (req, res){
        const {name, email, phone, password, confirmpassword} = req.body;

        // Validations
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'});
            return;    
        }

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório!'});
            return;    
        }

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório!'});
            return;    
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatória!'});
            return;    
        }

        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória!'});
            return;    
        }

        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais!'});
            return;    
        }

        // Check if user exists
        const userExists = await User.findOne({email: email});

        if(userExists){
            res.status(422).json({message: 'Por favor, utilize outro e-mail!'});
            return;
        }

        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a user
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();
            res.status(201).json({message: 'Usuário criado!', newUser});
            return;
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}