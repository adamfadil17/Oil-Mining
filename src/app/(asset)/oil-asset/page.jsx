'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import navigation from "next/navigation";

const OilAsset = () => {
    const router = useRouter();
    const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const result = await axios('http://127.0.0.1:8000/api/users');
      const result = await axios('http://127.0.0.1:8000/api/assets/');
      setAssetData(result.data.data);
      console.log(result);
    } catch (err) {
      console.log('something wrong');
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete('http://127.0.0.1:8000/api/assets/' + id);
    const newAssetData = assetData.filter((item) => {
      return item.id !== id;
    });
    setAssetData(newAssetData);
  };

    const [loading, setLoading] = useState();
    const [assetField, setAssetField] = useState({
      Nama_Aset: '',
      Jenis_Aset: '',
      Status_Aset: '',
      Riwayat_Status: '',
    });
  
    const changeassetFieldHandler = (e) => {
      setAssetField({
        ...assetField,
        [e.target.name]: e.target.value,
      });
    };
  
    const onSubmitChange = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/assets/',
          assetField
        );
        console.log(response);
        setLoading(true);
      } catch (err) {
        console.log('something wrong');
      }
    };

    if (loading) {
        return <OilAsset/>;
      }
  
  return (
    <>
        <div className='flex flex-col border border-black p-4 rounded-xl mb-4'>
        <form>
            <div className="flex mb-3 mt-3 items-center">
              <label className=""> Nama Aset:</label>
              <input
                type="text"
                className="flex-1 w-full p-2 rounded-lg ml-4"
                id="Nama_Aset"
                placeholder="Nama Aset"
                name="Nama_Aset"
                onChange={(e) => changeassetFieldHandler(e)}
              ></input>
            </div>
            <div className="flex mb-3 mt-3 items-center">
              <label className=""> Jenis Aset:</label>
              <input
                type="text"
                className="flex-1 w-full p-2 rounded-lg ml-4"
                id="Jenis_Aset"
                placeholder="Jenis Aset"
                name="Jenis_Aset"
                onChange={(e) => changeassetFieldHandler(e)}
                required
              ></input>
            </div>
            <div className="flex mb-3 mt-3 items-center">
              <label className=""> Status Aset:</label>
              <input
                type="text"
                className="flex-1 w-full p-2 rounded-lg ml-4"
                id="Status_Aset"
                placeholder="Status Aset"
                name="Status_Aset"
                onChange={(e) => changeassetFieldHandler(e)}
                required
              ></input>
            </div>
            <div className="flex mb-3 mt-3 items-center">
              <label className=""> Riwayat Status:</label>
              <input
                type="text"
                className="flex-1 w-full p-2 rounded-lg ml-4"
                id="Riwayat_Status"
                placeholder="Riwayat Status"
                name="Riwayat_Status"
                onChange={(e) => changeassetFieldHandler(e)}
                required
              ></input>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 p-3 text-white"
              onClick={(e) => onSubmitChange(e)}
            >
              Add Asset
            </button>
          </form>
        </div>
        <div className="flex flex-col px-[40px]">
          <div className="w-full text-center table-auto border border-[#DDE1E6] rounded-lg">
            <table className="w-full">
              <thead className="bg-[#F2F4F8] h-12 border-b border-[#DDE1E6]">
                <tr>
                  <th className="rounded-tl-lg">No.</th>
                  <th>Nama Aset</th>
                  <th>Jenis Aset</th>
                  <th>Status Aset</th>
                  <th>Riwayat_Status</th>
                  <th className="rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {assetData.map((asset, i) => {
                  return (
                    <tr className="h-12 border" key={i}>
                      <td className="border">{i + 1}</td>
                      <td className='border'>{asset['Nama Aset']}</td>
                    <td className='border'>{asset['Jenis Aset']}</td>
                <td className='border'>{asset['Status Aset']}</td>
                <td className='border'>{asset['Riwayat Status']}</td>
                <td className='border'>
                    <div className='flex flex-col gap-1 p-2'>
                        <Link className='rounded-md bg-green-900 text-white' href={`/edit-oil-asset/${asset.id}`}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(asset.id)} className='rounded-md bg-red-900 text-white'>Hapus</button>
                    </div>
                </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

export default OilAsset;