"use client";
import { useState, SyntheticEvent } from "react";
import type { Kategori } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Pelanggan = {
  id: number;
  nama: string;
  ukuran: number;
  kategoriId: number;
};

const UpdatePelanggan = ({
  kategoris,
  pelanggan,
}: {
  kategoris: Kategori[];
  pelanggan: Pelanggan;
}) => {
  const [nama, setNama] = useState(pelanggan.nama);
  const [ukuran, setUkuran] = useState(pelanggan.ukuran);
  const [kategori, setKategori] = useState(pelanggan.kategoriId);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/pelanggans/${pelanggan.id}`, {
      nama: nama,
      ukuran: Number(ukuran),
      kategoriId: Number(kategori),
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {pelanggan.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">pelanggan Name</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="pelanggan Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">ukuran</label>
              <input
                type="text"
                value={ukuran}
                onChange={(e) => setUkuran(Number(e.target.value))}
                className="input input-bordered"
                placeholder="ukuran"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">kategori</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(Number(e.target.value))}
                className="select select-bordered"
              >
                {kategoris.map((kategori) => (
                  <option value={kategori.id} key={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePelanggan;
