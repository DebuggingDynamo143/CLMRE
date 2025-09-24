from flask import Flask, render_template, jsonify, request
import random
from datetime import datetime, timedelta
import json
import pandas as pd
import numpy as np
from data_ingestion import RealTimeDataIngestion
import os
app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize real-time data ingestion
data_ingestor = RealTimeDataIngestion()

@app.route('/')
def index():
    return render_template('dashboard.html', stats=get_real_time_stats())

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', stats=get_real_time_stats())

@app.route('/oceanography')
def oceanography():
    ocean_data = data_ingestor.get_oceanographic_data()
    locations = list(set([d['location'] for d in ocean_data]))
    return render_template('oceanography.html', 
                         ocean_data=ocean_data[:20],
                         locations=locations)

@app.route('/fisheries')
def fisheries():
    fisheries_data = data_ingestor.get_fisheries_data()
    species_counts, avg_abundance = calculate_fisheries_stats(fisheries_data)
    
    return render_template('fisheries.html',
                         species_counts=species_counts,
                         avg_abundance=avg_abundance,
                         fisheries_data=fisheries_data[:15],
                         total_records=len(fisheries_data))

@app.route('/molecular')
def molecular():
    molecular_data = data_ingestor.get_molecular_data()
    markers = list(set([d['genetic_marker'] for d in molecular_data]))
    species = list(set([d['species'] for d in molecular_data]))
    
    return render_template('molecular.html',
                         molecular_data=molecular_data[:20],
                         markers=markers,
                         species=species,
                         total_records=len(molecular_data))

@app.route('/correlations')
def correlations():
    correlations = data_ingestor.generate_ai_correlations()
    return render_template('correlations.html',
                         correlations=correlations,
                         total_correlations=len(correlations))

# API endpoints for real-time data
@app.route('/api/real-time-stats')
def api_real_time_stats():
    return jsonify(get_real_time_stats())

@app.route('/api/ocean-data')
def api_ocean_data():
    location = request.args.get('location', 'all')
    ocean_data = data_ingestor.get_oceanographic_data()
    
    if location != 'all':
        filtered_data = [d for d in ocean_data if d['location'] == location]
    else:
        filtered_data = ocean_data
    return jsonify(filtered_data)

@app.route('/api/fisheries-stats')
def api_fisheries_stats():
    species = request.args.get('species', 'all')
    fisheries_data = data_ingestor.get_fisheries_data()
    
    if species != 'all':
        filtered_data = [d for d in fisheries_data if d['species'] == species]
    else:
        filtered_data = fisheries_data
    
    monthly_avg = calculate_monthly_abundance(filtered_data)
    return jsonify(monthly_avg)

@app.route('/api/run-advanced-analysis')
def api_run_advanced_analysis():
    """Advanced AI correlation analysis with real-time data"""
    import time
    time.sleep(1)  # Simulate processing
    
    # Get current data for analysis
    ocean_data = data_ingestor.get_oceanographic_data()
    fisheries_data = data_ingestor.get_fisheries_data()
    
    analysis_result = data_ingestor.run_advanced_analysis(ocean_data, fisheries_data)
    return jsonify(analysis_result)

@app.route('/api/live-sensor-data')
def api_live_sensor_data():
    """Simulate live sensor data stream"""
    live_data = data_ingestor.generate_live_sensor_data()
    return jsonify(live_data)

def get_real_time_stats():
    ocean_data = data_ingestor.get_oceanographic_data()
    fisheries_data = data_ingestor.get_fisheries_data()
    molecular_data = data_ingestor.get_molecular_data()
    correlations = data_ingestor.generate_ai_correlations()
    
    return {
        'total_species': len(set([d['species'] for d in fisheries_data])),
        'ocean_samples': len(ocean_data),
        'genetic_records': len(molecular_data),
        'research_stations': 18,
        'strong_correlations': len([c for c in correlations if abs(c['correlation']) > 0.7]),
        'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'active_sensors': random.randint(45, 55),
        'data_quality': f"{random.uniform(98.5, 99.9):.1f}%"
    }

def calculate_fisheries_stats(fisheries_data):
    species_counts = {}
    species_abundance = {}
    
    for record in fisheries_data:
        species = record['species']
        if species not in species_counts:
            species_counts[species] = 0
            species_abundance[species] = []
        species_counts[species] += 1
        species_abundance[species].append(record['abundance'])
    
    avg_abundance = {species: sum(abundances)/len(abundances) 
                    for species, abundances in species_abundance.items()}
    
    return species_counts, avg_abundance

def calculate_monthly_abundance(data):
    monthly_data = {}
    for record in data:
        month = record['date'][:7]  # YYYY-MM
        if month not in monthly_data:
            monthly_data[month] = []
        monthly_data[month].append(record['abundance'])
    
    return {month: sum(abundances)/len(abundances) 
           for month, abundances in monthly_data.items()}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
