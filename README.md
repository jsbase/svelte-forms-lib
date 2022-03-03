# svelte-forms-lib
[![Build](https://github.com/jsbase/svelte-forms-lib/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/jsbase/svelte-forms-lib/actions/workflows/nodejs.yml)
[![CodeQL](https://github.com/jsbase/svelte-forms-lib/actions/workflows/codescan-analysis.yml/badge.svg?branch=main)](https://github.com/jsbase/svelte-forms-lib/actions/workflows/codescan-analysis.yml)

Running forms with svelte and svelte-forms-lib in vite.

### Install vite, eslint, stylelint and prettier as global dependencies
```
npm i -g vite eslint stylelint prettier prettier-eslint prettier-eslint-cli
```

### Install project
```
npm i
```

### Start development server (http://localhost:3000/)
```
vite --host
```

### Build and start preview server (http://localhost:4173/)
```
vite build && vite preview --host
```

#### Optional: Install caddy (e.g. "sudo pacman -Syu caddy" or from the [official Homepage](https://caddyserver.com/download)) to open a reverse proxy server (http://workspace/) with  preconfigured [Caddyfile](https://raw.githubusercontent.com/jsbase/svelte-forms-lib/main/Caddyfile)
```
sudo caddy run -config Caddyfile
```
