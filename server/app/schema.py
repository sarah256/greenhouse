from marshmallow import Schema, fields

class PlantSchema(Schema):
  # _id = fields.Int(required=True)
  _id = fields.Str(required=False)
  # mongo_id = fileds.Str()
  user_id = fields.Int()
  plant_name = fields.Str()
  next_watering_date = fields.DateTime() # ISO8601-formatted date string: YYYY-MM-DD
  last_watered_date = fields.DateTime() # ISO8601-formatted date string: YYYY-MM-DD
  days_between_watering = fields.Int()
  details = fields.Str()

# class UserSchema(Schema):
#   id = fields.Int(required=True)
#   email = fields.Str()
#   password_hash = fields.Str()
