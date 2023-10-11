from flask import Flask, request, jsonify, url_for, Blueprint, render_template, abort
from api.models import db, User, DonationInfo
from api.utils import generate_sitemap, APIException
from datetime import datetime
import stripe
import os

api = Blueprint("api", __name__)

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# @api.route("/hello", methods=["POST", "GET"])
# def handle_hello():
#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the Google Inspector, and you will see the GET request"
#     }
#     return jsonify(response_body), 200


@api.route("/payment", methods=["POST"])
def process_payment():
    try:
        data = request.get_json()
        amount = data["amount"]
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            description="Payment for your product",
            payment_method=data["payment_method_id"],
            payment_method_types=["card"],
            confirm=True,
        )
        return jsonify({"message": "Payment successful"})
    except stripe.error.CardError as e:
        return jsonify({"message": f"Card error: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"message": f"Payment failed: {str(e)}"}), 500
        


@api.route("/checkout", methods=["POST"])

def checkout():
     
    try:
        data = request.get_json()
        print("Received data:", data)
        amount = data["amount"]
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            description="Payment for your product",
            payment_method=data["payment_method_id"],
            payment_method_types=["card"],
            confirm=True,
        )
    
        print("Stripe PaymentIntent:", payment_intent)
        return jsonify({"message": "Payment successful"})
    except stripe.error.CardError as e:
        return jsonify({"message": f"Card error: {str(e)}"}), 400
    except Exception as e:
        # This will help you debug any unexpected errors
        print("Error during payment:", e)
        return jsonify({"error": f"Payment failed: {str(e)}"}), 500
    


@api.route("/thank_you")
def thanks():
    return render_template("thank_you.html")


@api.route("/stripe_webhook", methods=["POST"])
def stripe_webhook():
    if request.content_length > 1024 * 1024:
        abort(400)
    payload = request.get_data()
    sig_header = request.environ.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = os.getenv(
        "STRIPE_ENDPOINT_SECRET"
    )  # Fetch from environment variable
    event = None

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        return {}, 400

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        line_items = stripe.checkout.Session.list_line_items(session["id"], limit=1)

    return {}


# def add_donation(full_name, email, address=None, phone_number=None, user_id=None):
#     time_created = datetime.now()
#     counter = DonationInfo.query.filter_by(email=email).count()
#     new_donation_info = DonationInfo(
#         full_name=full_name,
#         email=email,
#         address=address,
#         phone_number=phone_number,
#         time_created=str(time_created),
#         user_id=user_id,
#     )
#     db.session.add(new_donation_info)
#     db.session.commit()
#     added_donation_info = DonationInfo.query.filter_by(
#         email=email, time_created=str(time_created)
#     ).first()
#     message = (
#         f"Congratulations, your donation was successfully processed. You have donated {counter} times"
#         if counter != 1
#         else f"Congratulations, your donation was successfully processed. You have donated {counter} time"
#     )
#     return added_donation_info, message


# @api.route("/donations", methods=["POST"])
# def handle_adding_donation_info():
#     try:
#         request_body = request.get_json()
#         added_donation_info, message = add_donation(
#             request_body["full_name"],
#             request_body["email"],
#             request_body["address"],
#             request_body["phone_number"],
#         )
#         payload = {"donation": added_donation_info.serialize(), "message": message}
#         return jsonify(payload), 200
#     except Exception as e:
#         return jsonify({"message": f"Error adding donation: {str(e)}"}), 500


# @api.route("/donations/user/<int:user_id>", methods=["POST"])
# def add_new_user_donation(user_id):
#     try:
#         user = User.query.filter_by(id=user_id).first()
#         if user is None:
#             return "User does not exist", 404
#         added_donation_info, message = add_donation(
#             user.full_name, user.email, user.address, user.phone_number, user.id
#         )
#         payload = {"donation": added_donation_info.serialize(), "message": message}
#         return jsonify(payload), 200
#     except Exception as e:
#         return jsonify({"message": f"Error adding donation for user: {str(e)}"}), 500


# @api.route("/donations", methods=["GET"])
# def handle_get_all_donation_info():
#     donation_info = DonationInfo.query.all()
#     serialized_donation_info = [info.serialize() for info in donation_info]
#     return jsonify(serialized_donation_info), 200


# @api.route("/donations/<int:id>", methods=["GET"])
# def handle_get_each_donation_info(id):
#     each_donation_info = DonationInfo.query.get(id)
#     if each_donation_info is not None:
#         return jsonify(each_donation_info.serialize()), 200
#     else:
#         return jsonify({"message": "Donation info not found"}), 404


if __name__ == '__main__':
    api.run()
