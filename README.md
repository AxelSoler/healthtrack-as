# HealthTrack

HealthTrack is a web application designed to help users monitor their health and fitness goals. It provides a user-friendly interface to track various health metrics, view historical data, and visualize progress over time.

## Features

*   **User Authentication:** Secure user sign-up and login functionality using Supabase.
*   **Dashboard:** A personalized dashboard to get a quick overview of the latest health metrics.
*   **Metric Tracking:** Add, edit, and delete health metrics such as weight, body fat, etc.
*   **Historical Data:** View a history of all recorded metrics.
*   **Data Visualization:** Interactive charts to visualize trends and progress.
*   **Goal Setting:** Set and track health and fitness goals.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Authentication & Database:** [Supabase](https://supabase.io/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Charting:** [Recharts](https://recharts.org/)
*   **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
*   **Linting:** [ESLint](https://eslint.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or later)
*   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/healthtrack-as.git
    cd healthtrack-as
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file.
    ```bash
    cp env.example .env.local
    ```
    Update `.env.local` with your Supabase project URL and anon key.
    ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

### Running the Application

1.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2.  **Run tests:**
    ```bash
    npm run test
    ```

3.  **Run linter:**
    ```bash
    npm run lint
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Project Structure

The project follows the standard Next.js `app` directory structure.

```
.
├── public/              # Static assets
├── src/
│   ├── app/             # Application routes
│   ├── components/      # Reusable React components
│   ├── contexts/        # React contexts
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions and helpers
├── .github/             # GitHub Actions workflows
├── __tests__/           # Jest/RTL tests
...
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.