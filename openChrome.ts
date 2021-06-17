export default async function openChrome (osType) {

    if (osType === 'linux') {

        const cmd = Deno.run({
            cmd: ['/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'http://localhost:8000'],
            stdout: "piped",
            stderr: "piped",
        },)

        const { code } = await cmd.status()

        const rawOutput = await cmd.output();
        const rawError = await cmd.stderrOutput();
    
    
        if (code === 0) {
            const output = await Deno.stdout.write(rawOutput);
            console.log("Opening Chrome...")
        } else {
            const errorString = new TextDecoder().decode(rawError);
            console.log(errorString);
        }
        
    } else if (osType === 'windows'){

        const cmd = Deno.run({
            cmd: ['C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 'http://localhost:8000'],
            stdout: "piped",
            stderr: "piped",
        },)

        const { code } = await cmd.status()

        const rawOutput = await cmd.output();
        const rawError = await cmd.stderrOutput();
    
    
        if (code === 0) {
            const output = await Deno.stdout.write(rawOutput);
            console.log("Opening Chrome...")
        } else {
            const errorString = new TextDecoder().decode(rawError);
            console.log(errorString);
        }

    } else if (osType === 'darwin'){

        const cmd = Deno.run({
            cmd: ['/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', 'http://localhost:8000'],
            stdout: "piped",
            stderr: "piped",
        },)

        const { code } = await cmd.status()

        const rawOutput = await cmd.output();
        const rawError = await cmd.stderrOutput();
    
    
        if (code === 0) {
            const output = await Deno.stdout.write(rawOutput);
            console.log("Opening Chrome...")
        } else {
            const errorString = new TextDecoder().decode(rawError);
            console.log(errorString);
        }

    }

}
