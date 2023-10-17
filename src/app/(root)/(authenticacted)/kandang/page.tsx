"use client"
import React, { useEffect, useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useModal } from "@/hooks/use-modal-store";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Kandang } from "@prisma/client";
import ButtonOpen from '@/components/common/buttonOpen';
import { db } from '@/lib/db'
import KandangCard from '@/components/common/card/kandang-card';
import Image from 'next/image';


// const getKandang = async () => {
//     const response = await db.kandang.findMany({
//         select: {
//             id_kandang: true,
//             nama_kandang: true,
//             gambar_kandang: true
//         }
//     })
//     return response
// }



const Kambing: FC<Kandang> = () => {
    // const kandangData = await getKandang()
    const { data: kandangData, isLoading, isError } = useQuery({
        queryKey: ['kandang'],
        queryFn: async () => {
            const { data } = await axios.get('/api/kandang');
            return data
        }
    })

    const { onOpen } = useModal();

    return (
        <div className="">
            {/* button open */}
            {/* <button className='text-white' onClick={() => onOpen("createKandang")}>Open Modal</button> */}
            <ButtonOpen />
            <div>
                <KandangCard />


                {isLoading ? (
                    <p className='text-white'>Loading...</p>
                ) : isError ? (
                    <p>Error: Failed to fetch data</p>
                ) : (
                    kandangData.map((item: Kandang) => (
                        // map data dan pindah ke page kandang/[kandangId]
                        <div key={item.id_kandang}>
                            <Link href={`/kandang/${item.id_kandang}`} className='text-white m-10'>
                                <h1>{item.id_kandang}</h1>
                                <h2>{item.nama_kandang}</h2>
                                <Image width={100} height={100} className='w-10 h-10' src={item.gambar_kandang} alt={item.nama_kandang} />
                            </Link>

                            {/* button edit */}
                            <button className='text-white bg-red-600'
                                onClick={() => onOpen("editKandang", { kandang: item })}>
                                edit kandang
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
};

export default Kambing;

// const { data: kandangData, isLoading, isError } = useQuery({
//     queryKey: ['kandang'],
//     queryFn: async () => {
//         const { data } = await axios.get('/api/kandang');
//         return data
//     }
// })

// const { onOpen } = useModal();

// {kandangData.map((kandangData) => (
//     // map data dan pindah ke page kandang/[kandangId]
//     <div key={kandangData.id_kandang} >
//         <Link href={`/kandang/${kandangData.id_kandang}`} className='text-white m-10'>
//             <h1>{kandangData.id_kandang}</h1>
//             <h2>{kandangData.nama_kandang}</h2>
//             {/* <img className='w-10 h-10' src={kandangData.gambar_kandang} alt={kandangData.nama_kandang} /> */}
//         </Link>
//     </div>
// ))
// }

{/* Display the fetched data */ }
{/* {isLoading ? (
                    <p className='text-white'>Loading...</p>
                ) : isError ? (
                    <p>Error: Failed to fetch data</p>
                ) : (
                    kandangData.map((item: KandangData) => (
                        // map data dan pindah ke page kandang/[kandangId]
                        <Link key={item.id_kandang} href={`/kandang/${item.id_kandang}`}>
                            <div className='text-white m-10'>
                                <h1>{item.id_kandang}</h1>
                                <h2>{item.nama_kandang}</h2>
                                <img className='w-10 h-10' src={item.gambar_kandang} alt={item.nama_kandang} />
                            </div>
                        </Link>
                    ))
                )} */}




// const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

//     const onSubmit: SubmitHandler<FormData> = async (data) => {
//         try {
//             schema.parse(data);

//             const formData = new FormData();
//             formData.append('nama_kandang', data.nama_kandang);
//             if (data.gambar_kandang.length > 0) {
//                 formData.append('gambar_kandang', data.gambar_kandang[0]);
//             }

//             const response = await axios.post('/api/kandang', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('Response:', response.data);
//             // Add logic or redirection to another page if needed

//         } catch (error) {
//             if (error instanceof ZodError) {
//                 console.error('Validation Error:', error.issues);
//             } else {
//                 console.error('Error:', error);
//             }
//         }
//     };

//     return (
//         <div className="text-white">
//             <h1>Form Kandang</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="nama_kandang">Nama Kandang:</label>
//                     <input
//                         type="text"
//                         id="nama_kandang"
//                         {...register('nama_kandang', { required: 'Nama Kandang harus diisi' })}
//                         className="text-black"
//                         required
//                     />
//                     {errors.nama_kandang && <p>{errors.nama_kandang.message}</p>}
//                 </div>
//                 <div>
//                     <label htmlFor="gambar_kandang">Gambar Kandang:</label>
//                     <input
//                         type="file"
//                         id="gambar_kandang"
//                         {...register('gambar_kandang', { required: 'Gambar Kandang harus diisi' })}
//                         accept="image/*"
//                         className="text-black"
//                         required
//                     />
//                     {errors.gambar_kandang && <p>{errors.gambar_kandang.message}</p>}
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };


// const [file, setFile] = useState<File | undefined>();
// const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
// const [kandangData, setKandangData] = useState<KandangData[]>([]);
// useEffect(() => {
//     // Fetch data from your API endpoint when the component mounts
//     const fetchData = async () => {
//         try {
//             const res = await fetch('/api/kandang');
//             if (res.ok) {
//                 const data = await res.json();
//                 setKandangData(data);
//             }
//         } catch (e) {
//             // Handle errors here
//             console.error(e);
//         }
//     };

//     fetchData();
// }, []);


// const onSubmit = async (data: FormData) => {
//     if (!file) return;

//     try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('nama_kandang', data.nama_kandang);

//         const res = await fetch('/api/kandang', {
//             method: 'POST',
//             body: formData,
//         });

//         // handle the error
//         if (!res.ok) throw new Error(await res.text());
//     } catch (e) {
//         // Handle errors here
//         console.error(e);
//     }
// };

// const schema = z.object({
//     nama_kandang: z.string().min(5, 'Nama Kandang is required'),
//     gambar_kandang: z.instanceof(FileList),
// });

// type FormData = {
//     nama_kandang: string;
//     gambar_kandang: FileList;
// };


{/* <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
                <div>
                    <label htmlFor='gambar_kandang'>Gambar Kandang</label>
                    <input
                        type='file'
                        id='gambar_kandang'
                        {...register('gambar_kandang', { required: 'Gambar Kandang is required' })}
                        onChange={(e) => setFile(e.target.files?.[0])}
                    />
                    {errors.gambar_kandang && <span>{errors.gambar_kandang.message}</span>}
                </div>
                <div>
                    <label htmlFor='nama_kandang'>Nama Kandang</label>
                    <input
                        type='text'
                        id='nama_kandang'
                        className='text-black'
                        {...register('nama_kandang', { required: 'Nama Kandang is required' })}
                        placeholder='Nama Kandang'
                    />
                    {errors.nama_kandang && <span>{errors.nama_kandang.message}</span>}
                </div>
                <input type='submit' className='cursor-pointer' value='Upload' />
            </form> */}