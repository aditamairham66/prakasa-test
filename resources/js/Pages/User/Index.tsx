import React, { useEffect, useState } from 'react';
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';
import { User as UserProps } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import Thead from '@/Components/Table/Thead';
import Row from '@/Components/Table/Row';
import Th from '@/Components/Table/Th';
import Tbody from '@/Components/Table/Tbody';
import Td from '@/Components/Table/Td';
import Table from '@/Components/Table/Index';
import Pagination from '@/Components/Pagination';

interface PageProps {
    title: string;
    table: {
        data: UserProps[];
        from: string;
    };
}

const User: React.FC = () => {
    // @ts-ignore
    const { props, url } = usePage<PageProps>();
    const { title, table }: PageProps = props;

    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        // Get the value of the 'q' query parameter from the URL string
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const searchQuery = urlParams.get('q') || '';
        // Set the searchValue state if 'q' query parameter exists
        if (searchQuery) {
            setSearchValue(searchQuery);
        }
    }, [url]);

    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    useEffect(() => {
        // Clear the timeout when component unmounts
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        // Clear any previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        // Set a new timeout for 500 milliseconds
        searchTimeout = setTimeout(() => {
            handleSearchSubmit(value);
        }, 3000); // 3 seconds
    };

    const handleSearchSubmit = (value: string) => {
        Inertia.visit('/post', {
            data: {
                q: value
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`${title}`}/>

            <div className="card">
                <div className="flex flex-wrap justify-between items-center gap-2 p-6">
                    <div>
                        Header
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link href="/user/create" className="btn btn-sm bg-danger/20 text-sm font-medium text-danger hover:text-white hover:bg-danger">
                            <i className="mgc_add_circle_line me-3"></i> Add User
                        </Link>

                        <div>
                            <input
                                type="text"
                                name="q"
                                placeholder="Search"
                                className="form-input rounded-l-none"
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                {/* @ts-ignore */}
                <Table id="tableResult">
                    <Thead>
                        <Row>
                            {/* @ts-ignore */}
                            <Th className='ps-4 pe-3' width="50px">No</Th>
                            {/* @ts-ignore */}
                            <Th width="200px">Name</Th>
                            <Th>Email</Th>
                            <Th>Action</Th>
                        </Row>
                    </Thead>
                    <Tbody>
                        {table.data.length > 0 ? (
                            table.data.map(({ id, name, email }, index) => (
                                <Row key={id}>
                                    <Td className='ps-4 pe-3'>
                                        <b>{table?.from + index}</b>
                                    </Td>
                                    <Td>{name}</Td>
                                    <Td>{email}</Td>
                                    <Td>
                                        <a href={`/user/${id}`} className="me-0.5">
                                            <i className="mgc_eye_2_fill text-lg"></i>
                                        </a>
                                        <a href={`/user/${id}/edit`} className="me-0.5">
                                            <i className="mgc_edit_line text-lg"></i>
                                        </a>
                                        <a href="#" data-url={`/user/${id}`} className="ms-0.5 btn-delete-table">
                                            <i className="mgc_delete_line text-xl"></i>
                                        </a>
                                    </Td>
                                </Row>
                            ))
                        ) : (
                                <Row>
                                    {/* @ts-ignore */}
                                    <Td colSpan={4} className="text-center">Data not found</Td>
                                </Row>
                            )}
                    </Tbody>
                </Table>
            </div>

            {/* @ts-ignore */}
            <Pagination data={table} />
        </AdminLayout>
    );
};

export default User;
