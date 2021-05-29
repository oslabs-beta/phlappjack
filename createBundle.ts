const createBundle = async () => {
  const { files, diagnostics } = await Deno.emit("./client/index.tsx", {
    bundle: "module",
  });

  await Deno.writeTextFile("./build/bundle.js", files["deno:///bundle.js"]);
};

export { createBundle };
