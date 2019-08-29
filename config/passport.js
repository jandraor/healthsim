'use strict';

const dbQueries = require('../helpers/dbQueries.js');

const passportConfig = (app, pool, nconf, serviceUrl) => {
  const {URL} = require('url');
  const passport = require('passport');

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser( async(email, done) => {
    try {
      const userQuery = await dbQueries.getUser(pool, email);
      if(userQuery.length == 1){
        const user = {"email": userQuery[0].email};
        done(null, user);
      } else {
        throw "Somethig went wrong deserialising"
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  const FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new FacebookStrategy({
    clientID: nconf.get('auth:facebook:appID'),
    clientSecret: nconf.get('auth:facebook:appSecret'),
    callbackURL: new URL('/auth/facebook/callback', serviceUrl).href,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name'],
  }, async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          const firstName = profile._json.first_name;
          const surname = profile._json.last_name;
          verifyUser(pool, email, firstName, surname, done);
        } catch (error) {
          console.log(error);
          throw error;
        }
  }));

  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  passport.use(new GoogleStrategy({
    clientID: nconf.get('auth:google:clientID'),
    clientSecret: nconf.get('auth:google:clientSecret'),
    callbackURL: new URL('/auth/google/callback', serviceUrl).href,
    scope: 'https://www.googleapis.com/auth/plus.login',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const surname = profile.name.familyName;
      verifyUser(pool, email, firstName, surname, done);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }));

  const TwitterStrategy = require('passport-twitter').Strategy;
  passport.use(new TwitterStrategy({
    consumerKey:nconf.get('auth:twitter:consumerKey'),
    consumerSecret: nconf.get('auth:twitter:consumerSecret'),
    callbackURL: new URL('/auth/twitter/callback', serviceUrl).href,
  }, async(accessToken, tokenSecret, profile, done) => {
    done(null, profile);
  }));

  const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;
  passport.use(new LinkedInStrategy({
    clientID: nconf.get('auth:linkedin:consumerKey'),
    clientSecret: nconf.get('auth:linkedin:consumerSecret'),
    callbackURL: new URL('/auth/linkedin/callback', serviceUrl).href,
    scope: ['r_emailaddress', 'r_liteprofile']
  }, async(token, tokenSecret, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const surname = profile.name.familyName
      verifyUser(pool, email, firstName, surname, done);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
));
  app.use(passport.initialize());
  app.use(passport.session());
}

const verifyUser = async (pool, email, firstName, surname, done) => {
  const userQuery = await dbQueries.getUser(pool, email);

  if(userQuery.length > 1) {
    throw "Duplicated users";
  }

  if(userQuery.length == 1){
    console.log("User already exists");
    const currentUser = {"email": userQuery[0].email };
    done(null, currentUser);
  }

  if(userQuery.length == 0){
    const resultInsertion = await dbQueries.insertUser(pool,
      email, firstName, surname);
    if(resultInsertion.affectedRows === 1) {
      console.log("A new user has been created");
    } else {
      throw "Insertion failed";
    }
    const role_id = 1; //Player role by default
    const resultUserRole = await dbQueries.insertUserRole(pool, email, role_id);
    if(resultUserRole.affectedRows === 1) {
      console.log("Player role created");
    } else {
      throw "Role creation failed";
    }
    const newUser = {"email": email};
    done(null, newUser);
  }
}

module.exports = passportConfig;
