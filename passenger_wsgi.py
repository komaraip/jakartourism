import os
import sys

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

# Fix paths for static files
STATIC_DIR = os.path.join(os.path.dirname(__file__), 'static')

# Import the Flask application
from app import app as application

# Configure static folders explicitly if needed
if hasattr(application, 'config'):
    application.config['STATIC_FOLDER'] = STATIC_DIR