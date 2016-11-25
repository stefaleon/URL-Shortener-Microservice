## URL Shortener Microservice

* User Story:  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
* User Story: When I visit that shortened URL, it will redirect me to my original link.  
  
    
#### Dependencies
* Express
* url-exists
* mongoose  

## Usage: https://url-shortener-ls.herokuapp.com/new/[URL]

