var request = require('request');
/*
for production
var client_id = process.env.YOUTUBE_CLIENT_ID;
var redirect_uri = process.env.YOUTUBE_REDIRECT;
var response_type = process.env.YOUTUBE_RESPONSE_TYPE;
var scope = process.env.YOUTUBE_SCOPE;
var client_id = "887322805876-715afg1qc272uekvhbuuuav00nqh63m9.apps.googleusercontent.com";
*/
var baseURL = process.env.YOUTUBE_BASE_URL;
var baseURL_API = process.env.YOUTUBE_API_BASE_URL;

var client_id = process.env.YOUTUBE_CLIENT_ID;
var client_secret = process.env.YOUTUBE_CLIENT_SECRET;

/* authentication URL parameters */
var type_auth = "/auth?" ;
var auth_redirect_uri = "http://localhost:5000/oauth2callback";
var auth_response_type = "code";
var auth_scope = "https://www.googleapis.com/auth/youtube";

/*Token URL parameters */
var type_token = "/token"
var token_redirect_uri = "http://localhost:5000/user";
var token_grant_type = "authorization_code";

/* USER parameters */
var authToken = "" ;

/*API Functions*/

exports.YouTubeAuth = function(){
	var data;
  authURL=baseURL + type_auth
               + "client_id=" + client_id + '&' 
               + "redirect_uri=" + auth_redirect_uri + '&' 
               + "response_type=" + auth_response_type + '&'
               + "scope=" + auth_scope ; 
	return (authURL);
}

exports.YouTubeToken = function(authorization_code,callback){
  var authData ="";
 	authURL=baseURL + type_token ;
  request.post({
            url:authURL, 
            form: {
              code:authorization_code,
              grant_type:token_grant_type,
              client_id:client_id,
              client_secret:client_secret,
              redirect_uri:auth_redirect_uri /* need to fix the issue */
              }
            }, 
            function(err,httpResponse,body) {
              if(!err && httpResponse.statusCode == 200){
                authData=JSON.parse(body);
                authToken = authData.access_token; 
                var retData= '{ redirect_uri : ' + token_redirect_uri + ', token : '+ authToken + '}' ;
                callback(null, authToken); /* Temparary */
              }
              else{
                /* Modify the error messages*/
                /* This error is not much important since it depends mailny on google reply regarding auth */ 
                callback(true,body);
              }
            });
}

exports.YouTubeGetPlaylist = function(authToken,callback){
  console.log ("Getting playlists");
  apiURL=baseURL_API+"/playlists?"
                +"part=snippet&"
                +"mine=true&"
                +"access_token="+authToken;
  console.log  (apiURL);
  request(apiURL, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  callback(null,body);
                } else {
                  callback(true,body);
                }
              });
}


