# The Story of Vito Bonanno

This website contains the memories from the diary of Vito Bonanno (1896 - 1992), my great-grandfather.

The website is built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site), a tool for building content-focused websites. The styling is done with [Tailwind CSS](https://tailwindcss.com).

## Content

The website is organized into the following sections:

- **Note biografiche**: Biographical notes about Vito Bonanno.
- **Memorie**: The memories from his diary, divided into several parts.
- **Foto**: A collection of photos from different periods of his life.
- **Considerazioni**: Some final thoughts.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building the website

To build the website for production, run the following command:

```bash
npm run build
```

This will build the application for production in the `.next` directory. The `postbuild` script also runs `pagefind` to create a search index for the website.