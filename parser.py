def dotToJson(file):
	import networkx
	from networkx.readwrite import json_graph
	import pydot
	import datetime

	now = datetime.datetime.now().strftime("%Y-%m-%d")

	lista_nodi = list()
	lista_archi = list()

	for f in file:
		name = "uploads/" + now + f + "tmp.gv"
		with open(name, 'w+') as fout:
			fout.write(file[f].stream.read().decode("utf-8"))	
		graph_netx = networkx.drawing.nx_pydot.read_dot(name)
		for node in graph_netx.nodes(data=True):
		    #print(node)
		    if not node[1]:
		        id_node = node[0]
		        label = node[0]
		    else:
		        id_node = node[0]
		        label = node[1]['label'].replace('"','')
		    lista_nodi.append('{ "data": { "id": "%s", "label" : "%s"} }' % (id_node, label))
		
		for edge in graph_netx.edges():
		    lista_archi.append('{ "data": { "source": "%s", "target": "%s"} }' % (edge[0], edge[1]))

	
	a = ',\n'.join(lista_archi)
	n = ',\n'.join(lista_nodi)
	data = '{"elements": {\n"nodes": [\n%s\n],\n"edges": [\n%s\n]}\n}' % (n, a)
	return data