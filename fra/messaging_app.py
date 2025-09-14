# messaging_app.py
from flask import Flask, request, jsonify
from fra.twilio_service import send_message  # import from your helper

app = Flask(__name__)

@app.route("/")
def health():
    return {"status": "Messaging API running"}

@app.route("/notify", methods=["POST"])
def notify():
    data = request.json or {}
    number = data.get("number")          # phone number (+91xxxxxx)
    message = data.get("message")        # base message
    lang = data.get("lang", "en")        # language code
    use_whatsapp = data.get("whatsapp", False)

    if not number or not message:
        return jsonify({"error": "number and message required"}), 400

    result = send_message(number, message, lang, use_whatsapp)
    return jsonify(result)

if __name__ == "__main__":   # ✅ fix the __name__ bug
    app.run(port=6000, debug=True)  # run on port 6000 so it doesn’t clash with main FRA backend
