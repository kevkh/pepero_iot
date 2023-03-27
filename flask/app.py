# from werkzeug.utils import secure_filename
# import os
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# from keras.models import load_model # TensorFlow is required for Keras to work
# from PIL import Image, ImageOps
# import numpy as np
# from flask import Flask, request, make_response

# # Load the model
# model = load_model('./model/model.h5')

# # Pepero Classes
# note_classes = ['Almond', 'Snowy', 'Crunchy', 'Peanut']

# def predict(pillow_image_path):
#     # # Create the array of the right shape to feed into the keras model
#     # # The 'length' or number of images you can put into the array is
#     # # determined by the first position in the shape tuple, in this case 1
#     data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
#     image = Image.open(pillow_image_path)
    
#     # # resizing the image to be at least 224x224 and then cropping from the center
#     size = (224, 224)
#     image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    
#     # # turn the image into a numpy array
#     image_array = np.asarray(image)
    
#     # # Normalize the image
#     normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

#     # # Load the image into the array
#     data[0] = normalized_image_array

#     # # Predicts the model
#     prediction = model.predict(data)
#     label0 = np.argmax(prediction)
#     return note_classes[prediction.argmax()]


# app = Flask(__name__)

# # Setting up the routes for HTTP Get & Post Methods
# @app.route("/predict", methods=["GET", "POST"])
# def index():
#     if request.method.get == "POST":
#         f = request.files.get['file']
#         f.save(secure_filename(f.filename))
#         print('File upload success!')
#         pillow_image_path = (os.path.realpath(f.filename))
#         prediction = predict(pillow_image_path)
#         print(str(prediction))
#         os.remove(pillow_image_path)
#     response = make_response(prediction, 200)
#     response.mimetype = "text/plain"
#     return response

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


#####################################################################

# from flask import Flask, request, jsonify
# from tensorflow import keras
# import numpy as np

# app = Flask(__name__)

# model = keras.models.load_model('./model/model.h5')
# class_names = ['Almond', 'Snowy', 'Crunchy', 'Peanut']

# @app.route('/predict', methods=['POST'])
# def predict():
#     image_data = request.files['file'].read()
#     image_array = np.frombuffer(image_data, np.uint8)
#     image = keras.preprocessing.image.array_to_img(image_array)
#     image = image.resize((224, 224))
#     image_array = keras.preprocessing.image.img_to_array(image)
#     image_array = image_array / 255.0
#     image_array = np.expand_dims(image_array, axis=0)
#     prediction = model.predict(image_array)[0]
#     predicted_class = class_names[np.argmax(prediction)]
#     return jsonify({'result': predicted_class})

# if __name__ == '__main__':
#     app.run(debug=True)


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
    app.run(debug=True)






# from flask import Flask, request, jsonify
# import tensorflow as tf
# #from keras_preprocessing.image import img_to_array
# #from tensorflow.keras.preprocessing.image import img_to_array
# import numpy as np
# from PIL import Image
# import numpy as np
# from flask_cors import CORS

# app = Flask(__name__)
# cors = CORS(app)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})

# model = tf.keras.models.load_model('./model/model.h5')


# @app.route('/predict', methods=['POST'])
# def predict():
#     # Check if an image file was uploaded
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'})

#     # Read the image file in PIL format
#     img = Image.open(request.files['file'])

#     # Preprocess the image
#     img = img.resize((224, 224))
#     img_array = np.array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array / 255.

#     # Make predictions on the image
#     prediction = model.predict(img_array)
#     result = np.argmax(prediction, axis=1)
#     classes = ['Almond', 'Snowy', 'Crunchy', 'Peanut']
#     prediction_text = classes[result[0]]
#     print(prediction_text)

#     # Return the prediction as a string
#     return jsonify({'prediction': prediction_text})

# if __name__ == '__main__':
#     app.run(debug=True)
