# run.py
from fra import app
from flask import render_template

@app.route("/map")
def map_view():
    return render_template("map.html")

if __name__ == "__main__":
    app.run(debug=True)
