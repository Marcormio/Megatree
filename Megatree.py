from flask import Flask, jsonify, request
import parser

app = Flask(__name__, static_url_path='/prova')

@app.route("/")
def hello():
	return "Hello World!"

@app.route('/api', methods = ['POST'])
def api():
	print(request)
	print('request.method', request.method)
	print('request.args', request.args)
	print('request.form', request.form)
	
	return parser.dotToJson(request.files)

app.run(debug=True)