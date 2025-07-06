from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

class DatabaseOperations:
    def __init__(self, connection_string):
        self.client = MongoClient(connection_string)
        self.db = self.client['Drinfo']
        self.collections = ['Pediatrician', 'Orthopedic', 'Gynecologist', 'Eye', 'ENT', 'Diabetologist',
                            'Dermatologist']

    def merge_collections(self):
        records_list = []
        for collection_name in self.collections:
            collection = self.db[collection_name]
            records = collection.find({})
            records_list.extend(list(records))
        return records_list



class user_feedback:
    def __init__(self, connection_string):
        self.client = MongoClient(connection_string)
        self.db = self.client['feedback_db']                    
        self.book = self.client['Appointments']                     
        self.feedback_collection = self.db['Feedback']
        self.book_appt = self.db['Appts']

    def save_feedback(self, user_name, doctor_name, rating, message):
        self.feedback_collection.insert_one({
            'user_name': user_name,
            'doctor_name': doctor_name,
            'rating': rating,
            'message': message,
            'timestamp': datetime.utcnow()
        })

    def book_appointment(self, doctor_name, name, email, contact, time, fees):
        appointment = {
            'dr_name': doctor_name,
            'name': name,
            'email': email,
            'contact': contact,
            'time': time,
            'fees': fees,
        }
        print('Saving appointment...')
        self.book_appt.insert_one(appointment)

    def get_booked_appt(self, user_name):
        if user_name:
            appts = list(self.book_appt.find({'name': user_name}))
            for appt in appts:
                appt['_id'] = str(appt['_id'])  # Convert ObjectId to string
            return appts
        return []

    def get_feedback(self):
        return list(self.feedback_collection.find())

class Users:
    def __init__(self, connection_string):
        self.client = MongoClient(connection_string)
        self.db = self.client['Logins']
        self.signUp = self.db['User_signup']  

    def users_signUp(self, name, email, password):
        signup = {
            'name': name,
            'email': email,
            'password': password
        }
        self.signUp.insert_one(signup)
        print(signup)

    def isValid_login(self, email, password):
        user = self.signUp.find_one({'email': email, 'password': password})
        return user 

