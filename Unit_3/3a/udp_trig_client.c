/*
 * UDP Client - Trigonometric Calculator
 * Sends trigonometric operation requests to server and displays results
 * Supported operations: sin, cos, tan, asin, acos, atan
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8082
#define BUFFER_SIZE 1024

int main() {
    WSADATA wsa;
    SOCKET client_socket;
    struct sockaddr_in server_addr;
    int server_addr_len = sizeof(server_addr);
    char buffer[BUFFER_SIZE];
    char operation[10];
    double value;
    
    // Initialize Winsock
    printf("Initializing Winsock...\n");
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Failed to initialize Winsock. Error Code: %d\n", WSAGetLastError());
        return 1;
    }
    printf("Winsock initialized.\n");
    
    // Create socket
    if ((client_socket = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket. Error Code: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }
    printf("Socket created.\n");
    
    // Prepare the sockaddr_in structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    server_addr.sin_port = htons(PORT);
    
    printf("\n=== UDP Trigonometric Calculator Client ===\n");
    printf("Supported operations:\n");
    printf("  sin, cos, tan  - Input in degrees\n");
    printf("  asin, acos, atan - Input value (result in degrees)\n");
    printf("Type 'quit' to exit\n\n");
    
    while (1) {
        // Get operation from user
        printf("Enter operation (e.g., 'sin 45' or 'asin 0.5'): ");
        fgets(buffer, BUFFER_SIZE, stdin);
        
        // Remove newline
        buffer[strcspn(buffer, "\n")] = 0;
        
        // Check for quit
        if (strcmp(buffer, "quit") == 0) {
            printf("Exiting...\n");
            break;
        }
        
        // Send request to server
        if (sendto(client_socket, buffer, strlen(buffer), 0,
                   (struct sockaddr *)&server_addr, server_addr_len) == SOCKET_ERROR) {
            printf("sendto() failed. Error Code: %d\n", WSAGetLastError());
            continue;
        }
        
        // Receive response from server
        memset(buffer, 0, BUFFER_SIZE);
        int recv_len = recvfrom(client_socket, buffer, BUFFER_SIZE, 0,
                                (struct sockaddr *)&server_addr, &server_addr_len);
        
        if (recv_len == SOCKET_ERROR) {
            printf("recvfrom() failed. Error Code: %d\n", WSAGetLastError());
            continue;
        }
        
        printf("Result: %s\n\n", buffer);
    }
    
    // Cleanup
    closesocket(client_socket);
    WSACleanup();
    
    return 0;
}
