#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>
#include <cstring>
#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string host = "127.0.0.1";
    int port = 3000;
    std::string body = R"({"prompt":"What are the top 3 stories on Hacker News right now?"})";

    std::ostringstream req;
    req << "POST /api/v1/run HTTP/1.1\r\n"
        << "Host: " << host << ":" << port << "\r\n"
        << "Content-Type: application/json\r\n"
        << "Content-Length: " << body.size() << "\r\n"
        << "Connection: close\r\n\r\n" << body;

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) { std::cerr << "socket error\n"; return 1; }

    struct sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, host.c_str(), &addr.sin_addr);

    if (connect(sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        std::cerr << "connect error\n"; close(sock); return 1;
    }

    std::string request = req.str();
    send(sock, request.c_str(), request.size(), 0);

    std::string response;
    char buf[4096];
    ssize_t n;
    while ((n = recv(sock, buf, sizeof(buf) - 1, 0)) > 0) {
        buf[n] = '\0';
        response += buf;
    }
    close(sock);

    auto sep = response.find("\r\n\r\n");
    if (sep != std::string::npos)
        std::cout << response.substr(sep + 4) << "\n";
    else
        std::cout << response << "\n";
    return 0;
}
