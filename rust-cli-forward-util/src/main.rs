use std::env;
use std::process::Command;
use std::process::ExitStatus;

fn main() {
    let args: Vec<String> = env::args().collect();

    // if args.len() < 2 {
    //     println!("Usage: {} <arg1> [arg2] [arg3] ...", args[0]);
    //     return;
    // }
    //Writes the folder where this exe is located on in the var exe_path
    let exe_path = std::env::current_exe().unwrap();
    let jar_file: &str = "pdfbox-app-3.0.3.jar";
    
    //Combine the exe_path and jar_file in jar_full_path variable
    let jar_full_path = exe_path.parent().unwrap().join(jar_file);

    let status: ExitStatus = Command::new("java")
        .arg("-jar")
        .arg(jar_full_path)
        .args(args)
        .status()
        .expect("Failed to start java process");

    if !status.success() {
        eprintln!("Java process exited with status: {}", status);
        std::process::exit(status.code().unwrap_or(1));
    }
}