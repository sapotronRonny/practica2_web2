import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function buscarControlPorId(id: number) {
    try {
        const control = await prisma.resultado.findUnique({
            where: { id },
            include: {
                paciente: true,
                tipo_de_examen: true
            }
        });

        if (control) {
            console.log("Control encontrado:");
            console.log(control);
        } else {
            console.log("No se encontró ningún control con el ID proporcionado.");
        }
    } catch (error) {
        console.error("Error al buscar el control:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default buscarControlPorId;