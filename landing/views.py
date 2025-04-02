from django.shortcuts import render
import os

def landing_page(request):
    # Optional debug: check the absolute path
    template_path = os.path.join(os.path.dirname(__file__), 'templates', 'landing', 'landing_page.html')
    print(f"Looking for template at: {template_path}")
    # Use the app-specific template path
    return render(request, 'landing/landing_page.html', {'title': 'AI-Powered Disaster Response'})