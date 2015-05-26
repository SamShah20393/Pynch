var request = require('request');
var baseURL = "https://accounts.google.com/o/oauth2/";
/*
for production
var client_id = process.env.YOUTUBE_CLIENT_ID;
var redirect_uri = process.env.YOUTUBE_REDIRECT;
var response_type = process.env.YOUTUBE_RESPONSE_TYPE;
var scope = process.env.YOUTUBE_SCOPE;
*/
var client_id = "887322805876-715afg1qc272uekvhbuuuav00nqh63m9.apps.googleusercontent.com";

/* authentication URL parameters */
var type_auth = "auth?" ;
var auth_redirect_uri = "http://localhost:5000/oauth2callback";
var auth_response_type = "code";
var auth_scope = "https://www.googleapis.com/auth/youtube";

/*Token URL parameters */
var type_token = "token"
var client_secret = "TmUZ_gTo3IsMgrDUKMrp0CAZ";
var token_redirect_uri = "http://localhost:5000/user";
var token_grant_type = "authorization_code";

exports.YouTubeAuth = function(){
	var data;
    authURL=baseURL + type_auth
               + "client_id=" + client_id + '&' 
               + "redirect_uri=" + auth_redirect_uri + '&' 
               + "response_type=" + auth_response_type + '&'
               + "scope=" + auth_scope ; 
    /*data=request(requestURL, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
  		return (body);
  		}
	})*/
    console.log(authURL);
	return (authURL);
}

exports.YouTubeToken = function(authorization_code){
	var data;
    authURL=baseURL + type_token ;
    console.log ("New one :" + authURL) ;
	request.post(
    	authURL,
    	{ form: { 'client_id': client_id } },
    	{ form: { 'client_secret': client_secret } },
    	{ form: { 'code': authorization_code } },
    	{ form: { 'redirect_uri': token_redirect_uri } },
    	{ form: { 'grant_type': token_grant_type  } },
    	
    	
    	function (error, response, body) {
        	if (!error && response.statusCode == 200) {
            	console.log(body)
        	}
    	}
	);
}
