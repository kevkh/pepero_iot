import requests

# Testing the request
response = requests.post("http://192.168.18.70:5000", files={'file': open('./images/Snowy.jpg', 'rb')})

print(response.text)