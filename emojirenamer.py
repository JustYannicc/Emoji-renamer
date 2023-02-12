import os
import requests

def convert_emoji_unicode_to_name(path):
    for filename in os.listdir(path):
        file_name, file_extension = os.path.splitext(filename)
        search_url = f"https://openmoji.org/api/v1/search?q={file_name}"
        response = requests.get(search_url)
        results = response.json()
        if results:
            emoji_name = results[0]['short_name'].lower().replace(" ", "_")
            new_filename = f":{emoji_name}:" + file_extension
            if new_filename != filename:
                os.rename(os.path.join(path, filename), os.path.join(path, new_filename))
                print(f"Renamed {filename} to {new_filename}")
            else:
                print(f"No changes made to {filename}")
        else:
            print(f"{file_name} is not an emoji, {filename} remains unchanged")

if __name__ == "__main__":
    path = os.path.join(os.path.expanduser("~"), "Downloads", "openmoji-svg-color")
    convert_emoji_unicode_to_name(path)
