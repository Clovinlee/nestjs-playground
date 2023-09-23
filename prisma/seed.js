const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    let listRole = ["User", "Admin", "Superadmin"];
    console.log("Seeding Database...")
    await prisma.role.createMany({
        data: Array.from(listRole, (role, i) => ({ id: i + 1, name: role })),
    });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })