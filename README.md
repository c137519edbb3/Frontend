This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Setup (With Docker)

Make sure you have Docker already installed in your machine. If not, download it from [Download Docker](https://www.docker.com/products/docker-desktop/). You can verify if Docker is installed by running the following command in your terminal:

```bash
docker -v
```

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/c137519edbb3/Frontend.git
```

Navigate to the project directory:

```bash
cd Frontend
```

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
NEXT_PUBLIC_SERVER_URL_AWS=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Get these values from the project owner.

Build the Docker image:

```bash
docker compose up --build
```

Wait for the build to complete and navigate to [http://localhost](http://localhost) in your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
