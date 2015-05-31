var playlist = require('./classes.js');

/* 
var g = new pl.Graph();
var pi = new pl.PieGraph();
*/

exports.YouTubeParser = function(rawData,callback){
    var list = new playlist.PlayLists(); 
    data = JSON.parse(rawData);
    items = data.items;
    for (aplaylist in items){
    	console.log(items[aplaylist].snippet.localized.title);
    	list.addList(items[aplaylist].snippet.localized.title);
    }

    console.log("Started parsing");
    console.log(data.items[0].snippet.localized.title);
	callback(list.getList(1));
}

