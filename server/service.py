from flask import Flask

app =  Flask(__name__, static_url_path = "")

@app.route("/", methods=['GET'])
def index():
    """Front page""
    
