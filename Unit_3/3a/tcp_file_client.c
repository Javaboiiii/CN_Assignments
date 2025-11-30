/*
 * TCP Client - File Transfer
 * Sends a file to the server
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8081
#define BUFFER_SIZE 4096

int main() {
    WSADATA wsa;
    SOCKET client_socket;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];
    char filename[256];
    
    // Initialize Winsock
    printf("Initializing Winsock...\n");
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Failed to initialize Winsock. Error Code: %d\n", WSAGetLastError());
        return 1;
    }
    printf("Winsock initialized.\n");
    
    // Get filename from user
    printf("Enter filename to send: ");
    scanf("%255s", filename);
    
    // Open file for reading
    FILE *fp = fopen(filename, "rb");
    if (fp == NULL) {
        printf("Failed to open file: %s\n", filename);
        WSACleanup();
        return 1;
    }
    
    // Create socket
    if ((client_socket = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket. Error Code: %d\n", WSAGetLastError());
        fclose(fp);
        WSACleanup();
        return 1;
    }
    printf("Socket created.\n");
    
    // Prepare the sockaddr_in structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    server_addr.sin_port = htons(PORT);
    
    // Connect to server
    if (connect(client_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
        printf("Connect failed. Error Code: %d\n", WSAGetLastError());
        fclose(fp);
        closesocket(client_socket);
        WSACleanup();
        return 1;
    }
    printf("Connected to server.\n");
    
    // Send filename
    if (send(client_socket, filename, strlen(filename), 0) == SOCKET_ERROR) {
        printf("Failed to send filename. Error Code: %d\n", WSAGetLastError());
        fclose(fp);
        closesocket(client_socket);
        WSACleanup();
        return 1;
    }
    printf("Sending file: %s\n", filename);
    
    // Send file data
    long total_bytes = 0;
    size_t bytes_read;
    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, fp)) > 0) {
        if (send(client_socket, buffer, bytes_read, 0) == SOCKET_ERROR) {
            printf("Send failed. Error Code: %d\n", WSAGetLastError());
            break;
        }
        total_bytes += bytes_read;
    }
    
    fclose(fp);
    printf("File sent successfully. Total bytes: %ld\n", total_bytes);
    
    // Close the send side to signal end of transmission
    shutdown(client_socket, SD_SEND);
    
    // Receive acknowledgment
    memset(buffer, 0, BUFFER_SIZE);
    int recv_size = recv(client_socket, buffer, BUFFER_SIZE, 0);
    if (recv_size > 0) {
        printf("Server response: %s\n", buffer);
    }
    
    // Cleanup
    closesocket(client_socket);
    WSACleanup();
    
    printf("Connection closed.\n");
    return 0;
}
