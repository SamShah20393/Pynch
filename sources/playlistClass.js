function Graph(data) {
  this.vertices = data;
  this.edges = "testData";
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};

