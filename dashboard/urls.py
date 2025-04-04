from django.urls import path
from . import views
from .report import download_report

urlpatterns = [
    path('', views.dashboard_home, name='dashboard_home'),
    path("invoice/",views.invoice, name="invoice"),
    path("download-report/", download_report, name="download_report"),
]