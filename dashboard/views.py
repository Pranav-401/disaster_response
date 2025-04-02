from django.shortcuts import render
import os

def dashboard_home(request):
    # Optional debug
    template_path = os.path.join(os.path.dirname(__file__), 'templates', 'dashboard', 'dashboard_home.html')
    print(f"Looking for template at: {template_path}")
    return render(request, 'dashboard/dashboard_home.html', {'title': 'Disaster Response Dashboard'})