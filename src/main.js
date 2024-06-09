import { app, prisma } from "./app.js"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
})

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit();
})