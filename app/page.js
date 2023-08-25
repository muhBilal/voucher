'use client';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

function Page() {
    const [itemValue, setItemValue] = useState('');
    const [items, setItems] = useState([]);
    const [code, setCode] = useState('');
    const getItems = async () => {
        const response = await axios.get('http://localhost:3000/api/barcode');
        const {data} = response;
        setItems(data);
    };

    const handleOnChange = async (event) => {
        const newValue = event.target.value;
        setItemValue(newValue);

        const item = items.find(item => item.voucher === newValue && item.status === 0);
        if (item) {
            console.log('Matching item ID:', item.id);
            await axios.put('http://localhost:3000/api/barcode/' + item.id, item);
            setItemValue('');
            setCode(item.voucher);
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                showConfirmButton: false,
                timer: 1500
            })
            getItems();
        } else {
            console.log('No matching item with status 0 found.');
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        console.log(items);
    }, [itemValue]);

    return (
        <section>
            <div className="w-full max-w-lg mx-auto mt-20">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="barcode"
                        >
                            Scan BARCODE
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="barcode"
                            type="text"
                            value={itemValue}
                            onChange={handleOnChange}
                        />
                    </div>
                    {code && (
                        <h1>Kode : {code}</h1>
                    )}
                </form>


                <h1 className={`mt-20 text-2xl`}>Attendee</h1>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Kode
                        </th>

                        <th scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {items.map((item) => (
                        <tr>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <h2 className="font-medium text-gray-800 dark:text-white ">{item.voucher}</h2>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <h2 className="font-medium text-gray-800 dark:text-white ">{item.status === '1' ? 'Attende' : 'Confirm' }</h2>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Page;
