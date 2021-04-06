from flask import Flask, json, g, request, Response, redirect
from flask_cors import CORS
from app.service import Service as PlantService
from app.schema import PlantSchema

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
  return redirect("/plants")

@app.route("/plants", methods=["GET"])
def find_all_plants():
  return Response(response=json.dumps(PlantService(123).find_all_plants()), status=200) # 123 is temp user id


@app.route("/plant", methods=["POST"])
def create():
  plant = PlantSchema().load(json.loads(request.data))
  
  if plant.errors:
    return Response(response=json.dumps({'error': plant.errors}), status=422)

  res = PlantService(123).create_plant(plant)
  return Response(response=json.dumps(res), status=200)


@app.route("/plant/<plant_id>", methods=["GET"])
def show(plant_id):
  plant = PlantService(123).find_plant(plant_id)

  if plant:
    return Response(response=json.dumps(plant), status=200)
  else:
    return Response(response=json.dumps({'error': plant_id}), status=404)


@app.route("/plant/<plant_id>", methods=["POST"])
def update(plant_id):
   plant = PlantSchema().load(json.loads(request.data))
  
   if plant.errors:
     return Response(response=json.dumps({'error': plant.errors}), status=400)

   plant_service = PlantService(123)
   if plant_service.update_plant(plant_id, plant):
     return Response(response=json.dumps(plant.data), status=200)
   else:
     return Response(response=json.dumps({'error': 'plant not found'}), status=404)


@app.route("/plant/<plant_id>", methods=["DELETE"])
def delete(plant_id):
  plant_service = PlantService(123)
  if plant_service.delete_plant(plant_id):
    return Response(response=json.dumps({}), status=200)
  else:
    return Response(response=json.dumps({'error': plant_id}), status=404)


# def json_response(payload, status=200):
#   return (json.dumps(payload), status, {'content-type': 'application/json'})


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
