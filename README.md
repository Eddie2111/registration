### Created API's

- portfolio-images
- nid
- /service  -> registration page
- /otp      -> otp page
- /profile  -> details update page
- /login    -> login and auth
- /logout   -> logout and destroy session
- /app/:id  -> one click otp validation (under construction)


## Works for saturday.

# Session-validation implemented
# access-token refresh token not implemented yet.
# cloudinary - not merged yet.


### works left

- throw error on 'send'
- full name will not accept except for qwerty
- phone number only bangladeshi*
- password min:6, max:15 : email -> trim, character max:45  //done
- jwt + bcrypted.session
- change body to check, validationResult, json object -> toArray()
- express validator custom validator 
- secure the profile part -> trim, symbol check, max 35, min 1
- auth and verify -> middleware
- models-> structure
- server.use(notFoundHandler), http-errors
