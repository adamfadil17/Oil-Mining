'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function EditOilAsset({params}){
  const { id } = useParams();
  const router = useRouter();

  const [assetField, setAssetField] = useState({
    Nama_Aset: '',
    Jenis_Aset: '',
    Status_Aset: '',
    Riwayat_Status: '',
  });

  useEffect(() => {
    fetchAsset();
  }, [params.assetId]);

  const fetchAsset = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/assets/' + [params.assetId]);
      setAssetField(result.data.assets);
    } catch (err) {
      console.log('something wrong');
    }
  };

  const clickToBackHandler = () => {
    // navigate('/');
  };

  const changeAssetFieldHandler = (e) => {
    setAssetField({
      ...assetField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:8000/api/assets/' + [params.assetId], assetField);
      // navigate('/');
      router.push('/oil-asset')
    } catch (err) {
      console.log('something wrong');
    }
  };

  return (
    <div className="container">
      <h3>Edit Form</h3>
      <div className='flex flex-col border border-black p-4 rounded-xl mb-4'>
        <form>
        <div className="flex mb-3 mt-3 items-center">
          <label className="form-label"> Id:</label>
          <input
            type="text"
            className="flex-1 w-full p-2 rounded-lg ml-4"
            id="id"
            placeholder="Enter Your Full Name"
            name="id"
            value={[params.assetId]}
            disabled
          ></input>
        </div>
            <div className="flex mb-3 mt-3 items-center">
              <label className=""> Nama Aset:</label>
              <input
                type="text"
                className="flex-1 w-full p-2 rounded-lg ml-4"
                id="Nama_Aset"
                placeholder="Nama Aset"
                name="Nama_Aset"
                value={assetField.Nama_Aset}
                onChange={(e) => changeAssetFieldHandler(e)}
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
                value={assetField.Jenis_Aset}
                onChange={(e) => changeAssetFieldHandler(e)}
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
                value={assetField.Status_Aset}
                onChange={(e) => changeAssetFieldHandler(e)}
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
                value={assetField.Riwayat_Status}
                onChange={(e) => changeAssetFieldHandler(e)}
                required
              ></input>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 p-3 text-white"
              onClick={(e) => onSubmitChange(e)}
            >
              Update Asset
            </button>
          </form>
        </div>
    </div>
  );
};

