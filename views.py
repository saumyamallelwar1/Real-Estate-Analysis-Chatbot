"""
 API Views for Real Estate Chatbot
 """
 from rest_framework.decorators import api_view
 from rest_framework.response import Response
 from rest_framework import status
 import pandas as pd
 import json
 from django.core.files.storage import default_storage
 from django.conf import settings
 import os
 def generate_llm_summary(area_data, query_type='single', areas=None):
 """Generate natural language summary based on data"""
 if query_type == 'comparison' and areas and len(areas) >= 2:
        summaries = []
 for area in areas:
            data = area_data.get(area.lower())
 if data and not data.empty:
                growth = ((data['avg_price'].iloc[-1] - data['avg_price'].iloc[0]) / 
                         data['avg_price'].iloc[0] * 100)
                summaries.append(f"{area}: {growth:.1f}% price growth")
 return f"Comparison Analysis:\n\n" + "\n".join(f"• {s}" for s in summaries)
 else:
        area = list(area_data.keys())[0] if area_data else ""
        data = list(area_data.values())[0] if area_data else pd.DataFrame()
 if data.empty:
 return "No data available for analysis."
        avg_price_start = data['avg_price'].iloc[0]
        avg_price_end = data['avg_price'].iloc[-1]
        growth_rate = ((avg_price_end - avg_price_start) / avg_price_start * 100)
        demand_trend = "increasing" if data['demand'].iloc[-1] > data['demand'].iloc[0] else "stable"
        summary = f"""{area.title()} Real Estate Analysis:
 The area shows a price appreciation of {growth_rate:.1f}% over the analyzed period, with average prices moving from ₹{avg_
 Demand trends are {demand_trend}, with current demand index at {data['demand'].iloc[-1]:.0f}. The locality has maintained a
This area represents {"strong growth potential" if growth_rate > 10 else "stable investment opportunity"} with {"high" if data
 return summary
 @api_view(['POST'])
 def upload_file(request):
 """Handle file upload and store it"""
 try:
 if 'file' not in request.FILES:
 return Response(
 {'error': 'No file provided'},
                status=status.HTTP_400_BAD_REQUEST
 )
 file = request.FILES['file']
        file_path = default_storage.save(f'uploads/{file.name}', file)
 return Response({
 'message': 'File uploaded successfully',
 'file_path': file_path
 })
 except Exception as e:
 return Response(
 {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
 )
 @api_view(['POST'])
 def analyze_query(request):
 """Analyze user query and return results"""
 try:
        query = request.data.get('query', '').lower()
 if not query:
 return Response(
 {'error': 'Query is required'},
                status=status.HTTP_400_BAD_REQUEST
 )
        data = load_real_estate_data()
        query_info = parse_query(query)
        filtered_data = filter_data(data, query_info)
        chart_data = generate_chart_data(filtered_data, query_info)
        summary = generate_llm_summary(filtered_data, query_info['type'], query_info.get('areas'))
        table_data = generate_table_data(filtered_data)
 return Response({
 'summary': summary,
 'chart_data': chart_data,
 'table_data': table_data,
 'query_type': query_info['type']
 })
 except Exception as e:
 return Response(
 {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
 )
 def load_real_estate_data():
 """Load real estate data from Excel or use mock data"""
    mock_data = {
 'wakad': pd.DataFrame({
 'area': ['Wakad'] * 3,
 'year': [2021, 2022, 2023],
 'avg_price': [5500, 6100, 6800],
 'demand': [75, 82, 88],
 'size': ['2BHK'] * 3,
 'inventory': [450, 520, 580]
 }),
 'aundh': pd.DataFrame({
 'area': ['Aundh'] * 3,
 'year': [2021, 2022, 2023],
 'avg_price': [7200, 7700, 8200],
 'demand': [85, 87, 90],
 'size': ['2BHK'] * 3,
 'inventory': [380, 400, 420]
 }),
 'ambegaon budruk': pd.DataFrame({
 'area': ['Ambegaon Budruk'] * 3,
 'year': [2021, 2022, 2023],
 'avg_price': [4200, 4800, 5500],
 'demand': [65, 73, 80],
 'size': ['2BHK'] * 3,
 'inventory': [320, 380, 450]
 }),
 'akurdi': pd.DataFrame({
 'area': ['Akurdi'] * 3,
 'year': [2021, 2022, 2023],
'avg_price': [4800, 5300, 5900],
 'demand': [70, 75, 78],
 'size': ['2BHK'] * 3,
 'inventory': [410, 440, 480]
 }),
 }
 return mock_data
 def parse_query(query):
 """Parse user query to understand intent"""
    areas = ['wakad', 'aundh', 'ambegaon budruk', 'akurdi']
    found_areas = [area for area in areas if area in query]
 if 'compare' in query and len(found_areas) >= 2:
 return {
 'type': 'comparison',
 'areas': found_areas[:2]
 }
 elif found_areas:
 return {
 'type': 'single',
 'areas': [found_areas[0]]
 }
 else:
 return {
 'type': 'unknown',
 'areas': []
 }
 def filter_data(data, query_info):
 """Filter data based on query information"""
    filtered = {}
 for area in query_info.get('areas', []):
 if area in data:
            filtered[area] = data[area]
 return filtered
 def generate_chart_data(filtered_data, query_info):
 """Generate chart data for visualization"""
if query_info['type'] == 'comparison':
        chart_data = []
        years = set()
 for area, df in filtered_data.items():
            years.update(df['year'].tolist())
 for year in sorted(years):
            row = {'year': int(year)}
 for area, df in filtered_data.items():
                year_data = df[df['year'] == year]
 if not year_data.empty:
                    row[f'{area}_price'] = float(year_data['avg_price'].iloc[0])
                    row[f'{area}_demand'] = float(year_data['demand'].iloc[0])
            chart_data.append(row)
 return chart_data
 else:
 if filtered_data:
            area = list(filtered_data.keys())[0]
            df 
= filtered_data[area]
            chart_data = []
 for _, row in df.iterrows():
                chart_data.append({
 'year': int(row['year']),
 'price': float(row['avg_price']),
 'demand': float(row['demand'])
 })
 return chart_data
 return []
 def generate_table_data(filtered_data):
 """Generate table data for display"""
    table_data = []
 for area, df in filtered_data.items():
 for _, row in df.iterrows():
            table_data.append({
 'area': row['area'],
 'year': int(row['year']),
'avg_price': float(row['avg_price']),
 'demand': float(row['demand']),
 'size': row['size'],
 'inventory': int(row['inventory'])
 })
 return table_data