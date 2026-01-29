# KalcerRunner

A Next.js web application for the KalcerRunner project.

## Project Structure

- `web/` - Next.js application

## Development

### Branching Strategy

This project uses a branching strategy to manage development:

- **master** - Production branch
- **development** - Main development branch for integrating features

For detailed information about the branching strategy, see [BRANCHING.md](./BRANCHING.md).

### Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Creating Feature Branches

```bash
git checkout development
git pull origin development
git checkout -b feature/your-feature-name
# Make your changes
git push -u origin feature/your-feature-name
```

## Contributing

Please refer to [BRANCHING.md](./BRANCHING.md) for information on our branching strategy and workflow.
