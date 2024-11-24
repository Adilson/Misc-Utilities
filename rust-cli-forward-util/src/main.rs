use std::env;
use std::process::Command;
use std::process::ExitStatus;

fn main() {
    let args: Vec<String> = env::args().collect();
    let jar_args = args[1..].to_vec();
    
    let exe_path = std::env::current_exe().unwrap();
    let jar_file: &str = "pdfbox-app-3.0.3.jar";
    let jar_full_path = exe_path.parent().unwrap().join(jar_file);

    let status: ExitStatus = Command::new("java")
        .arg("-jar")
        .arg(jar_full_path)
        .args(jar_args)
        .status()
        .expect("Failed to start java process");

    if !status.success() {
        eprintln!("Java process exited with status: {}", status);
        std::process::exit(status.code().unwrap_or(1));
    }
}