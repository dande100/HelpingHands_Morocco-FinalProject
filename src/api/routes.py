from flask import Flask, request, render_template, jsonify, url_for, Blueprint
from api.models import db, User, Payments
from api.utils import generate_sitemap, APIException



# Define the Flask app
api = Blueprint('api', __name__)

def calculate_total_donated():
    total_donated = db.session.query(db.func.sum(Payments.amount)).scalar()
    return total_donated or 0  

@api.route('/api/progress', methods=['GET'])
def get_donation_progress():
    hardcoded_progress = 20000
    goal_amount = 50000 
    progress_percentage = (hardcoded_progress / goal_amount) * 100

    return jsonify({'progress': progress_percentage})

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

if __name__ == '__main__':
    api.run()
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
