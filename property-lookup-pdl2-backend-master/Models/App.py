from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests
import json
import xmltodict
from flask_cors import CORS, cross_origin
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash  
from models import db, User, Property, Agency, Connector, Pipeline, Site
from sqlalchemy import text  # Add this import for using text queries

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Initialize the database
db.init_app(app)  # Ensure this is called after app is created

# Enable CORS for frontend
CORS(app, resources={r"/api/*": {"origins": os.getenv('FRONTEND_ORIGIN')}})  # Use FRONTEND_ORIGIN from .env


# import pymysql

# connection = pymysql.connect(
#     host='localhost',
#     user='root',
#     password='',
#     database='ippidemobackend'
# )

# def remove_duplicate_items(items, key):
#     seen = set()
#     result = []
#     for item in items:
#         if item[key] not in seen:
#             seen.add(item[key])
#             result.append(item)
#     return result

# def fetch_and_save_agencies():
#     url = "https://api2.4pm.ie/api/Agency/GetAgency?Key=RDlaeFVPN004a0hvJTJmWUJIQTN3TVdnJTNkJTNk0"
#     response = requests.get(url)
#     data = json.loads(response.text)
#     unique_data = remove_duplicate_items(data, "Name")

#     with connection.cursor() as cursor:
#         for agency in unique_data:
#             acquiant = agency.get("AcquiantCustomer", {})
#             myhome = agency.get("MyhomeApi", {})

#             sql = """
#                 INSERT INTO agencies (
#                     name, office_name, address1, address2, logo, site,
#                     site_name, site_prefix, daft_api_key,
#                     fourpm_branch_id, myhome_api_key, myhome_group_id, unique_key
#                 ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#             """

#             values = (
#                 agency.get("Name"),
#                 agency.get("OfficeName"),
#                 agency.get("Address1"),
#                 agency.get("Address2"),
#                 agency.get("Logo"),
#                 agency.get("Site"),
#                 acquiant.get("SiteName") if acquiant else None,
#                 acquiant.get("SitePrefix") if acquiant else None,
#                 agency.get("DaftApiKey"),
#                 acquiant.get("FourPMBranchID") if acquiant else None,
#                 myhome.get("ApiKey") if myhome else None,
#                 myhome.get("GroupID")if myhome else None,
#                 agency.get("Key")
                
#             )
#             cursor.execute(sql, values)
#         connection.commit()


# User Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get the data from the request
    if User.query.filter_by(email=data['email']).first():  # Check if email already exists
        return jsonify({'message': 'Email already exists'}), 400  # Return error if email exists
    
    # Create a new user object
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)  # Add the user to the session
    db.session.commit()  # Commit the session to save the user to the database
    return jsonify({'message': 'User created successfully'}), 201  # Return success message

# User Login Route
@app.route('/api/login', methods=['POST'])
def login():
    
    data = request.get_json()  # Get the data from the request
    user = User.query.filter_by(email=data['email']).first()  # Check if user exists by email
    
    if not user or not check_password_hash(user.password_hash, data['password']):  # Check if user exists and password is correct
        return jsonify({'message': 'Invalid credentials'}), 401  # Return error if credentials are invalid
    
    # Generate a JWT token with user ID and expiration time
    token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, 
                       app.config['SECRET_KEY'], algorithm='HS256')

    # Save the token in the database for the user
    user.token = token
    db.session.commit()

    return jsonify({'token': token})  # Return the generated token

# Verify Token Route
@app.route('/api/verify_token', methods=['POST'])
def verify_token():
    data = request.get_json()  # Get the data from the request
    token = data.get('token')  # Get the token from the request

    if not token:
        return jsonify({'message': 'Token is missing'}), 400  # Return error if no token is provided

    try:
        # Decode the JWT token to get the user ID
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded_token['id']

        # Check if the token exists in the database and matches the user
        user = User.query.get(user_id)
        if user and user.token == token:  # Token must match the one stored in the database
            return jsonify({'message': 'Token is valid'}), 200  # Return success if token is valid
        else:
            return jsonify({'message': 'Invalid token'}), 401  # Return error if token is invalid
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401  # Return error if token has expired
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401  # Return error if token is invalid

   
# Update User Data Route
@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)  # Get user by ID or return 404 if not found
    data = request.get_json()  # Get the data from the request
    
    # Update user fields if provided
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password_hash = generate_password_hash(data['password'])  # Hash the new password
    
    db.session.commit()  # Commit changes to the database
    return jsonify({'message': 'User updated successfully'})  # Return success message
