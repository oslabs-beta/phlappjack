export default function gitCommitPush() {

const userGithubRepo = "https://github.com/nonstdout/deno-deploy.git"

const cmd = Deno.run({
    cmd: ["git", "clone", userGithubRepo, `${Deno.cwd()}/tmp`],
    stdout: "piped",
    stderr: "piped",

})

const { code } = await cmd.status(); // (*1); wait here for child to finish

const rawOutput = await cmd.output();
const rawError = await cmd.stderrOutput();


if (code === 0) {
    const output = await Deno.stdout.write(rawOutput);
    console.log(`Cloned ${userGithubRepo} sucessfully into ./tmp`)
} else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
}
Deno.exit(code);
}