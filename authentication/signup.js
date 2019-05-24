const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/model/user');
const bCrypt = require('bcrypt');

module.exports = passport => {
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        (req, username, password, done) => {
            const findOrCreateUser = () => {
                User.findOne({username:  username}, (err, user) => {
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }

                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done('Пользователь с таким именем уже существует');
                    } else {
                        const newUser = new User();

                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');
                        newUser.created_at = _.now();

                        newUser.save((err) => {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }

                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };

            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    const createHash = password => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
