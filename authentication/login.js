const LocalStrategy   = require('passport-local').Strategy;
const User = require('../db/model/user');
const bCrypt = require('bcrypt');

module.exports = passport => {
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => {
            User.findOne({username:  username},
                function(err, user) {
                    if (err) return done(err);

                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, null, 'Такой пользователь не найден');
                    }

                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, null, 'Неверный логин или пароль');
                    }

                    return done(null, user);
                }
            );
        })
    );

    const isValidPassword = (user, password) => {
        return bCrypt.compareSync(password, user.password);
    };
};
