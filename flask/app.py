# pip install flask pip install flask_cors pip install tensorflow

from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pre-trained Keras model
model = tf.keras.models.load_model('./model/model.h5')

# Define the class names for the model
class_names = ['Almond', 'Snowy', 'Crunchy', 'Peanut']

# Define a function to preprocess the image
def preprocess_image(image):
    # Convert the image to RGB mode
    image = image.convert('RGB')
    # Resize the image to the expected input shape of the model
    image = image.resize((224, 224))
    # Convert the image to a numpy array
    image_array = np.array(image)
    # Reshape the image array to have rank 4 (batch of 1)
    image_array = np.expand_dims(image_array, axis=0)
    # Preprocess the image data (normalize and scale)
    image_array = tf.keras.applications.mobilenet_v2.preprocess_input(image_array)
    return image_array

# Define a route for the prediction API
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded file from the request
    file = request.files['file']
    # Read the file contents and convert to a PIL Image object
    image_bytes = io.BytesIO(file.read())
    image = Image.open(image_bytes)
    # Preprocess the image
    image_array = preprocess_image(image)
    # Use the model to make a prediction
    predictions = model.predict(image_array)
    # Get the predicted class
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class = class_names[predicted_class_index]
    # Return the result as a JSON response
    result = {'class': predicted_class}
    print(result)
    #return predicted_class
    # return jsonify(result)
    # Return the prediction as a string
    return jsonify({'prediction': predicted_class})
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
