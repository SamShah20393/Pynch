var request = require('request');
var baseURL = "https://accounts.google.com/o/oauth2/";
/*
for production
var client_id = process.env.YOUTUBE_CLIENT_ID;
var redirect_uri = process.env.YOUTUBE_REDIRECT;
var response_type = process.env.YOUTUBE_RESPONSE_TYPE;
var scope = process.env.YOUTUBE_SCOPE;
var client_id = "887322805876-715afg1qc272uekvhbuuuav00nqh63m9.apps.googleusercontent.com";
*/
var client_id = process.env.YOUTUBE_CLIENT_ID;
var client_secret = process.env.YOUTUBE_CLIENT_SECRET;

/* authentication URL parameters */
var type_auth = "auth?" ;
var auth_redirect_uri = "http://localhost:5000/oauth2callback";
var auth_response_type = "code";
var auth_scope = "https://www.googleapis.com/auth/youtube";

/*Token URL parameters */
var type_token = "token"
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
  request.post({
                  url:authURL, 
                  form: {
                    code:authorization_code,
                    grant_type:token_grant_type,
                    client_id:client_id,
                    client_secret:client_secret,
                    redirect_uri:auth_redirect_uri
                  }
                }, 
                function(err,httpResponse,body) {
                  authData=JSON.parse(body)
                  apiURL="https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token="+authData.access_token
                  console.log("requesting at :");
                  console.log(apiURL);
                  data=request(apiURL, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                      console.log ("response Got!!!");
                      console.log(body);
                      return (body);
                    }
                  console.log(body);
                  }) ;
                })
}
