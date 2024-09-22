import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Pelanggan } from "@prisma/client";
const prisma = new PrismaClient()

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Pelanggan = await request.json();
    const pelanggan = await prisma.pelanggan.update({
        where:{
            id: Number(params.id)
        },
        data:{
            nama: body.nama,
            ukuran: body.ukuran,
            kategoriId: body.kategoriId
        }
    });
    return NextResponse.json(pelanggan, {status: 200});
}


export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const pelanggan = await prisma.pelanggan.delete({
        where:{
            id: Number(params.id)
        }
    })
    return NextResponse.json(pelanggan, {status: 200})
}