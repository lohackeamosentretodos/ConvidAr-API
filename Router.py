from flask import Flask, request
from flask_cors import CORS
import json
import pymysql

app = Flask(__name__)
CORS(app)


@app.route("/inicioUsuario", methods=["GET"])
def manage_request():
    db = pymysql.connect("35.196.168.71", "jPolo", "megapolo", "ConvidAr")
    cursor = db.cursor()
    # req = json.loads(request.data)
    # table = req["table"]
    sql = "USE ConvidAr;"
    cursor.execute(sql)
    sql = "SELECT f.id_fundacion, f.nombre_fundacion, f.dinero_total, m.id_meta, m.monto, m.estado FROM metas m LEFT OUTER JOIN fundacion f ON m.id_fundacion = f.id_fundacion;"
    cursor.execute(sql)
    cursor.execute("SELECT * FROM metas")

    results = cursor.fetchall()

    return json.dumps({"res": results})


@app.route("/donar", methods=["GET"])
def manage_request():
    db = pymysql.connect("35.196.168.71", "jPolo", "megapolo", "ConvidAr")
    cursor = db.cursor()
    # req = json.loads(request.data)
    # table = req["table"]
    sql = "USE ConvidAr;"
    cursor.execute(sql)
    sql = "SELECT f.id_fundacion, f.nombre_fundacion, f.dinero_total, m.id_meta, m.monto, m.estado FROM metas m LEFT OUTER JOIN fundacion f ON m.id_fundacion = f.id_fundacion;"
    cursor.execute(sql)
    cursor.execute("SELECT * FROM metas")

    results = cursor.fetchall()

    return json.dumps({"res": results})


app.run()
