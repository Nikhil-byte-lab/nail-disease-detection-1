from flask import Flask, jsonify, request
from flask_cors import CORS
# from PIL import Image, ImageOps
import numpy as np
# import tensorflow.keras
from keras.models import load_model
import joblib
import matplotlib.pyplot as plt
from sklearn import preprocessing
import cv2

app = Flask(__name__)

CORS(app)


size = 128



test_labels = ["AL_Melanoma", "blue_finger", "clubbing", "Healthy_Nail", "Onychogryphosis", "pitting"]

le = preprocessing.LabelEncoder()
test_labels = np.array(test_labels)
le.fit(test_labels)
# Load the CNN model
feature_extractor = load_model('cnn_model.h5')

# Load the RF model
RF_model = joblib.load('random_forest_model.pkl')

@app.route("/analyse", methods=["POST"])

def get_diseas():
    try:
        if "file" not in request.files:
            return jsonify({"message": "Please attatch a file in the request.",
                            "status": "error"}), 400
        print("Incoming Request...")

        file = request.files['file']
        img_array = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (size, size))
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        test_image = []
        test_image.append(img)
        test_image = np.array(test_image)

        x_test = test_image

        x_test = x_test / 255.0
        n=0 #Select the index of image to be loaded for testing
        img = x_test[n]
        plt.imshow(img)
        input_img = np.expand_dims(img, axis=0) #Expand dims so the input is (num images, x, y, c)
        input_img_features=feature_extractor.predict(input_img)
        prediction_name = RF_model.predict(input_img_features)[0] 
       
        prediction_name = le.inverse_transform([prediction_name])  #Reverse the label encoder to original name



        print("Request Results: ", prediction_name)


            
    
        response = {"message": "Image analysed successfully.",
                    "status": "success",
                    "prediction": prediction_name[0],
                    
                    }
        return jsonify(response), 200
    except:
        return jsonify({"message": "Something went wrong, please try again later.", "status": "error"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
