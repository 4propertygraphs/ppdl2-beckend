from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import ENUM
import json

# Initialize the database
db = SQLAlchemy()

# User model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)
    token = db.Column(db.String(200))

    def __init__(self, username, email, password, token=None):
        self.username = username\
        
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.token = token

    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, email={self.email})"

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "token": self.token
        }

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Property model
class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    agency_agent_name = db.Column(db.String(100), nullable=False)
    agency_name = db.Column(db.String(100), nullable=False)
    house_location = db.Column(db.String(255), nullable=False)
    house_price = db.Column(db.String(255), nullable=False)  
    house_bedrooms = db.Column(db.Integer, nullable=False)
    house_bathrooms = db.Column(db.Integer, nullable=False)
    house_mt_squared = db.Column(db.String, nullable=False) 
    house_extra_info_1 = db.Column(db.String(255))
    house_extra_info_2 = db.Column(db.String(255))
    house_extra_info_3 = db.Column(db.String(255))
    house_extra_info_4 = db.Column(db.String(255))
    agency_image_url = db.Column(db.String(255))
    images_url_house = db.Column(db.String(255))

    def __init__(self, agency_agent_name, agency_name, house_location, house_price, house_bedrooms, house_bathrooms, house_mt_squared, house_extra_info_1, house_extra_info_2, house_extra_info_3, house_extra_info_4, agency_image_url, images_url_house):
        self.agency_agent_name = agency_agent_name
        self.agency_name = agency_name
        self.house_location = house_location
        self.house_price = house_price
        self.house_bedrooms = house_bedrooms
        self.house_bathrooms = house_bathrooms
        self.house_mt_squared = house_mt_squared
        self.house_extra_info_1 = house_extra_info_1
        self.house_extra_info_2 = house_extra_info_2
        self.house_extra_info_3 = house_extra_info_3
        self.house_extra_info_4 = house_extra_info_4
        self.agency_image_url = agency_image_url
        self.images_url_house = images_url_house

    def to_dict(self):
        return {
            "id": self.id,
            "agency_agent_name": self.agency_agent_name,
            "agency_name": self.agency_name,
            "house_location": self.house_location,
            "house_price": self.house_price,
            "house_bedrooms": self.house_bedrooms,
            "house_bathrooms": self.house_bathrooms,
            "house_mt_squared": self.house_mt_squared,
            "house_extra_info_1": self.house_extra_info_1,
            "house_extra_info_2": self.house_extra_info_2,
            "house_extra_info_3": self.house_extra_info_3,
            "house_extra_info_4": self.house_extra_info_4,
            "agency_image_url": self.agency_image_url,
            "images_url_house": self.images_url_house
        }
class Agency(db.Model):
    __tablename__ = 'agencies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    address1 = db.Column(db.String(255), nullable=False)
    address2 = db.Column(db.String(255), nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    site_name = db.Column(db.String(100), nullable=True)
    site_prefix = db.Column(db.String(20), nullable=True)
    myhome_api_key = db.Column(db.String(100), nullable=True)
    myhome_group_id = db.Column(db.Integer, nullable=True)
    daft_api_key = db.Column(db.String(100), nullable=True)
    fourpm_branch_id = db.Column(db.Integer, nullable=True)
    unique_key = db.Column(db.String(255), nullable=True)
    office_name = db.Column(db.String(255), nullable=True)
    ghl_id = db.Column(db.String(255), nullable=True)
    whmcs_id = db.Column(db.String(255), nullable=True)

    def __init__(self, name, address1,address2, logo=None, site_name=None, site_prefix=None,
                 myhome_api_key=None, myhome_group_id=None, daft_api_key=None,
                 fourpm_branch_id=None, key=None, office_name=None, ghl_id=None, whmcs_id=None):
        self.name = name
        self.address1 = address1
        self.address2 = address2
        self.logo = logo
        self.site_name = site_name
        self.site_prefix = site_prefix
        self.myhome_api_key = myhome_api_key
        self.myhome_group_id = myhome_group_id
        self.daft_api_key = daft_api_key
        self.fourpm_branch_id = fourpm_branch_id
        self.unique_key = key
        self.office_name = office_name
        self.ghl_id = ghl_id
        self.whmcs_id = whmcs_id

    def __repr__(self):
        return f"<Agency(name={self.name}, address={self.address1})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": f"{self.address1 or ''} {self.address2 or ''}".strip(),
            "logo": self.logo,
            "site_name": self.site_name,
            "site_prefix": self.site_prefix,
            "myhome_api_key": self.myhome_api_key,
            "myhome_group_id": self.myhome_group_id,
            "daft_api_key": self.daft_api_key,
            "fourpm_branch_id": self.fourpm_branch_id,
            "key": self.unique_key,
            "office_name": self.office_name,
            "ghl_id": self.ghl_id,
            "whmcs_id": self.whmcs_id
        }

    @classmethod
    def from_json(cls, data):
        return cls(
            name=data.get("Name"),
            address=data.get("Address1") + "" + data.get("Address2"),

            # psra=data.get("AcquiantCustomer", {}).get("SiteID"),
            logo=data.get("Logo"),
            site_name=data.get("AcquiantCustomer", {}).get("SiteName"),
            site_prefix=data.get("AcquiantCustomer", {}).get("SitePrefix"),
            myhome_api_key=data.get("MyhomeApi", {}).get("ApiKey"),
            myhome_group_id=data.get("MyhomeApi", {}).get("GroupID"),
            daft_api_key=data.get("DaftApiKey"),
            fourpm_branch_id=data.get("AcquiantCustomer", {}).get("FourPMBranchID"),
            key=data.get("Key"),
            office_name=data.get("OfficeName")
        )







class Connector(db.Model):
    __tablename__ = 'connectors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    connector_config_fields = db.Column(db.Text, nullable=False)  # Stored as JSON string
    description = db.Column(db.Text)
    type = db.Column(ENUM('IN', 'OUT'), nullable=False)

    def __init__(self, name, connector_config_fields, description, type):
        self.name = name
        self.connector_config_fields = json.dumps(connector_config_fields)  # Store list as JSON string
        self.description = description
        self.type = type

    def __repr__(self):
        return f"Connector(id={self.id}, name={self.name}, type={self.type})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "connector_config_fields": json.loads(self.connector_config_fields),
            "description": self.description,
            "type": self.type
        }

class Pipeline(db.Model):
    __tablename__ = 'pipelines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    pipelineURL = db.Column(db.String(2083), nullable=False)

    def __init__(self, name, description, pipelineURL):
        self.name = name
        self.description = description
        self.pipelineURL = pipelineURL

    def __repr__(self):
        return f"Pipeline(id={self.id}, name={self.name})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "pipelineURL": self.pipelineURL
        }

# Site model
class Site(db.Model):
    __tablename__ = 'sites'

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)
    site_id = db.Column(db.Integer, nullable=False)
    value = db.Column(db.String(255), nullable=False)

    def __init__(self, tag, site_id, value):
        self.tag = tag
        self.site_id = site_id
        self.value = value

    def __repr__(self):
        return f"Site(id={self.id}, tag={self.tag}, site_id={self.site_id}, value={self.value})"

    def to_dict(self):
        return {
            "id": self.id,
            "tag": self.tag,
            "site_id": self.site_id,
            "value": self.value
        }