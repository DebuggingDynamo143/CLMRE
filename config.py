import os

class Config:
    SECRET_KEY = 'marine-data-platform-2024-real-time'
    DEBUG = True
    TEMPLATES_AUTO_RELOAD = True
    # Real-time data settings
    DATA_REFRESH_INTERVAL = 300  # 5 minutes
    SENSOR_UPDATE_FREQUENCY = 60  # 1 minute
    MAX_CACHE_SIZE = 1000