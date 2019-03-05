//CREA DAG
document.getElementById("crea").addEventListener("click", function(){
	x =document.getElementById("crea").innerHTML;
	if(x=="Passa a DAG"){
		document.getElementById("crea").innerHTML = "Passa agli alberi";
	} else{
		document.getElementById("crea").innerHTML = "Passa a DAG";
	}
}); 


cytoscape.use(cytoscapeDagre ); // register extension

//OPEN FILE and parse to JSON
document.getElementById('inputFiles').onchange = function(){
	
	const handleResponse = ({ target }) => {
		// Do something useful here...
		data = target.response
		console.log(target.response)
		data=JSON.parse(target.response)
		//console.log(data.elements.nodes)
		//console.log(data.elements.edges)
		/*
		ids = []
		labels = []
		sources = []
		targets = []
		for( el in data.elements.nodes){
			ids.push(data.elements.nodes[el].data.id)
			labels.push(data.elements.nodes[el].data.label)
		}
		for( el in data.elements.edges){
			sources.push(data.elements.edges[el].data.source)
			targets.push(data.elements.edges[el].data.target)
		}
		console.log("ids ", ids, "\nlabels ", labels, "\nsources ", sources, "\ntargets", targets)
		*/
		cyt = cytoscape({
		  container: document.getElementById('cy'),

		  wheelSensitivity: 0.2,

		  layout: {
			name: 'dagre'
		  },

		  style: [
			{
			  selector: 'node',
			  style: {
				'content': 'data(label)',
				'text-opacity': 0.5,
				'text-valign': 'center',
				'text-halign': 'right',
			  }
			},

			{
			  selector: 'edge',
			  style: {
				'curve-style': 'bezier',
				'width': 4,
				'target-arrow-shape': 'triangle',
				'line-color': '#9dbaea',
				'target-arrow-color': '#9dbaea'
			  }
			}
		  ],

		  elements: {
			nodes: data.elements.nodes
			,
			edges: data.elements.edges
			
		  },
		});

		//search node
		document.getElementById("node-search").addEventListener("click", function(){
		  x = document.getElementById("search-bar").value ;
		  console.log(x)
		  node = cyt.$id(x);
		  console.log(node)
		  node.select();
		}); 
		// search node with enter key
		var input = document.getElementById("search-bar");
		input.addEventListener("keyup", function(event) {
		  // Cancel the default action, if needed
		  event.preventDefault();
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    // Trigger the button element with a click
		    document.getElementById("node-search").click();
		  }
		}); 

		//get selected nodes list
		document.getElementById("selected").addEventListener("click", function(){
			var allElements = cyt.nodes();
			console.log(allElements)
			selectedNodes = []
			for(ele=0; ele<allElements.length; ele++){
				if(allElements[ele]._private.selected){
					selectedNodes.push(allElements[ele]._private.data.id)
				}	
			}
			console.log(selectedNodes)
		}); 
	}

	var xhr = new XMLHttpRequest();
	xhr.addEventListener('load', handleResponse);
	var formData = new FormData();
	for(f=0; f<this.files.length; f++){
		var file = this.files[f];
		n = "myFile"+f
		formData.append(n, file);
	}
	
	xhr.open('POST', '/api');
	xhr.send(formData);
	console.log(formData.get("myFile0"), formData.get("myFile1"));
};

document.addEventListener ("keydown", function (zEvent) {
	if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.code === "KeyO") {
		document.getElementById("inputFiles").click();    
	}
});

