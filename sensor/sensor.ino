#include <HttpClient.h>
#include <TinyGPS++.h>

#define WAIT_GPS_S      60

HttpClient http;

http_header_t headers[] = {
    { "Content-Type", "application/json" },
    { "Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTI0YWE5OS1jY2Q3LTRiY2ItYTZmMS00NTUwOTRmMzc4OGYifQ.qMwuWmSeFJG8aFcBjVaExj101MkL-NDQABgCmPJ7UqI" },    
    { NULL, NULL } 
};

http_request_t request;
http_response_t response;

char status[128];

int GPS_EN = D4;
bool gps_valid = false;
int LED = D7;
bool alarm = false;
int timestamp;

double lat;
double lon;
double SoC;

TinyGPSPlus gps;
FuelGauge fuel;

void setup()
{
    // Use on board LED for diagnostic
    pinMode(LED, OUTPUT);
    // Wake up pin
    pinMode(WKP, INPUT);
    // GPS enable
	pinMode(GPS_EN, OUTPUT);
	// Turn GPS off
	digitalWrite(GPS_EN, LOW);

	Serial1.begin(9600);

	Cellular.on();
	Particle.connect();
	Particle.connected();

	Time.zone(2);

    request.hostname = "gaben.gleeze.com";
    request.port = 8000;
    request.path = "/api/coords";
}

void loop()
{
    // Wait till the device is connected to the cloud
    if (waitFor(Particle.connected, 10000)) 
    {
        // Check whether the wake up signal came from the sensor, not the time out
        if (digitalRead(WKP) == HIGH)
        {
            // Turn LED on
            digitalWrite(LED, HIGH); 
            
            // Send HTTP request 
            if (alarm == false)
            {
                request.body = "{\
                    \"tokens\": [\"d178z9cSGoo:APA91bHsQMZxL2QM5vWTNVP0ASFAAlqZGPVOJAAFPIImCNgmgC4aAmw1qu-VkANEC6MvdXtmQ9HhYzOX3xuoHw_z2mttQyosVZ-MdPsxZjBVIuuQueIYd6UaGUuu9b3ZoZnQdryZhgBV\"],\
                    \"profile\": \"dev\",\
                    \"notification\": {\
                    \"message\": \"Alarm on!\"\
                }";
                
                http.post(request, response, headers);
                
                sprintf(status,"%s", "ON");
                Particle.publish("Alarm", status, 60, PRIVATE);
                alarm = true;
            }
        }
        else
        {
            digitalWrite(LED, LOW); 
            alarm = false;
        }
    
        // Read battery state
        SoC = fuel.getSoC();
	    
	    // Enable GPS
	    digitalWrite(GPS_EN, HIGH);
	    
	    // Get timestamp
	    timestamp = Time.now();
	    gps_valid = false;
	    
	    while((Time.now() - timestamp < WAIT_GPS_S) && !gps_valid)
	    {
    	    // read GPS
    	    while (Serial1.available()) 
    	    {
    		    char c = Serial1.read();
    		    gps.encode(c);
    	    }
    	
        	if (gps.location.isValid()) 
        	{
        	    gps_valid = true;
        	    
        		lat = gps.location.lat();
        		lon = gps.location.lng();
     
        	    // Send coordinates to server
        	    char buff[100];
                sprintf(buff, "%s%.6f%s%.6f%s", "{\"deviceId\":\"dave\",\"latitude\":", lat, ",\"longitude\":", lon, "}");
                request.body = buff;
        
                // Get request
                http.post(request, response, headers);
                
                // Turn off GPS
        		digitalWrite(GPS_EN, LOW);
        	}
	    }
    }
    
    System.sleep(SLEEP_MODE_DEEP, 86400);
}
