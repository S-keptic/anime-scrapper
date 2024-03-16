This project is a web scraping script written in Node.js for extracting data from IMDb pages of specific anime titles. The script uses request, request-promise, and cheerio to fetch information, such as the anime title and its poster image, and stores the data in a JSON file.
Project Structure

    index.js: The main script containing the web scraping logic.
    data.json: The output JSON file where the scraped data is stored. 
    node_modules/: Directory containing Node.js modules (not included in the repository).
    package.json: Node.js project configuration file.
    README.md: Documentation file for the project.

Dependencies

    request-promise: Simplifies making HTTP requests and handling responses.
    request: Simplifies making HTTP requests.
    cheerio: Implements a jQuery-like interface for parsing HTML and manipulating the DOM.
    fs: Node.js built-in module for handling file operations.

Usage

    Install dependencies by running:

    bash

npm install

Run the script:

bash

    node index.js

    This will scrape data from the specified IMDb URLs and save it to data.json.

IMDb URLs

The IMDb URLs are defined in the URLS array in index.js. Customize this array to include URLs for other anime titles.

javascript

const URLS = [
    {
        url: "https://www.imdb.com/title/tt1910272/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_steins%2520gate",
        id: "steinsGate"
    },
    { url: "https://www.imdb.com/title/tt3358020/?ref_=nv_sr_srsg_0_tt_7_nm_1_q_parasyt", id: "parasyte" }
];

Output

The scraped data is saved in data.json. Each entry in the JSON file includes the anime title and its corresponding poster image.

json

[
    {
        "title": "Steins Gate",
        "poster": "https://example.com/steinsgate.jpg"
    },
    {
        "title": "Parasyte",
        "poster": "https://example.com/parasyte.jpg"
    }
]

Feel free to customize and extend this project as needed!
