function PlayList(title) {
  this.title=title;
  this.songs=[];
}

PlayList.prototype = {
  addSong: function(song){
    this.songs.push(song);
  }  
};

function PlayLists(title) {
  var list = new PlayList(title); 
   
}

PlayList.prototype = {
  addSong: function(song){
    this.songs.push(song);
  }  
};



module.exports.PlayList = PlayList;
