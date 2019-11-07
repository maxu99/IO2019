
function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  };
  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function () {
    return !this._nodes.length;
  };
}

function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  };

  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path = [];

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  };
}

function readJson() {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET','./cities.json');
    request.send();
    setTimeout(()=>{
      resolve(JSON.parse(request.response));
    },100);
  });
}

var g = new Graph();

var provinces;
    readJson().then((value => {
      provinces=value['provinces'];
      var limitrofes;
      var prov
      var edge;
      var province;
      for (p = 0;p < provinces.length ; p++){

        province = provinces[p];
        limitrofes = provinces[p]['limitrofes'];
        edge='';

        edge = '{';
        for (i = 0 ; i< limitrofes.length ; i++){
          if(i == 0){
            edge = edge+limitrofes[i]['id']+':'+' '+limitrofes[i]['distancia'];
          }else {
            edge = edge+', '+limitrofes[i]['id']+':'+' '+limitrofes[i]['distancia'];
          }
        }
        edge = edge+'}';

        prov= "'" + province['nombre'] +"'";
        console.log(prov);
        g.addVertex(prov,edge);
       // console.log(edge);
      }

      console.log(g.shortestPath('1', '8').concat(['1']).reverse());
    }));




/*  for (i = 0 ; i< provinces.length(); i++){
    g.addVertex(provinces[0]['id'],{})
  }*/

/*g.addVertex('A', {B: 7, C: 8});
g.addVertex('B', {A: 7, F: 2});
g.addVertex('C', {A: 8, F: 6, G: 4});
g.addVertex('D', {F: 8});
g.addVertex('E', {H: 1});
g.addVertex('F', {B: 2, C: 6, D: 8, G: 9, H: 3});
g.addVertex('G', {C: 4, F: 9});
g.addVertex('H', {E: 1, F: 3});

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
console.log(g.shortestPath('B', 'D').concat(['B']).reverse());*/
