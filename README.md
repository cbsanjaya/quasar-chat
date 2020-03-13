# Mini Chat
Aplikasi Chatting Sederhana Pakai Quasar dan Firebase

## Kebutuhan Awal
- Download dan install [node js](https://nodejs.org)
- Download dan Install [yarn](https://classic.yarnpkg.com/id-ID/docs/install#windows-stable)
- Install Quasar dengan menjalakan perintah di terminal:
```bash
yarn global add @quasar/cli
```
- pastikan paket global yarn sudah ada di path os, atau bisa jalankan `export PATH="$(yarn global bin):$PATH"` di terminal.
- cek quasar yang sudah terinstall dengan menjalankan `quasar --version`, jika installasi benar maka akan muncul versi dari quasar yang sudah terinstall.

## Install dari Source code
### Download/Fork/Clone Source code
- install dependency aplikasi dengan menjalankan:
```bash
yarn
```
- copy file `firebase.conf.example.js` menjadi `firebase.conf.js`.
- sesuaikan pengaturan dengan firebase.

### Jalankan Aplikasi pada mode development (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build Aplikasi untuk Produksi
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
