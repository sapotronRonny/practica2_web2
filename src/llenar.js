"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
function generarNumeroAleatorio(min, max) {
    // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
    const numeroAleatorio = Math.random();
    // Escala el número aleatorio al rango deseado y lo redondea al entero más cercano
    const numeroEnRango = Math.floor(numeroAleatorio * (max - min + 1)) + min;
    return numeroEnRango;
}
const numeroAleatorio = generarNumeroAleatorio(1, 100);
const prisma = new client_1.PrismaClient();
function llenar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pacientes = [];
            for (let i = 0; i < 10; i++) {
                const paciente = yield prisma.paciente.create({
                    data: {
                        nombre: `Nombre del Paciente ${i + 1}`,
                        CI_paciente: numeroAleatorio
                    }
                });
                pacientes.push(paciente);
            }
            const signosVitales = [];
            for (let i = 0; i < 5; i++) {
                const signoVital = yield prisma.tipo_de_examen.create({
                    data: {
                        Descripcion: `Descripción del Signo Vital ${i + 1}`,
                        Indicaciones: `${i + 1}`
                    }
                });
                signosVitales.push(signoVital);
            }
            for (const paciente of pacientes) {
                for (const signoVital of signosVitales) {
                    yield prisma.resultado.create({
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
        }
        catch (error) {
            console.error("Error al llenar la base de datos:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = llenar;
