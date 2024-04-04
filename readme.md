# Mobile Queue

## Tech Stack

**Client:** React Native, Redux, expo-secure-store, expo-location, Jest, Husky

**Programming Language:** Typescript, JavaScript

## Installation

Install the dependencies using

```bash
  npx expo install
```

## Git Trivial

```Bash
    Git checkout <nama branch>: untuk berpindah ke branch lain.
```

```Bash
    Git push <nama remote> <nama branch>:untuk mengirimkan kodingan ke remote repository.
```

## Proses saat mengerjakan task

Saat mengerjakan sebuah task, pastikan untuk melakukan update terhadap branch utama (pada repo ini yaitu: `main`) dengan menjalankan perintah:

```bash
git pull origin main
```

dan membuat branch baru dari branch utama tersebut dengan menjalankan command (Note: pastikan posisi kita berada pada branch utama saat menjalankan perintah berikut):

```bash
git checkout -b <nama fitur yang ingin ditambahkan>
```

contoh:

```bash
git checkout -b add-button
```

Apabila kita sudah pernah membuat branch dan ingin melakukan update dengan kodingan pada branch utama, dapat dijalankan command berikut (Note: pastikan changes pada branch yang kita kerjakan sudah dicommit.):

```bash
git checkout main
```

```bash
git pull origin main
```

```bash
git merge <nama branch yang akan dilakukan update> main
```

## Setup Git

Pada terminal ditambahkan terlebih alamat HTTPS dari git dengan command:

```bash
  git add origin 'https://github.com/Kelompok-final-project-3/queue-mobile.git
```

### Saat Commit

```bash
git add .
```

```bash
git commit -m "<isi dengan pesan commit>
```

apabila, memungkinkan mengikuti convetional commit seperti contoh di bawah:

`feat: allow provided config object to extend other configs`

## FAQ

#### Apakah bisa menggunakan JavaScript?

Bisa, apabila memungkinkan bisa digunakan TypeScript

#### Bagaimana menggunakan emulator Android atau IOS?

Bisa merujuk pada link berikut:
https://reactnative.dev/docs/environment-setup
