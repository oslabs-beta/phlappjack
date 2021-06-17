export default async function gitClone(dir, repoUrl) {

const userGithubRepo = repoUrl;
const cmd = Deno.run({
    cmd: ["git", "clone", userGithubRepo, Deno.cwd() + dir],
    stdout: "piped",
    stderr: "piped",

})

const { code } = await cmd.status(); // (*1); wait here for child to finish

const rawOutput = await cmd.output();
const rawError = await cmd.stderrOutput();


if (code === 0) {
    const output = await Deno.stdout.write(rawOutput);
    console.log(`Cloned ${userGithubRepo} sucessfully into ${Deno.cwd()}${dir}`)
} else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
}
}