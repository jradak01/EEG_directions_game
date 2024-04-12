#start flask run
#http://127.0.0.1:5000
from flask_cors import CORS
from flask import Flask, request
# from flask_socketio import SocketIO, emit
import numpy as np
import os
from joblib import dump, load
from werkzeug.utils import secure_filename
import logging
import model

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = 'data'
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
CORS(app, resources={r"/*":{"origins":"*"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "Hello World"

# # dohvati podatke
@app.route("/traindata", methods=['POST'])
def trainData():
    target = os.path.join(app.config['UPLOAD_FOLDER'])
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)
    return "HelloWorld"

# # posalji sve spremljene csv
@app.route("/getdata", methods=['GET'])
def getData():
    data_list = os.listdir('data')
    return data_list

# # dohvati postojece podatke
@app.route("/sendexistingdata", methods=['POST'])
def sendExistingData():
    data = request.get_json()
    print(f"received data: {data['returnModel']}")
    return "Hello World"

# # delete data from saved data
@app.route("/deletedata", methods=["POST"])
def deleteData():
    data = request.get_json()
    print(data)
    os.remove("data/"+data["name"])
    return "Hello World"

# # posalji sve nazive modela
@app.route("/getmodel", methods=['GET'])
def getModel():
    models_list = os.listdir('models')
    return models_list

# # dohvati model koji zeli
###
@app.route("/sendmodel", methods=['POST'])
def sendModel():
    # received_data = request.args.returnModel
    data = request.get_json()
    print(f"received data: {data['returnModel']}")
    return "Hello World"

# treniraj model
@app.route("/trainmodel", methods=['POST'])
def trainModel():
    data = request.get_json()
    print(data)
    print(data.get('value'))
    path = 'data/'+data.get('selectedData')
    X_train, X_test, y_train, y_test = model.preprocess(path, data.get('scaler'))
    error1='nodata'
    error2='nodata'
    range='nodata'
    # print(data.get('modelName'))
    print(data)
    if data.get("value") == "KNN":
        n_neigh = int(data.get("n_neighbors"))
        error1, error2, range = model.find_best_k(X_train, X_test, y_train, y_test)
        acc_score, confusionMTRX, model_trained = model.knn_model(n_neigh, X_train, X_test, y_train, y_test, data.get("metric") )
        range=range.tolist()
    else:
        c_int= int(data.get("c"))
        if  data.get("kernel") == 'poly':
            deg = int(data.get("degree"))
            gamma = int(data.get("gamma"))
            acc_score, confusionMTRX, model_trained =  model.svm_model(X_train, X_test, y_train, y_test, data.get("kernel"),c_int, deg, gamma)
        elif data.get("kernel") == 'rbf':
             gamma = int(data.get("gamma"))
             acc_score, confusionMTRX, model_trained =  model.svm_model(X_train, X_test, y_train, y_test, data.get("kernel"),c_int, gamma)
        else:
            acc_score, confusionMTRX, model_trained =  model.svm_model(X_train, X_test, y_train, y_test, data.get("kernel"),c_int)
    name = data.get("modelName")
    model.save_model_by_name(name, model_trained)
    print(acc_score, confusionMTRX, error1, error2, range)
    confusionMTRX=confusionMTRX.tolist()
    return {'acc_score':acc_score, 'confusionMTRX':confusionMTRX,'error1': error1, 'error2': error2, 'range':range}


@app.route("/getdirection", methods=['POST'])
def getDirection():
    data = request.get_json()
    print(data)
    model_for_predict = model.get_model(data.get('selectedModel'))
    eeg_data = np.array(data.get('eeg_data'))
    eeg_data = eeg_data.reshape((1, -1))
    print(eeg_data)
    dir = model.predict(model_for_predict, eeg_data)
    print(dir)
    dir = str(int(dir[0]))
    return dir 
    