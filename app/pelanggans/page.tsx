import { PrismaClient } from "@prisma/client"
import AddPelanggan from "./addPelanggan"
import DeletePelanggan from "./deletePelanggan"
import UpdatePelanggan from "./updatePelanggan"
const prisma = new PrismaClient()

const getPelanggans = async () => {
    const res = await prisma.pelanggan.findMany({
        select:{
            id: true,
            nama: true,
            ukuran: true,
            kategoriId: true,
            kategori: true
        }
    })
    return res
}

const getKategoris = async () =>{
    const res = await prisma.kategori.findMany()
    return res
}

const Pelanggan = async () => {
    const [pelanggans, kategoris] = await Promise.all([getPelanggans(), getKategoris()])

  return (
    <div>
        <div className="mb-2">
            <AddPelanggan kategoris={kategoris}/>
        </div>
      <table className="table w-full">
        <thead>
            <tr>
                <th>#</th>
                <th>Nama Pelanggan</th>
                <th>Ukuran</th>
                <th>Kategori</th>
                <th className="text-center">Aksi</th>
            </tr>
        </thead>
        <tbody>
            {pelanggans.map((pelanggan, index) => (
            <tr key={pelanggan.id}>
                <td>{index + 1}</td>
                <td>{pelanggan.nama}</td>
                <td>{pelanggan.ukuran}</td>
                <td>{pelanggan.kategori.nama}</td>
                <td className="flex justify-center space-x-1">
                <UpdatePelanggan kategoris={kategoris} pelanggan={pelanggan} />
                <DeletePelanggan pelanggan={pelanggan} />
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pelanggan
