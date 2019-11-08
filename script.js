
var provinces;
readJson().then((value => {
  provinces=value['provinces'];

  var option,o2 ;
  var txt,txt2 ;
  for(i=0; i< provinces.length; i++){
    txt = document.createTextNode(provinces[i]['nombre']);
    txt2 = document.createTextNode(provinces[i]['nombre']);
    option = document.createElement('option');
    option.appendChild(txt);
    option.value = provinces[i]['id'];
    o2 = document.createElement('option');
    o2.appendChild(txt2);
    o2.value = provinces[i]['id'];
    document.getElementById('select1').appendChild(option);
    document.getElementById('select2').appendChild(o2);
  }
}));

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




g.addVertex('1', {11: 375, 8: 393, 18: 579, 12: 646, 20: 799});
g.addVertex('2', {3: 67});
g.addVertex('3', {2: 67, 4: 228, 5: 353, 16: 410, 7: 706, 6: 741});
g.addVertex('4', {5: 141, 16: 189, 3: 228});
g.addVertex('5', {4: 141, 16: 166, 3: 353, 12: 401, 7: 523, 8: 547});
g.addVertex('6', {7: 161, 3: 741});
g.addVertex('7', {9: 13, 6: 161, 8: 495, 5: 523, 3: 706});
g.addVertex('8', {11: 19, 12: 330, 1: 393, 7: 495, 9: 498, 5: 547});
g.addVertex('9', {7: 13, 10: 297, 8: 498, 11: 500});
g.addVertex('10', {9: 291});
g.addVertex('11', {8: 19, 1: 375, 9: 500});
g.addVertex('12', {15: 293, 8: 330, 13: 340, 16: 362, 5: 401, 18: 577, 1: 646});
g.addVertex('13', {16: 149, 14: 283, 12: 340, 15: 435});
g.addVertex('14', {17: 152, 13: 283, 15: 284});
g.addVertex('15', {17: 235, 14: 284, 12: 293, 18: 412, 13: 435});
g.addVertex('16', {13: 149, 5: 166,4: 189,12: 362,3: 410});
g.addVertex('17', {14: 152, 15: 235,18: 586,19: 676});
g.addVertex('18', {15: 412, 20: 477,12: 577,1: 579,17: 586});
g.addVertex('19', {20: 479, 17: 676});
g.addVertex('20', {21: 327,18:477,19:479,1:799});
g.addVertex('21', {20: 327,22:975});
g.addVertex('22', {23: 359, 21: 975});
g.addVertex('23', {22: 359});


// Log test, with the addition of reversing the path and prepending the first node so it's more readable
//console.log(g.shortestPath('1', '8').concat(['1']).reverse());

function getCost() {
  var input1 = document.getElementById('select1').value;
  var input2 = document.getElementById('select2').value;
  var nodes = g.shortestPath(input1, input2).concat([input1]).reverse();
  var fullnodes = [];
  var cost = 0;
  var siguiente;
  var limitrofes;
  var names = '';
  if (input1 == input2){
    window.alert('LOS NODOS QUE SELECCIONÓ SON INCORRECTOS!');
    location.reload();
  }

  console.log(nodes);

  event.preventDefault();

  for(i=0; i < nodes.length ; i++){
      for(j=0; j < provinces.length; j++){
        if(provinces[j]['id'] == nodes[i]){
          fullnodes.push(provinces[j]);
        }
      }

  }

  for (i = 0 ; i < (fullnodes.length-1);i++){
    p=i+1;
    siguiente = fullnodes[p]['id'];
    limitrofes = fullnodes[i]['limitrofes'];

    for (j=0;j < limitrofes.length; j++){
      if(limitrofes[j]['id'] == siguiente){
        cost = cost + limitrofes[j]['distancia'];
        console.log(cost);
      }
    }

  }
  for (i = 0 ; i < fullnodes.length;i++){
    if(names == ''){
      names = fullnodes[i]['nombre'];
    }else{
      names = names + ' -> ' + fullnodes[i]['nombre'];
    }
  }
  div = document.getElementById('rutas');
  div.innerHTML = names;
  document.getElementById('costo').innerHTML = cost;
}