# Add Property Route (POST)
@app.route('/api/properties', methods=['POST'])
def add_property():
    data = request.get_json()
    new_property = Property(
        agent_name=data['agent_name'],
        agency_name=data['agency_name'],
        location=data['location'],
        price=data['price'],
        bedrooms=data['bedrooms'],
        bathrooms=data['bathrooms'],
        mt_squared=data['mt_squared'],
        extra_info=data.get('extra_info', ''),
        extra_info_2=data.get('extra_info_2', ''),
        extra_info_3=data.get('extra_info_3', ''),
        extra_info_4=data.get('extra_info_4', ''),
        agency_image_url=data.get('agency_image_url', ''),
        images_url_house=data['images_url_house']
    )
    
    db.session.add(new_property)
    db.session.commit()
    return jsonify({'message': 'Property added successfully'}), 201  # Return success message



# Get Property by ID Route


# Update Property Route
@app.route('/api/properties/<int:id>', methods=['PUT'])
def update_property(id):
    property = Property.query.get_or_404(id)  # Get property by ID or return 404 if not found
    data = request.get_json()  # Get the data from the request

    # Update property fields if provided
    if 'agent_name' in data:
        property.agent_name = data['agent_name']
    if 'agency_name' in data:
        property.agency_name = data['agency_name']
    if 'location' in data:
        property.location = data['location']
    if 'price' in data:
        property.price = data['price']
    if 'bedrooms' in data:
        property.bedrooms = data['bedrooms']
    if 'bathrooms' in data:
        property.bathrooms = data['bathrooms']
    if 'mt_squared' in data:
        property.mt_squared = data['mt_squared']
    if 'extra_info' in data:
        property.extra_info = data['extra_info']
    if 'extra_info_2' in data:
        property.extra_info_2 = data['extra_info_2']
    if 'extra_info_3' in data:
        property.extra_info_3 = data['extra_info_3']
    if 'extra_info_4' in data:
        property.extra_info_4 = data['extra_info_4']
    if 'agency_image_url' in data:
        property.agency_image_url = data['agency_image_url']
    if 'images_url_house' in data:
        property.images_url_house = data['images_url_house']

    db.session.commit()  # Commit the changes to the database
    return jsonify({'message': 'Property updated successfully'})  # Return success message

