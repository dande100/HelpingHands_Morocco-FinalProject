from flask import Flask, request, render_template, jsonify, url_for, Blueprint
from api.models import db, User, Payments
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



# Define the Flask app
api = Blueprint('api', __name__)

def calculate_total_donated():
    total_donated = db.session.query(db.func.sum(Payments.payment_amount)).scalar()
    return total_donated or 0  
@api.route('/progress', methods=['GET'])
def get_donation_progress():
    goal_amount = 50000

    total_donated = calculate_total_donated()

    progress_percentage = (total_donated / goal_amount) * 100

    return jsonify({'progress': progress_percentage})

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/signup", methods=["POST"])
def addUser():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
         new_user_data = User(email= email, password=password, first_name=first_name, last_name=last_name)
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
    
@api.route('/payments', methods=['POST'])
def add_payment():
    if request.method == 'POST':
        data = request.json 
        user_id = data.get('user_id')

        # Check if the user with the specified user_id exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Create a new payment record
        new_payment = Payments(
            date=data['date'],
            currency=data['currency'],
            payment_method=data['payment_method'],
            payment_amount=data['payment_amount'],
            city=data['city'],
            state=data['state'],
            country=data['country'],
            postal_code=data['postal_code'],
            phone_number=data.get('phone_number'),
            user_id=user_id
        )

        db.session.add(new_payment)
        db.session.commit()

        return jsonify({"message": "Payment added successfully"}), 201
    
@api.route('/payments', methods=['GET'])
def get_all_payments():
    if request.method == 'GET':
        allPayments = Payments.query.all()
        payment_serialize = [Payments.serialize()for Payments in allPayments]
        return jsonify(payment_serialize), 200

@api.route('/user/<int:user_id>/payments', methods=['GET'])
def get_user_donation_history(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user_payments = Payments.query.filter_by(user_id=user_id).all()
    payment_serialize = [payment.serialize() for payment in user_payments]
    return jsonify(payment_serialize), 200

@api.route("/token", methods=['POST'])
def createToken():
     email = request.json.get("email", None)
     password = request.json.get("password", None)
     social = request.json.get("social", None)

     if social:
          user = User.query.filter_by(email=email).first()
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
     newPassword = request.json.get("new_password", None)

     if email is None:
          return jsonify({"error": "Email and password are required"}), 400

     
     user = User.query.filter_by(email=email).first()

     if user is None:
          return jsonify({"error": "Not a valid email"}), 401
     
     user.password = newPassword
     db.session.commit()
     
     return jsonify({'msg': 'your password changes successfully, please return to login'}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

if __name__ == '__main__':
    api.run()
