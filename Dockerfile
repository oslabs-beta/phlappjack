FROM hayd/alpine-deno:1.10.2

# The port that your application listens to.
EXPOSE 3000

WORKDIR /phlappjack

# Prefer not to run as root.
# USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY . .
RUN deno cache --unstable deps.ts
RUN deno cache  ./client/deps.ts
# RUN deno bundle ./client/index.tsx ./build/bundle.js


# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache mod.ts

CMD ["deno", "run", "-A", "--unstable", "mod.ts"]
