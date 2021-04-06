from db import Plant
from db.mongo import MongoPlant
from .schema import PlantSchema
from bson.objectid import ObjectId

class Service(object):
  def __init__(self, user_id, plant_client=Plant(adapter=MongoPlant)):
    self.plant_client = plant_client
    self.user_id = user_id

    if not user_id:
      raise Exception("user id not provided")

  def find_all_plants(self):
    plants  = self.plant_client.find_all({'user_id': self.user_id})
    return [self.dump(plant) for plant in plants]

  def find_plant(self, plant_id):
    plant = self.plant_client.find({'user_id': self.user_id, '_id': ObjectId(str(plant_id))})
    return self.dump(plant)

  def create_plant(self, plant):
    self.plant_client.create(self.prepare_plant(plant))
    return self.dump(plant.data)

  def update_plant(self, plant_id, plant):
    records_affected = self.plant_client.update({'user_id': self.user_id, '_id': ObjectId(str(plant_id))}, self.prepare_plant(plant))
    return records_affected > 0

  def delete_plant(self, plant_id):
    records_affected = self.plant_client.delete({'user_id': self.user_id, '_id': ObjectId(str(plant_id))})
    return records_affected > 0

  def dump(self, data):
    return PlantSchema().dump(data).data

  def prepare_plant(self, plant):
    data = plant.data
    data['user_id'] = self.user_id
    return data

