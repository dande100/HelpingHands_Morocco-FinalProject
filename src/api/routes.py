"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ResetTokens
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_mail import Mail
from flask_mail import Message
import secrets
import app
import re
import os



api = Blueprint('api', __name__)
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/signup", methods=["POST"])
def addUser():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    phone = request.json.get("phone", None)
    gender = request.json.get("gender", None)
    street_address = request.json.get("street_address", None)
    city = request.json.get("city", None)
    state = request.json.get("state", None)
    country = request.json.get("country", None)
    social = request.json.get("social")


    user = User.query.filter_by(email=email).first()
    if user is None:
         new_user_data = User(email= email, password=password, first_name=first_name, last_name=last_name, phone=phone, gender=gender, street_address=street_address, city=city, state=state, country=country, login_method='google' if social else 'app')
         db.session.add(new_user_data)
         db.session.commit()
         return jsonify({"msg": "User added successfully!"}), 201
    return jsonify({"error": "email is already exists in the database try login instead?"}), 401

@api.route('/user/<int:user_id>', methods=['GET'])
def handle_user(user_id):
    user1 = User.query.get(user_id)
    return jsonify(user1.serialize()), 200

@api.route('/users', methods=['GET'])
def handle_users():
    if request.method == 'GET':
        allUsers = User.query.all()
        user_serialize = [person.serialize()for person in allUsers]
        return jsonify(user_serialize), 200

@api.route("/token", methods=['POST'])
def createToken():
     email = request.json.get("email", None)
     password = request.json.get("password", None)
     social = request.json.get("social", None)

     if social:
          user = User.query.filter_by(email=email,login_method='google').first()
     else:
         user = User.query.filter_by(email=email,password=password).first()
     
     if user is None:
          return jsonify({"error": "Unauthorized Access"}), 401
     access_token = create_access_token(identity=email)
     user_id =  user.id
          
     return jsonify(access_token=access_token, user_id=user_id), 200

@api.route("/updatePassword", methods=['POST'])
def updateUserPassword():
     email = request.json.get("email", None)
     oldPassword = request.json.get("old_password", None)
     newPassword = request.json.get("new_password", None)

     if email is None:
          return jsonify({"error": "Email and password are required"}), 400

     
     user = User.query.filter_by(email=email, login_method='app', password=oldPassword).first()

     if user is None:
          return jsonify({"error": "Not a valid email"}), 401
     
     user.password = newPassword
     db.session.commit()
     
     return jsonify({'msg': 'your password changes successfully, please return to login'}), 200

@api.route('/request_reset_password', methods=['GET', 'POST'])
def request_reset_password():
     email = request.json.get('email', None)

     reset_token = secrets.token_hex(16)
     user = User.query.filter_by(email=email, login_method='app').first()

     if user is None:
          return jsonify({"error": "email is not provided"}), 401
     
     reset_user = ResetTokens(email=email, token=reset_token)
     db.session.add(reset_user)
     db.session.commit()

     app.send_reset_email(email, reset_token)
     
     
     return jsonify({"msg": "password reset email sent. check your inbox for instructions."})

@api.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
     new_password = request.json.get('new_password', None)
     token = request.json.get('token', None)
     email = request.json.get('email', None)

     reset_token = ResetTokens.query.filter_by(token=token).first()
     user = User.query.filter_by(email=email, login_method='app').first()

     if reset_token is None:
          return jsonify({"error": "Token expired please try to request again"}), 401
     
     user.password = new_password
     db.session.delete(reset_token)
     db.session.commit()

     return jsonify({"msg": "your password is updated successfully, it is redirecting to login page."})

def generate_chat_bot_reply(user_input):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b'

    
    email_addresses = re.findall(email_pattern, user_input)
    if email_addresses:
        return "Thank you for providing an email address. An agent will contact you soon."
    if "hello" in user_input or "hi" in user_input or "hey" in user_input:
        return "Hello! How can I assist you today?"

    if "how are you" in user_input:
        return "I'm just a computer program, but thanks for asking!"

    if "bye" in user_input or "goodbye" in user_input:
        return "Goodbye! If you have more questions, feel free to ask."
    if "thank you" in user_input:
        return "You're welcome! If you have any more questions or need assistance, feel free to ask."

    if "weather" in user_input:
        return "I'm sorry, I don't have access to real-time weather information."

    if "make a donation" in user_input:
        return f'You can easily make a donation by visiting our website and clicking on the "Donate Now" button. We accept various payment methods, including credit cards and PayPal. Or, {os.getenv("FRONTEND_URL")}/donatepage to go to our donation page.'
    
    if "link" in user_input:
        return f'Sorry, I am text based bot. I will provide directions'

    if "fundraising campaigns" in user_input:
        return "We have several ongoing campaigns to support various causes. Would you like more details on a specific campaign?"

    if "made a donation" in user_input:
        return "Thank you so much for your generous contribution! Your support helps us make a positive impact."

    if "how are donations used" in user_input:
        return "Donations are used to fund critical programs and initiatives. You can learn more about our impact on our website."
    
    if "help" in user_input:
        return "I'm here to assist you with your donation. Please describe the issue, and I'll do my best to help resolve it."
    
    if "upcoming events" in user_input:
        return "Absolutely! We welcome volunteers. You can find information on volunteer opportunities on our website."
    
    if "volunteer" in user_input:
        return "Yes, we have an exciting event planned for next month. Stay tuned for more details!"
    
    if "progress" in user_input:
        return "Certainly! We've raised [amount] so far, and our goal is [goal amount]. Your support is vital in reaching our target."
    if "secure" in user_input:
        return "Your privacy and security are our top priorities. We use industry-standard encryption to protect your data."
    if 'donation' in user_input:
        return "You can easily make a donation by visiting our website and clicking on the 'Donate' button. We accept various payment methods, including credit cards and PayPal."

    
    if "live chat" in user_input or "agent" in user_input:
        return "Sure! Please provide your email address, and someone will be in touch to assist you."

    
    return "I'm not sure how to respond to that. I am sorry; I am a programmatic bot."

@api.route('/chat', methods=['POST'])
def chat():
     content = request.json.get('content')
     chat_bot_reply = generate_chat_bot_reply(content.lower())
     return jsonify({'msg': chat_bot_reply})