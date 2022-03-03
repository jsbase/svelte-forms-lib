# svelte-forms-lib
[![Build](https://github.com/jsbase/svelte-forms-lib/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/jsbase/svelte-forms-lib/actions/workflows/nodejs.yml)
[![CodeQL](https://github.com/jsbase/svelte-forms-lib/actions/workflows/codescan-analysis.yml/badge.svg?branch=main)](https://github.com/jsbase/svelte-forms-lib/actions/workflows/codescan-analysis.yml)

Running forms with svelte and svelte-forms-lib in vite.

## Install global packages
```
npm i -g vite eslint stylelint prettier
```

## Install project
```
npm i
```

## Run dev (local)
### runs on http://localhost:3000
```
vite --host
```

## Run preview (server)
```
vite build && vite preview --host
// runs on http://localhost:4173
```

### Install caddy server (e.g. sudo pacman -Syu caddy) to run server on http://workspace/
```
sudo caddy run -config Caddyfile
```
