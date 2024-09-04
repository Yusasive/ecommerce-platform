This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
1. Clone the repository [git clone https://github.com/Yusasive/ecommerce-platform.git](https://github.com/Yusasive/ecommerce-platform).
2. Navigate to the code base: `cd ecommerce-platform`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
# E-commerce Platform

## Overview
A simple e-commerce platform built using Next.js, TypeScript, and Tailwind CSS.


## Features
- Product listing with category and price filtering
- Add, edit, and delete products
- Dynamic SEO optimization
- Responsive design

## Design Decisions
- Used local storage for simplicity and faster development.
- Tailwind CSS was chosen for its utility-first approach and responsive design capabilities.

## SEO Handling
- Dynamically generated meta tags for product pages.
- Implemented a sitemap and robots.txt for better search engine indexing.

## Performance Optimization
- Utilized Next.js image optimization features.
- Efficient data fetching using `getStaticProps` and `getServerSideProps`.
