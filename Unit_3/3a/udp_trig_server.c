/*
 * UDP Server - Trigonometric Calculator
 * Receives trigonometric operation requests and sends back results
 * Supported operations: sin, cos, tan, asin, acos, atan
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <ctype.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8082
#define BUFFER_SIZE 1024
#define PI 3.14159265358979323846

// Function to convert degrees to radians
double deg_to_rad(double degrees) {
    return degrees * PI / 180.0;
}

// Function to convert radians to degrees
double rad_to_deg(double radians) {
    return radians * 180.0 / PI;
}

// Function to process trigonometric operation
void process_request(char *request, char *response) {
    char operation[10];
    double value, result;
    
    // Parse the request: "operation value"
    if (sscanf(request, "%s %lf", operation, &value) != 2) {
        sprintf(response, "ERROR: Invalid format. Use: <operation> <value>");
        return;
    }
    
    // Convert to lowercase for comparison
    for (int i = 0; operation[i]; i++) {
        operation[i] = tolower(operation[i]);
    }
    
    // Perform the operation
    if (strcmp(operation, "sin") == 0) {
        result = sin(deg_to_rad(value));
        sprintf(response, "sin(%lf°) = %lf", value, result);
    }
    else if (strcmp(operation, "cos") == 0) {
        result = cos(deg_to_rad(value));
        sprintf(response, "cos(%lf°) = %lf", value, result);
    }
    else if (strcmp(operation, "tan") == 0) {
        result = tan(deg_to_rad(value));
        sprintf(response, "tan(%lf°) = %lf", value, result);
    }
    else if (strcmp(operation, "asin") == 0) {
        if (value < -1.0 || value > 1.0) {
            sprintf(response, "ERROR: asin value must be between -1 and 1");
            return;
        }
        result = rad_to_deg(asin(value));
        sprintf(response, "asin(%lf) = %lf°", value, result);
    }
    else if (strcmp(operation, "acos") == 0) {
        if (value < -1.0 || value > 1.0) {
            sprintf(response, "ERROR: acos value must be between -1 and 1");
            return;
        }
        result = rad_to_deg(acos(value));
        sprintf(response, "acos(%lf) = %lf°", value, result);
    }
    else if (strcmp(operation, "atan") == 0) {
        result = rad_to_deg(atan(value));
        sprintf(response, "atan(%lf) = %lf°", value, result);
    }
    else {
        sprintf(response, "ERROR: Unknown operation. Supported: sin, cos, tan, asin, acos, atan");
    }
}

int main() {
    WSADATA wsa;
    SOCKET server_socket;
    struct sockaddr_in server_addr, client_addr;
    int client_addr_len = sizeof(client_addr);
    char buffer[BUFFER_SIZE];
    char response[BUFFER_SIZE];
    
    // Initialize Winsock
    printf("Initializing Winsock...\n");
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Failed to initialize Winsock. Error Code: %d\n", WSAGetLastError());
        return 1;
    }
    printf("Winsock initialized.\n");
    
    // Create socket
    if ((server_socket = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket. Error Code: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }
    printf("Socket created.\n");
    
    // Prepare the sockaddr_in structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);
    
    // Bind
    if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
        printf("Bind failed. Error Code: %d\n", WSAGetLastError());
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }
    printf("Bind successful.\n");
    printf("UDP Trigonometric Calculator Server listening on port %d...\n", PORT);
    printf("Supported operations: sin, cos, tan, asin, acos, atan\n");
    printf("Press Ctrl+C to stop.\n\n");
    
    // Keep listening for data
    while (1) {
        memset(buffer, 0, BUFFER_SIZE);
        memset(response, 0, BUFFER_SIZE);
        
        // Receive data from client
        int recv_len = recvfrom(server_socket, buffer, BUFFER_SIZE, 0, 
                                (struct sockaddr *)&client_addr, &client_addr_len);
        
        if (recv_len == SOCKET_ERROR) {
            printf("recvfrom() failed. Error Code: %d\n", WSAGetLastError());
            continue;
        }
        
        printf("Received request: %s\n", buffer);
        
        // Process the request
        process_request(buffer, response);
        printf("Sending response: %s\n\n", response);
        
        // Send response back to client
        if (sendto(server_socket, response, strlen(response), 0,
                   (struct sockaddr *)&client_addr, client_addr_len) == SOCKET_ERROR) {
            printf("sendto() failed. Error Code: %d\n", WSAGetLastError());
        }
    }
    
    // Cleanup (unreachable in this implementation)
    closesocket(server_socket);
    WSACleanup();
    
    return 0;
}
