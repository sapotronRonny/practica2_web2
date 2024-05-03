import { PrismaClient } from "@prisma/client";

function generarNumeroAleatorio(min: number, max: number): number {
    // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
    const numeroAleatorio = Math.random();

    // Escala el número aleatorio al rango deseado y lo redondea al entero más cercano
    const numeroEnRango = Math.floor(numeroAleatorio * (max - min + 1)) + min;

    return numeroEnRango;
}

const numeroAleatorio = generarNumeroAleatorio(1, 100);

const prisma = new PrismaClient();

async function llenar() {
    try {

        const pacientes = [];
        for (let i = 0; i < 10; i++) {
            const paciente = await prisma.paciente.create({
                data: {
                    nombre: `Nombre del Paciente ${i + 1}`,
                    CI_paciente: numeroAleatorio
                }
            });
            pacientes.push(paciente);
        }

        const signosVitales = [];
        for (let i = 0; i < 5; i++) {
            const signoVital = await prisma.tipo_de_examen.create({
                data: {
                    Descripcion: `Descripción del Signo Vital ${i + 1}`,
                    Indicaciones: `${i + 1}`
                }
            });
            signosVitales.push(signoVital);
        }

        for (const paciente of pacientes) {
            for (const signoVital of signosVitales) {
                await prisma.resultado.create({
                    data: {
                        paciente: { connect: { id_paciente: paciente.id_paciente } },
                        tipo_de_examen: { connect: { id_examen: signoVital.id_examen } },
                        Resultado_test: `Resultado numero`,
                        valor_paga: 12345,
                        observaciones: 'Observacion'
                    }
                });
            }
        }

        console.log("Se han insertado los datos correctamente.");
    } catch (error) {
        console.error("Error al llenar la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default llenar;