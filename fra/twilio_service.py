# fra/twilio_service.py
import os
from twilio.rest import Client
from googletrans import Translator
from dotenv import load_dotenv

load_dotenv()

# Load secrets
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_PHONE = os.getenv("TWILIO_PHONE")

client = Client(TWILIO_SID, TWILIO_AUTH)
translator = Translator()

def send_message(to_number, message, lang="en", use_whatsapp=False):
    """
    Sends SMS or WhatsApp message with optional translation.
    """
    if lang != "en":
        translated = translator.translate(message, dest=lang)
        message = translated.text

    if use_whatsapp:
        from_number = f"whatsapp:{TWILIO_PHONE}"
        to_number = f"whatsapp:{to_number}"
    else:
        from_number = TWILIO_PHONE

    msg = client.messages.create(
        from_=from_number,
        to=to_number,
        body=message
    )
    return {"sid": msg.sid, "status": msg.status, "to": to_number, "body": message}
