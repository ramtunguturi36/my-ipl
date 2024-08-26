from flask import Flask, jsonify
import pandas as pd
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/data')
def get_data():
    try:
        # Read the Excel file
        df = pd.read_excel('/mnt/data/scraped_data.xlsx')
        # Convert DataFrame to a list of dictionaries
        data = df.to_dict(orient='records')
        logging.info("Data successfully read and converted.")
        return jsonify(data)
    except Exception as e:
        logging.error("Error reading data: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
