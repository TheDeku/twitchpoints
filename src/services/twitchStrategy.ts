import passport from "passport";
import OAuth2Strategy, { Strategy } from "passport-oauth2";


export const strategy = ():Strategy => {
    return new OAuth2Strategy({
        authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
        tokenURL: 'https://id.twitch.tv/oauth2/token',
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        state: true
    },
        function (accessToken: any, refreshToken: any,scopes:any, profile: any, done: any) {
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            profile.scopes = scopes;

            // console.log(profile);

            // Securely store user profile in your DB
            //User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            //});
            done(null, profile);
        }
    );
}



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});