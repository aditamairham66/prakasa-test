import React from 'react';
import {Head, usePage} from "@inertiajs/inertia-react";
import AdminLayout from '@/Layouts/AdminLayout';
import Table from '@/Components/Table/Index';
import Thead from '@/Components/Table/Thead';
import Tbody from '@/Components/Table/Tbody';
import Row from '@/Components/Table/Row';
import Th from '@/Components/Table/Th';
import Td from '@/Components/Table/Td';
import { Post as PostProps } from '@/types';
import Pagination from '@/Components/Pagination';

interface PageProps {
    title: string; 
    table: { 
        data: PostProps[];
        from: string;
    };
}

const Post: React.FC = () => {
    // @ts-ignore
    const { props } = usePage<PageProps>();
    const { title, table }: PageProps= props;

    return (
        <AdminLayout>
            <Head title={`${title}`}/>

            <div className="card">
                <div className="flex flex-wrap justify-between items-center gap-2 p-6">
                    Header
                    
                    <div className="flex flex-wrap gap-2"></div>
                </div>

                {/* @ts-ignore */}
                <Table id="tableResult">
                    <Thead>
                        <Row>
                            {/* @ts-ignore */}
                            <Th className='ps-4 pe-3' width="50px">No</Th>
                            {/* @ts-ignore */}
                            <Th width="200px">Users</Th>
                            <Th>Name</Th>
                            {/* @ts-ignore */}
                            <Th width="100px">Image</Th>
                            <Th>Action</Th>
                        </Row>
                    </Thead>
                    <Tbody>
                        {table.data.length > 0 ? (
                            table.data.map(({ id, user, title, image }, index) => (
                                <Row key={id}>
                                    <Td className='ps-4 pe-3'>
                                        <b>{table?.from + index}</b>
                                    </Td>
                                    <Td>{user?.name}</Td>
                                    <Td>{title}</Td>
                                    <Td>
                                        <a href={image} className="image-popup">
                                            <img className="h-10 w-10 rounded" src={image} alt=""/>
                                        </a>
                                    </Td>
                                    <Td></Td>
                                </Row>
                            ))
                        ) : (
                            <Row>
                                {/* @ts-ignore */}
                                <Td colSpan={5} className="text-center">Data not found</Td>
                            </Row>
                        )}
                    </Tbody>
                </Table>
            </div>

            {/* @ts-ignore */}
            <Pagination data={table}/>
        </AdminLayout>
    );
};

export default Post;
