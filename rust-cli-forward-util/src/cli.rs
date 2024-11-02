use std::env;
use std::process::Command;

fn main() {
    let args: Vec<String> = env::args().collect();

    // if args.len() < 2 {
    //     println!("Usage: {} <arg1> [arg2] [arg3] ...", args[0]);
    //     return;
    // }

    let jar_file = "pdfbox-app-3.0.3.jar";
    let status = Command::new("java")
        .arg("-jar")
        .arg(jar_file)
        .args(args)
        .status()
        .expect("Failed to start java process");

    if !status.success() {
        eprintln!("Java process exited with status: {}", status);
        std::process::exit(status.code().unwrap_or(1));
    }
}