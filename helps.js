const bcrypt = require('bcryptjs')
const helps = {};
helps.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const finely = await bcrypt.hash(password, salt)
    return finely;
}
helps.matchLogin = async(password,savedPassword)=>{
    try{
        return await bcrypt.compare(password,savedPassword)
    }catch(e){
        console.log(e)
    }
}
module.exports = helps