# Delete Property Route
@app.route('/api/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    property = Property.query.get_or_404(id)  # Get property by ID or return 404 if not found
    db.session.delete(property)  # Delete the property from the session
    db.session.commit()  # Commit the session to apply changes
    return jsonify({'message': 'Property deleted successfully'})  # Return success message

# Helper function to remove duplicate items
def remove_duplicate_items(_api_data, _key):
    # Create a dictionary to hold unique items
    unique_items = {}
    
    # Iterate over the list of dictionaries
    for item in _api_data:
        # Use the value of the specified key as the dictionary key
        key_value = item[_key]
        # If the key value is not already in the dictionary, add the item
        if key_value not in unique_items:
            unique_items[key_value] = item
    
    # Return the list of unique items
    return list(unique_items.values())

# Updated route: Fetch agencies from the database
@app.route("/api/agencies", methods=['GET'])
def get_agencies():
    agencies = Agency.query.all()  # Query all agencies from the database
    return jsonify([agency.to_dict() for agency in agencies])  # Convert each agency to a dictionary and return as JSON

# New route: Fetch properties based on agency key
@app.route("/api/properties", methods=['GET'])
def get_properties_external():
    api_key = request.args.get('key')
    if not api_key:
        return jsonify({'message': 'API key is required'}), 400  # Return error if API key is missing

    url = f"https://api2.4pm.ie/api/property/json?Key={api_key}"
    try:
        response = requests.request("GET", url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        data = json.loads(response.text)
    except requests.exceptions.RequestException as e:
        return jsonify({'message': 'Failed to fetch data from the external API', 'error': str(e)}), 500
    except json.JSONDecodeError:
        return jsonify({'message': 'Invalid JSON response from the external API'}), 500

    return jsonify(data)  # Return the fetched data


@app.route("/api/myhome", methods=['GET'])
@cross_origin(origins="*")  # Allow cross-origin requests from any origin
def get_property():
    api_key = request.args.get('key')
    id = request.args.get('id')
    if api_key is None or id is None:
        return jsonify({'message': 'API key and ID are required'}), 400
    url = f"https://agentapi.myhome.ie/property/{api_key}/{id}?format=json"
    response = requests.request("GET", url)
    data = json.loads(response.text)
    return jsonify(data)

@app.route("/api/acquaint", methods=['GET'])
def get_property_by_id():
    api_key = request.args.get('key')
    property_id = request.args.get('id')

    # Remove the API key from the property ID
    if property_id.startswith(api_key):
        property_id = property_id[len(api_key):]

    url = f"https://www.acquaintcrm.co.uk/datafeeds/standardxml/{api_key}-0.xml"
    
    # Fetch the XML data
    response = requests.request("GET", url)
    if response.status_code != 200:
        return jsonify({'message': 'Failed to fetch data from the external API'}), response.status_code

    # Parse the XML data
    try:
        xml_data = xmltodict.parse(response.text)
        properties = xml_data["data"]["properties"]["property"]
    except Exception as e:
        return jsonify({'message': 'Error parsing XML data', 'error': str(e)}), 500

    # Find the property with the matching ID
    matching_property = next((prop for prop in properties if prop["id"] == property_id), None)
    if not matching_property:
        return jsonify({'message': 'Property not found'}), 404

    # Return the matching property in JSON format
    return jsonify(matching_property)




@app.route('/api/connectors', methods=['GET'])
def get_connectors():
    connectors = Connector.query.all()  # Get all properties from the database
    return jsonify([connector.to_dict() for connector in connectors]) 

@app.route('/api/pipelines', methods=['GET'])
def get_pipelines():
    pipelines = Pipeline.query.all()  # Get all pipelines from the database
    return jsonify([pipeline.to_dict() for pipeline in pipelines])  # Return pipelines as a list of dictionaries


# New route: Fetch a single agency by ID
@app.route("/api/agencies/<int:id>", methods=['GET'])
def get_agency(id):
    agency = Agency.query.get_or_404(id)  # Fetch the agency by ID or return 404 if not found
    return jsonify(agency.to_dict())  # Convert the agency to a dictionary and return as JSON

# Add a route to edit agencies by their ID
@app.route('/api/agencies/<int:id>', methods=['PUT'])
def update_agency(id):
    agency = Agency.query.get_or_404(id)  # Fetch the agency by ID or return 404 if not found
    data = request.get_json()  # Get the data from the request

    # Update agency fields if provided
    if 'name' in data:
        agency.name = data['name']
    if 'address1' in data:
        agency.address1 = data['address1']
    if 'address2' in data:
        agency.address2 = data['address2']
    if 'logo' in data:
        agency.logo = data['logo']
    if 'site_name' in data:
        agency.site_name = data['site_name']
    if 'site_prefix' in data:
        agency.site_prefix = data['site_prefix']
    if 'myhome_api_key' in data:
        agency.myhome_api_key = data['myhome_api_key']
    if 'myhome_group_id' in data:
        agency.myhome_group_id = data['myhome_group_id']
    if 'daft_api_key' in data:
        agency.daft_api_key = data['daft_api_key']
    if 'fourpm_branch_id' in data:
        agency.fourpm_branch_id = data['fourpm_branch_id']
    if 'unique_key' in data:
        agency.unique_key = data['unique_key']
    if 'office_name' in data:
        agency.office_name = data['office_name']
    if 'ghl_id' in data:
        agency.ghl_id = data['ghl_id']
    if 'whmcs_id' in data:
        agency.whmcs_id = data['whmcs_id']

    db.session.commit()  # Commit the changes to the database
    return jsonify({'message': 'Agency updated successfully'})  # Return success message

@app.route('/api/field_mappings', methods=['GET'])
def get_field_mappings():
    field_mappings = db.session.execute(text("SELECT * FROM field_mappings")).fetchall()  # Use text for the query
    result = [
        {
            "id": row.id,
            "field_name": row.field_name,
            "acquaint_crm": row.acquaint_crm,
            "propertydrive": row.propertydrive,
            "daft": row.daft,
            "myhome": row.myhome
        }
        for row in field_mappings
    ]
    return jsonify(result)  # Return the records as JSON

if __name__ == '__main__':
    host = os.getenv('HOST', '127.0.0.1')  # Default to localhost if not set
    port = int(os.getenv('PORT', 5000))    # Default to port 5000 if not set
    app.run(host=host, port=port, debug=True)  # Use host and port from .env
