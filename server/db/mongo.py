import os
from pymongo import MongoClient

COLLECTION_NAME = 'greenhouse'

class MongoPlant(object):
  def __init__(self):
    # self.client = MongoClient("mongodb://localhost:27017/")  
    self.db = MongoClient("mongodb://localhost:27017/", authSource="admin", username="mongo_user",
                 password="mongo_secret").greenhouse # TODO implement real user/pass

  def find_all(self, selector):
    return self.db.greenhouse.find(selector)
 
  def find(self, selector):
    return self.db.greenhouse.find_one(selector)
 
  def create(self, plant):
    return self.db.greenhouse.insert_one(plant)

  def update(self, selector, plant):
    return self.db.greenhouse.replace_one(selector, plant).modified_count
 
  def delete(self, selector):
    return self.db.greenhouse.delete_one(selector).deleted_count