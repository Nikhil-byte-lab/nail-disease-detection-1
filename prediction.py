from keras.models import load_model
from sklearn import preprocessing

import joblib
import cv2
import matplotlib.pyplot as plt
import numpy as np 

img_path = input('Path of the image to be predicted: ')

test_image = []
SIZE = 128
test_labels = ["Acral_Lentiginous_Melanoma", "blue_finger", "clubbing", "Healthy_Nail", "Onychogryphosis", "pitting"]
le = preprocessing.LabelEncoder()

test_labels = np.array(test_labels)
le.fit(test_labels)

# Load the CNN model
feature_extractor = load_model('cnn_model.h5')

# Load the RF model
RF_model = joblib.load('random_forest_model.pkl')

img = cv2.imread(img_path, cv2.IMREAD_COLOR)
img = cv2.resize(img, (SIZE, SIZE))
img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
test_image.append(img)

test_image = np.array(test_image)

x_test = test_image

x_test = x_test / 255.0

n=0 #Select the index of image to be loaded for testing
img = x_test[n]
plt.imshow(img)
input_img = np.expand_dims(img, axis=0) #Expand dims so the input is (num images, x, y, c)
input_img_features=feature_extractor.predict(input_img)
prediction_RF = RF_model.predict(input_img_features)[0] 
prediction_RF = le.inverse_transform([prediction_RF])  #Reverse the label encoder to original name
print("The prediction for this image is: ", prediction_RF)
# print("The actual label for this image is: ", test_labels[n])