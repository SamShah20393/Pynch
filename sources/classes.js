function PlayList(title) {
  this.title=title;
  this.songs=[];
}

PlayList.prototype = {
  addSong: function(song){
    this.songs.push(song);
  }  
};

function PlayLists() {
   this.list = [];
}

PlayLists.prototype = {
  addList: function(title){
    console.log("Adding List as " + title);
    this.list.push(new PlayList(title));
    console.log("Added List as ");    
  },
  getList: function(listNo){
    return (this.list[listNo]);
  },
  getLists: function(){
    console.log("Adding List as " + title);
    this.list.push(new PlayList(title));
    console.log("Added List as ");    
  }  
};

module.exports.PlayList = PlayList;
module.exports.PlayLists = PlayLists;

