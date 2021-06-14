import { Leaf } from "./deps.ts";

Leaf.compile({
  modulePath: "./mod.ts",
  contentFolders: ["./build"],
  flags: ["--allow-all", "--unstable"]
})