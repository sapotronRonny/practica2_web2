import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function consultarControles() {
    try {
        const controles = await prisma.resultado.findMany({
            include: {
                paciente: true,
                tipo_de_examen: true
            }
        });

        console.log("Controles:");
        console.log(controles);
    } catch (error) {
        console.error("Error al consultar los controles:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default consultarControles;