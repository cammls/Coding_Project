module.exports = function(passport) {
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.get(id, function(err, user) {
			if (err) return next(err);
			done(err, user);
		});
	});
}
