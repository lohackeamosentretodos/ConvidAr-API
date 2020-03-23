from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["POST"])
def manage_request():
    req = json.loads(request.data)
    num = int(req["num"]) + 1
    res = {"num": num}
    return json.dumps(res)

app.run()