import json
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import pandas as pd
import joblib

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

@app.route('/')
def home():
    return send_from_directory('static','scripts/IndexPage.html')

@app.route('/bpi/', methods=['POST'])
def calculateBpi():
    input = json.loads(request.data)
    age = float(input['age'])
    weight = float(input['weight'])

    clf = joblib.load("mysite/static/scripts/new_regr.pkl")

    x = pd.DataFrame([[age, weight]], columns=["Age", "Weight"])
    prediction = clf.predict(x)[0]

    response = {'bpi': str(prediction)}
    return json.dumps(response)

if __name__ == "__main__":
    app.run()