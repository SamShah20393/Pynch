var playlist = require('./classes.js');

/* 
var g = new pl.Graph();
var pi = new pl.PieGraph();
*/

exports.YouTubeParser = function(rawData,callback){
    var list = new playlist.PlayList();
    list.title = rawData.items[0].title;
    
  	console.log("Parsed Your list");

	callback(rawData);
}

