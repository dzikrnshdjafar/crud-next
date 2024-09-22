"use client"
import { useState, SyntheticEvent } from "react"
import type { Kategori } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

const AddPelanggan = ({kategoris}: {kategoris: Kategori[]}) => {
    const [nama, setNama] = useState("")
    const [ukuran, setUkuran] = useState("")
    const [kategori, setKategori] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleModal = () =>(
        setIsOpen(!isOpen)
    )

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/pelanggans/',{
            nama: nama,
            ukuran: Number(ukuran),
            kategoriId: Number(kategori),
        })
        setNama("")
        setUkuran("")
        setKategori("")
        router.refresh()
        setIsOpen(false)
    }

  return (
    <div>
        <button className="btn" onClick={handleModal}>Tambah</button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
            <h3 className="font-bold text-lg">Tambah</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full">
                    <label className="label font-bolt">Nama Pelanggan</label>
                    <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="input input-bordered" placeholder="Nama Pelanggan"/>
                    </div>
                <div className="form-control w-full">
                    <label className="label font-bolt">Ukuran</label>
                    <input type="text" value={ukuran} onChange={(e) => setUkuran(e.target.value)} className="input input-bordered" placeholder="Ukuran"/>
                    </div>
                <div className="form-control w-full">
                    <label className="label font-bolt">Kategori</label>
                    <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="select select-bordered" >
                        <option value="" disabled>--PILIH--</option>
                        {kategoris.map((kategori) =>(
                        <option value={kategori.id} key={kategori.id}>
                            {kategori.nama}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Keluar</button>
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddPelanggan
