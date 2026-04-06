use std::io::{Read, Write};
use std::net::TcpStream;

fn main() {
    let body = r#"{"prompt":"What are the top 3 stories on Hacker News right now?"}"#;

    let request = format!(
        "POST /api/v1/run HTTP/1.1\r\n\
         Host: localhost:3000\r\n\
         Content-Type: application/json\r\n\
         Content-Length: {}\r\n\
         Connection: close\r\n\
         \r\n\
         {}",
        body.len(),
        body
    );

    let mut stream = TcpStream::connect("localhost:3000").expect("failed to connect");
    stream.write_all(request.as_bytes()).expect("failed to send request");

    let mut response = String::new();
    stream.read_to_string(&mut response).expect("failed to read response");

    // Split headers from body at the blank line
    let body_str = response
        .split("\r\n\r\n")
        .nth(1)
        .unwrap_or(&response);

    // Naive extract: find the "text" field value
    if let Some(start) = body_str.find("\"text\"") {
        let after_key = &body_str[start + 6..];
        // skip `:"` or `: "`
        if let Some(val_start) = after_key.find('"') {
            let val = &after_key[val_start + 1..];
            if let Some(val_end) = val.find('"') {
                println!("{}", &val[..val_end]);
                return;
            }
        }
    }

    // Fallback: print the raw body
    println!("{}", body_str);
}
