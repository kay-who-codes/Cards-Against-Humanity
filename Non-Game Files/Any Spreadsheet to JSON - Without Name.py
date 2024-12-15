import os
import pandas as pd
import json

def find_files():
    """Find all Excel and CSV files in the current directory."""
    current_dir = os.getcwd()
    files = [f for f in os.listdir(current_dir) if os.path.isfile(f) and f.lower().endswith(('.csv', '.xls', '.xlsx'))]
    return files

def read_file(file_path):
    """Read an Excel or CSV file into a pandas DataFrame."""
    try:
        if file_path.lower().endswith('.csv'):
            return pd.read_csv(file_path)
        else:
            # Attempt to read Excel file
            return pd.read_excel(file_path, engine='openpyxl')  # Ensure openpyxl is used for xlsx files
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def convert_files_to_json(files):
    """Convert the contents of the files into a JSON format."""
    all_data = []  # A list to store all records without file-specific keys
    for file in files:
        file_data = read_file(file)
        if file_data is not None:
            # Convert the DataFrame to a list of records and extend the all_data list
            all_data.extend(file_data.to_dict(orient='records'))
        else:
            print(f"Skipping {file} due to an error in reading.")
    return all_data

def write_json(data, output_file="output.json"):
    """Write the JSON data to a file in the same directory as the script."""
    output_path = os.path.join(os.getcwd(), output_file)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    print("Scanning for Excel and CSV files...")
    files = find_files()

    if not files:
        print("No Excel or CSV files found in the current directory.")
    else:
        print(f"Found files: {files}")
        print("Processing files...")
        data = convert_files_to_json(files)
        if data:
            write_json(data)
            print("Data has been written to output.json in the current directory.")
        else:
            print("No data was converted. Check for errors.")
