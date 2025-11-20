from django.test import TestCase
 from rest_framework.test import APIClient
 from rest_framework import status
 import json
 class RealEstateAPITestCase(TestCase):
 """Test cases for Real Estate API"""
 def setUp(self):
 """Set up test client"""
        self.client = APIClient()
 def test_analyze_wakad(self):
 """Test analyzing Wakad area"""
        response = self.client.post(
 '/api/analyze/',
 {'query': 'Analyze Wakad'},
 format='json'
 )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('summary', response.data)
        self.assertIn('chart_data', response.data)
        self.assertIn('table_data', response.data)
 def test_compare_areas(self):
 """Test comparing two areas"""
        response = self.client.post(
 '/api/analyze/',
 {'query': 'Compare Wakad and Aundh'},
 format='json'
 )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['query_type'], 'comparison')
 def test_empty_query(self):
 """Test with empty query"""
        response = self.client.post(
 '/api/analyze/',
 {'query': ''},
 format='json'
 )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
def test_unknown_area(self):
 """Test with unknown area"""
        response = self.client.post(
 '/api/analyze/',
 {'query': 'Analyze Unknown Area'},
 format='json'
 )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
 # Should still return response but with empty data
 # Run tests with: python manage.py test