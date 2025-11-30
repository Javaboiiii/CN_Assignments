/*
 * TCP Server - File Transfer
 * Receives a file from client and saves it to disk
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
    SOCKET server_socket, client_socket;
    struct sockaddr_in server_addr, client_addr;
    int client_addr_len = sizeof(client_addr);
    char buffer[BUFFER_SIZE];
    char filename[256];
    
    // Initialize Winsock
    printf("Initializing Winsock...\n");
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("Failed to initialize Winsock. Error Code: %d\n", WSAGetLastError());
        return 1;
    }
    printf("Winsock initialized.\n");
    
    // Create socket
    if ((server_socket = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
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
    
    // Listen
    if (listen(server_socket, 3) == SOCKET_ERROR) {
        printf("Listen failed. Error Code: %d\n", WSAGetLastError());
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }
    printf("Waiting for incoming connections on port %d...\n", PORT);
    
    // Accept incoming connection
    client_socket = accept(server_socket, (struct sockaddr *)&client_addr, &client_addr_len);
    if (client_socket == INVALID_SOCKET) {
        printf("Accept failed. Error Code: %d\n", WSAGetLastError());
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }
    printf("Connection accepted.\n");
    
    // Receive filename
    memset(filename, 0, sizeof(filename));
    int recv_size = recv(client_socket, filename, sizeof(filename) - 1, 0);
    if (recv_size <= 0) {
        printf("Failed to receive filename.\n");
        closesocket(client_socket);
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }
    printf("Receiving file: %s\n", filename);
    
    // Open file for writing
    FILE *fp = fopen(filename, "wb");
    if (fp == NULL) {
        printf("Failed to create file.\n");
        closesocket(client_socket);
        closesocket(server_socket);
        WSACleanup();
        return 1;
    }
    
    // Receive file data
    long total_bytes = 0;
    while ((recv_size = recv(client_socket, buffer, BUFFER_SIZE, 0)) > 0) {
        fwrite(buffer, 1, recv_size, fp);
        total_bytes += recv_size;
    }
    
    fclose(fp);
    printf("File received successfully. Total bytes: %ld\n", total_bytes);
    
    // Send acknowledgment
    char *ack = "File received successfully";
    send(client_socket, ack, strlen(ack), 0);
    
    // Cleanup
    closesocket(client_socket);
    closesocket(server_socket);
    WSACleanup();
    
    printf("Connection closed.\n");
    return 0;
}
