import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_oceanographic_data():
    """Generate dummy oceanographic data"""
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    
    data = {
        'date': dates,
        'temperature': np.random.uniform(25, 32, len(dates)),
        'salinity': np.random.uniform(33, 37, len(dates)),
        'ph': np.random.uniform(7.8, 8.4, len(dates)),
        'dissolved_oxygen': np.random.uniform(4.5, 7.2, len(dates)),
        'chlorophyll': np.random.uniform(0.1, 2.5, len(dates)),
        'location': ['Arabian Sea'] * len(dates)
    }
    
    return pd.DataFrame(data)

def generate_fisheries_data():
    """Generate dummy fisheries data"""
    species = ['Tuna', 'Mackerel', 'Sardine', 'Pomfret', 'Shark', 'Crab', 'Lobster']
    locations = ['Kerala Coast', 'Tamil Nadu Coast', 'Goa Coast', 'Gujarat Coast']
    
    data = []
    for _ in range(1000):
        data.append({
            'species': np.random.choice(species),
            'abundance': np.random.randint(10, 500),
            'length_cm': np.random.uniform(10, 150),
            'weight_kg': np.random.uniform(0.5, 50),
            'location': np.random.choice(locations),
            'date': datetime(2023, np.random.randint(1, 13), np.random.randint(1, 28)),
            'depth_m': np.random.randint(10, 200)
        })
    
    return pd.DataFrame(data)

def generate_molecular_data():
    """Generate dummy molecular biology data"""
    species = ['Thunnus albacares', 'Rastrelliger kanagurta', 'Sardinella longiceps', 
               'Pampus argenteus', 'Carcharhinus limbatus', 'Portunus pelagicus']
    
    data = []
    for _ in range(500):
        data.append({
            'species': np.random.choice(species),
            'genetic_marker': np.random.choice(['COI', '16S rRNA', '12S rRNA', 'cytb']),
            'sequence_length': np.random.randint(500, 1500),
            'barcode_status': np.random.choice(['Valid', 'Pending', 'Verified']),
            'location': f"Station_{np.random.randint(1, 20)}",
            'collection_date': datetime(2023, np.random.randint(1, 13), np.random.randint(1, 28)),
            'edna_concentration': np.random.uniform(0.1, 5.0)
        })
    
    return pd.DataFrame(data)

def generate_otolith_data():
    """Generate dummy otolith morphology data"""
    species = ['Tuna', 'Mackerel', 'Sardine', 'Pomfret']
    
    data = []
    for _ in range(200):
        species_choice = np.random.choice(species)
        data.append({
            'species': species_choice,
            'otolith_length_mm': np.random.uniform(2, 15),
            'otolith_width_mm': np.random.uniform(1, 8),
            'shape_factor': np.random.uniform(1.2, 2.5),
            'age_years': np.random.randint(1, 10),
            'location': np.random.choice(['Arabian Sea', 'Bay of Bengal']),
            'image_id': f"OT_{np.random.randint(1000, 9999)}"
        })
    
    return pd.DataFrame(data)