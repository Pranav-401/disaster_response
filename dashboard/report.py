from pathlib import Path
import google.generativeai as genai
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.shortcuts import render
from django.http import FileResponse
from reportlab.lib.utils import simpleSplit
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate
from reportlab.lib import colors
import os

# Configure API
google_api_key = "AIzaSyDpaMgQ8492asYfqpp400TfPX4RN8ytkt4"
genai.configure(api_key=google_api_key)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

def generate_report():
    prompt = """
    Allocate the available resources efficiently based on real-time disaster data. Prioritize areas with the highest severity, population density, and urgency. Ensure optimal distribution of food, water, medical supplies, and rescue teams while minimizing delays and wastage. Adjust resource allocation dynamically as new data arrives, optimizing transportation and logistics for the fastest response.

    Here’s a list of essential resources you can allocate during a disaster:

    1. **Human Resources:**
        - Emergency response teams
        - Medical personnel (doctors, nurses, paramedics)
        - Firefighters
        - Police officers
        - Volunteers
        - Search and rescue teams
    2. **Medical Resources:**
        - First aid kits
        - Stretchers and wheelchairs
        - Emergency medicines (painkillers, antibiotics, etc.)
        - Oxygen cylinders
        - Blood supply
        - Defibrillators
        - Sanitation supplies (gloves, masks, disinfectants)
    3. **Food & Water Supplies:**
        - Packaged food (ready-to-eat meals, canned food)
        - Clean drinking water
        - Baby food and formula
        - Cooking utensils and portable stoves
    4. **Shelter & Infrastructure:**
        - Temporary shelters (tents, tarps, sleeping bags)
        - Blankets and warm clothing
        - Power generators
        - Fuel supply
        - Portable toilets and sanitation facilities
    5. **Transportation & Logistics:**
        - Ambulances
        - Fire trucks
        - Boats (for flood situations)
        - Helicopters and drones
        - Trucks for supply transport
    """
    response = model.generate_content(prompt)
    report_text = response.text if response else "No data generated."
    print(report_text)
    pdf_path = "dashboard/static/media/report.pdf"
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    
    styles = getSampleStyleSheet()
    content = []
    
    # Title
    title = Paragraph("<b>Disaster Response Report</b>", styles["Title"])
    content.append(title)

    # Report Text (Formatted)
    for paragraph in report_text.strip().split("\n\n"):
        para = Paragraph(paragraph.replace("\n", "<br/>"), styles["BodyText"])
        content.append(para)

    doc.build(content)
    return pdf_path

def download_report(request):
    pdf_path = generate_report()
    return FileResponse(open(pdf_path, "rb"), content_type="application/pdf", as_attachment=True, filename="report.pdf")

