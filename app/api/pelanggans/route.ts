import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pelanggan } from "@prisma/client";

const prisma = new PrismaClient()

export const POST = async (request: Request) =>{
    const body: Pelanggan = await request.json()
    const pelanggan = await prisma.pelanggan.create({
        data:{
            nama: body.nama,
            ukuran: body.ukuran,
            kategoriId: body.kategoriId,
        }
    })
    return NextResponse.json(pelanggan, {status: 201})
}
