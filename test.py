from flask import Flask, request
from flask_cors import CORS
import json
import pymysql

app = Flask(__name__)
CORS(app)

@app.route("/test", methods=["POST"])
def manage_request():
    db = pymysql.connect("35.196.168.71", "jPolo", "megapolo", "ConvidAr")
    cursor = db.cursor()
    req = json.loads(request.data)
    table = req["table"]
    sql = "SELECT * FROM {}".format(table)
    cursor.execute(sql)
    results = cursor.fetchall()
    
    return json.dumps({"res": results[0][3]})

app.run()       