exports.signup = (req, res) => {
    res.render('signup');
};

exports.user_signup = (req, res) => {
    console.log('req.body:', req.body);
    SignUp.signup(req.body, (err)=>{
        
        if(err){
            return
        }else{
            res.redirect('/')
        }
    })
}