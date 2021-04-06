class Plant(object):
  def __init__(self, adapter=None):
    self.client = adapter()

  def find_all(self, selector):
    return self.client.find_all(selector)
 
  def find(self, selector):
    return self.client.find(selector)
 
  def create(self, plant):
    return self.client.create(plant)
  
  def update(self, selector, plant):
    return self.client.update(selector, plant)
  
  def delete(self, selector):
    return self.client.delete(selector)