 """
 API URL Configuration
 """
 from django.urls import path
 from . import views
 urlpatterns = [
    path('upload/', views.upload_file, name='upload_file'),
    path('analyze/', views.analyze_query, name='analyze_query'),
 ]