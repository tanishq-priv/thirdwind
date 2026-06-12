# ThirdWind Galaxy

**Live Demo:** [thirdwind.vercel.com](https://thirdwind.vercel.com)

ThirdWind Galaxy is a futuristic product showcase for premium electronics. It presents phones, laptops, wearables, gaming gear, cameras, and smart home products in a visual, discovery-first storefront, then sends shoppers to trusted marketplace pages such as Amazon or Flipkart for checkout.

## Features

- **Cinematic UI:** Next.js product showcase with smooth Tailwind CSS styling and Framer Motion animations
- **Category Navigation:** Browse products by category (phones, laptops, wearables, gaming, cameras, smart home)
- **Product Details:** Detailed product pages with specifications, images, and pricing
- **Product Comparison:** Compare products side-by-side to make informed decisions
- **Recently Viewed:** Track and quickly access recently viewed products
- **Marketplace Integration:** Redirect buttons to trusted marketplaces (Amazon, Flipkart) for checkout
- **Local Data Management:** Product data stored in `data/products.json`
- **Product Editor:** Standalone HTML editor at `data/product-editor.html` for easy product management

## Tech Stack

- **Next.js 14** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- Git (optional, for cloning)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd thirdwind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in your browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Linting

Run the Next.js lint check:

```bash
npm run lint
```

## Project Structure

```text
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Home page
│   ├── category/        # Category pages
│   └── product/         # Product detail pages
├── components/          # React components
│   ├── ui/              # Reusable UI components
│   └── products/        # Product-specific components
├── data/                # Data files
│   ├── products.json    # Product database
│   └── product-editor.html  # Standalone product editor
├── lib/                 # Utility functions
│   ├── products.ts      # Product data utilities
│   ├── storage.ts       # Local storage helpers
│   └── types.ts         # TypeScript type definitions
└── public/              # Static assets
```

## Managing Products

### Using the Product Editor

The project includes a standalone HTML editor for managing products:

1. Open `data/product-editor.html` in your browser
2. Add, edit, or delete products using the intuitive interface
3. Changes are automatically saved to `data/products.json`

### Manual Product Management

Products are stored in `data/products.json`. Each product should follow this structure:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "phones",
  "price": 999,
  "image": "/path/to/image.jpg",
  "description": "Product description",
  "specs": {
    "key": "value"
  },
  "marketplaceLinks": {
    "amazon": "https://amazon.com/product-link",
    "flipkart": "https://flipkart.com/product-link"
  }
}
```

## Deployment

### Vercel

The project is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings

### Other Platforms

This Next.js project can be deployed to any platform that supports Next.js, such as:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## Contributing

Contributions are welcome! If you'd like to contribute to ThirdWind Galaxy:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For questions or support, please contact the project maintainers.

---

Built with ❤️ using Next.js and Tailwind CSS
