from flask import Flask, request, g, jsonify
from flask_caching import Cache
from recommend import recommended_doctors
from config import CONNECTION_STRING
from db import user_feedback, Users
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])  # Only need this once

db_operations = user_feedback(CONNECTION_STRING)
authentication = Users(CONNECTION_STRING)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
cache.init_app(app)

def recommendations():
    if 'doc_recommender' not in g:
        g.doc_recommender = recommended_doctors()
    return g.doc_recommender.get_recommended_doctors()

def filter_doctors(specialty_keyword):
    data = recommendations()
    return [doctor for doctor in data if specialty_keyword in doctor['Specialty'].lower()]

@app.route('/feedback_Data', methods=['POST', 'GET'])
def display_feedbacks():
    data = db_operations.get_feedback()
    res = []
    for d in data:
        json_data = {
            "doctor": d.get("doctor_name"),
            "user": d.get("user_name"),
            "message": d.get("message"),
            "rating": d.get("rating")
        }
        res.append(json_data)

    return jsonify(res), 200


@app.route('/getappt' , methods=['POST', 'GET'])
def appts():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'Message': 'No appoitments'}),400
    appts = db_operations.get_booked_appt(name)
    return jsonify(appts), 200


@app.route('/feedback', methods=['POST'])
def get_feedback():
    feedback = request.get_json()

    user_name = feedback.get('user')         
    doctor_name = feedback.get('dr_name')    
    message = feedback.get('message')
    rating = feedback.get('rating')

    if not all([user_name, doctor_name, rating, message]):
        return jsonify({'Message': 'Fill all fields'}), 400

    db_operations.save_feedback(user_name, doctor_name, rating, message)
    return jsonify({'Message': 'Feedback Saved'}), 200
    

@app.route('/signUp', methods=['POST'])
def user_signUp():
    signUp_data = request.get_json()
    print(signUp_data)
    name = signUp_data.get('name')
    email = signUp_data.get('email')
    password = signUp_data.get('password')
    if not all([name, email, password]):
        return jsonify({'message':'Fill the all fields'}), 400
    authentication.users_signUp(name, email, password)
    return jsonify({'Message': 'Sign up success'}), 200

@app.route('/login', methods=['POST'])
def user_login():
    login_data = request.get_json()
    print(login_data)
    email = login_data.get('email')
    password = login_data.get('password')
    if not email or not password:
        return jsonify({'message': "Missing required fields"}), 400

    user = authentication.isValid_login(email, password)
    if user:
        return jsonify({
            "message": "Login Successful",
            'name': user.get('name')

        }), 200
    else:
        return jsonify({"message": "Invalid Credentials"}), 401



@app.route('/book', methods=['POST'])
def book_appointment():
    data = request.get_json()
    print("Received Booking:", data)

    doctor = data.get("doctor")
    name = data.get("name")
    email = data.get("email")
    contact = data.get("phone")
    time = data.get("time")
    fees = data.get('fees')

    if not all([doctor, name, email, contact, time, fees]):
        return jsonify({"message": "Missing required fields"}), 400

    db_operations.book_appointment(doctor, name, email, contact, time, fees)
    return jsonify({"message": "Booking received"}), 200

@app.route("/orthopedic")
@cache.memoize(1000)
def ortho():
    return jsonify(filter_doctors('orthopedic'))

@app.route("/Gynecologist")
@cache.memoize(1000)
def gyn():
    return jsonify(filter_doctors('gynecologist'))

@app.route("/ENT")
@cache.memoize(1000)
def ent():
    return jsonify(filter_doctors('ent'))

@app.route("/Diabetes")
@cache.memoize(1000)
def diabetes():
    return jsonify(filter_doctors('diabetologist'))

@app.route("/Dermatologist")
@cache.memoize(1000)
def dermatologist():
    return jsonify(filter_doctors('dermatologist'))

@app.route("/Pediatrician")
@cache.memoize(1000)
def pediatrician():
    return jsonify(filter_doctors('pediatrician'))

@app.route("/Eye")
@cache.memoize(1000)
def eye():
    return jsonify(filter_doctors('eye specialist'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=5000)
