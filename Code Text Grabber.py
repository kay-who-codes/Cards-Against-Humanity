import os
import pyperclip

def collect_files_and_copy():
    # Get the script's current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Initialize file contents
    html_content = ''
    css_content = ''
    js_content = ''
    
    # Loop through files in the current directory
    for filename in os.listdir(current_dir):
        file_path = os.path.join(current_dir, filename)
        
        # Skip the script itself
        if filename == os.path.basename(__file__):
            continue
        
        # Read the content of .html, .css, and .js files
        if filename.endswith('.html'):
            with open(file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
        elif filename.endswith('.css'):
            with open(file_path, 'r', encoding='utf-8') as file:
                css_content = file.read()
        elif filename.endswith('.js'):
            with open(file_path, 'r', encoding='utf-8') as file:
                js_content = file.read()
    
    # Prepare the formatted text
    formatted_text = f".HTML: {html_content}\n\n.CSS: {css_content}\n\n.JS: {js_content}"
    
    # Copy the formatted text to the clipboard
    pyperclip.copy(formatted_text)
    print("Formatted text has been copied to the clipboard.")

# Run the function
collect_files_and_copy()
