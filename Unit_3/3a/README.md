# Unit 3a: Network Programming in C

This folder contains TCP and UDP client-server programs demonstrating network communication in C for Windows.

## Programs Overview

### 1. TCP Hello Message Exchange
- **Files**: `tcp_hello_server.c`, `tcp_hello_client.c`
- **Description**: Simple TCP client-server application that exchanges "Hello" messages
- **Port**: 8080

### 2. TCP File Transfer
- **Files**: `tcp_file_server.c`, `tcp_file_client.c`
- **Description**: TCP-based file transfer system where client sends a file to server
- **Port**: 8081

### 3. UDP Trigonometric Calculator
- **Files**: `udp_trig_server.c`, `udp_trig_client.c`
- **Description**: UDP-based calculator for trigonometric operations
- **Port**: 8082
- **Supported Operations**: sin, cos, tan, asin, acos, atan

## Compilation Instructions

All programs use Winsock2 library. Compile using GCC (MinGW) or MSVC.

### Using GCC (MinGW):

```powershell
# TCP Hello Message Exchange
gcc tcp_hello_server.c -o tcp_hello_server.exe -lws2_32
gcc tcp_hello_client.c -o tcp_hello_client.exe -lws2_32

# TCP File Transfer
gcc tcp_file_server.c -o tcp_file_server.exe -lws2_32
gcc tcp_file_client.c -o tcp_file_client.exe -lws2_32

# UDP Trigonometric Calculator
gcc udp_trig_server.c -o udp_trig_server.exe -lws2_32
gcc udp_trig_client.c -o udp_trig_client.exe -lws2_32
```

### Using MSVC (Visual Studio Developer Command Prompt):

```powershell
# TCP Hello Message Exchange
cl tcp_hello_server.c ws2_32.lib
cl tcp_hello_client.c ws2_32.lib

# TCP File Transfer
cl tcp_file_server.c ws2_32.lib
cl tcp_file_client.c ws2_32.lib

# UDP Trigonometric Calculator
cl udp_trig_server.c ws2_32.lib
cl udp_trig_client.c ws2_32.lib
```

## Running the Programs

### 1. TCP Hello Message Exchange

**Terminal 1 (Server):**
```powershell
.\tcp_hello_server.exe
```

**Terminal 2 (Client):**
```powershell
.\tcp_hello_client.exe
```

**Expected Output:**
- Server receives: "Hello from Client!"
- Client receives: "Hello from Server!"

---

### 2. TCP File Transfer

**Preparation:** Create a test file to transfer
```powershell
echo "This is a test file for transfer" > testfile.txt
```

**Terminal 1 (Server):**
```powershell
.\tcp_file_server.exe
```

**Terminal 2 (Client):**
```powershell
.\tcp_file_client.exe
# When prompted, enter: testfile.txt
```

**Expected Output:**
- Client sends the file to server
- Server saves the file with the same name
- Server sends acknowledgment back to client

---

### 3. UDP Trigonometric Calculator

**Terminal 1 (Server):**
```powershell
.\udp_trig_server.exe
```

**Terminal 2 (Client):**
```powershell
.\udp_trig_client.exe
```

**Example Operations:**
```
sin 30      → sin(30°) = 0.5
cos 60      → cos(60°) = 0.5
tan 45      → tan(45°) = 1.0
asin 0.5    → asin(0.5) = 30°
acos 0.5    → acos(0.5) = 60°
atan 1      → atan(1) = 45°
```

Type `quit` to exit the client.

---

## Protocol Details

### TCP (Transmission Control Protocol)
- **Connection-oriented**: Establishes a connection before data transfer
- **Reliable**: Guarantees delivery and order of packets
- **Use Cases**: File transfer, reliable message exchange
- **Functions**: `socket()`, `bind()`, `listen()`, `accept()`, `connect()`, `send()`, `recv()`

### UDP (User Datagram Protocol)
- **Connectionless**: No connection establishment required
- **Unreliable**: No guarantee of delivery or order
- **Fast**: Lower overhead than TCP
- **Use Cases**: Real-time applications, simple request-response (like calculator)
- **Functions**: `socket()`, `bind()`, `sendto()`, `recvfrom()`

## Program Features

### TCP Hello Server/Client
- Basic TCP connection establishment
- Bidirectional message exchange
- Proper socket cleanup

### TCP File Transfer
- Binary file transfer support
- Progress tracking with byte count
- Server acknowledgment
- Proper connection shutdown signaling

### UDP Trigonometric Calculator
- Stateless request-response model
- Error handling for invalid operations
- Support for all basic trigonometric functions
- Degree/radian conversion handling
- Interactive client interface

## Troubleshooting

### Common Issues:

1. **"Bind failed" error**
   - Port may already be in use
   - Try closing any existing server instances
   - Change the PORT constant in the code if needed

2. **"Connect failed" error**
   - Ensure server is running before starting client
   - Check if firewall is blocking connections
   - Verify correct IP address and port

3. **Compilation errors**
   - Ensure Winsock2 library is linked (`-lws2_32`)
   - For GCC, make sure MinGW is properly installed
   - For MSVC, run from Developer Command Prompt

4. **File transfer issues**
   - Ensure file exists in the same directory as client executable
   - Check file permissions
   - Verify sufficient disk space on server side

## Notes

- All programs use `localhost (127.0.0.1)` for connections
- Servers run indefinitely and must be stopped with Ctrl+C
- TCP programs handle one client at a time
- UDP calculator server can handle multiple clients simultaneously
- Programs include proper error checking and resource cleanup

## Learning Objectives

1. Understanding TCP vs UDP protocols
2. Socket programming concepts
3. Client-server architecture
4. Network byte order handling
5. File I/O with network programming
6. Error handling in network applications
7. Winsock API usage on Windows
