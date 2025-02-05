import { PlusCircle, Pen, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useAuth } from "../provider";
import ResourcesCrateModal from "./resources-modal"

const UserTable = () => {
    const [dataTable, setDatable] = useState({ data: [], meta: {} });
    const [pagination, setPagination] = useState({ page: 1, limit: 5 });
    const [edit, setEdit] = useState({ id: null, show: false });
    const { user } = useAuth();

    useEffect(() => {
        fetchData({ path: `/resources/by-user/${user.id}?page=${pagination.page}&limit=${pagination.limit}` })
            .then(setDatable);
    }, [pagination]);

    return (
        <div className="p-6 bg-white dark:bg-navy-900 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Mis publicaciones</h2>
                {(edit.id && edit.show) && (
                    <ResourcesCrateModal
                        isOpen={edit.show}
                        resourceId={edit.id}
                        setResources={setDatable}
                        setEdit={setEdit}
                    />
                )}
                <button>
                    <PlusCircle className="h-6 w-6 text-[var(--purple)]" />
                </button>
            </div>

            <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
                <table className="is-hoverable w-full text-left">
                    <thead>
                        <tr>
                            <th
                                className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                            >
                                Name
                            </th>
                            <th
                                className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                            >
                                Categoría
                            </th>
                            <th
                                className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                            >

                            </th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {dataTable.data.map((res) => (
                            <tr key={res.id} className="border border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">{res.title}</td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div>
                                        {res.categories.map((cat) => (
                                            <span key={cat.id} className="text-xs text-slate-400 border px-2 py-1 rounded-lg">
                                                {cat.title}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex gap-2 w-full justify-end">
                                        <button className="text-[var(--purple)] size-6 border rounded-sm flex justify-center items-center"
                                            onClick={() => setEdit({ id: res.id, show: true })}
                                        >
                                            <Pen size={16} />
                                        </button>
                                        <button className="text-red-500 size-6 border rounded-sm flex justify-center items-center">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex pt-4 [&>ol]:flex">
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm text-slate-500">
                        Página {pagination.page} de {dataTable.meta.totalPages} - ({dataTable.meta.totalRecords} registros)
                    </h3>
                    <div className="flex gap-2">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                            className="flex items-center border rounded-md px-2"
                        >
                            <ChevronLeft size={16} />
                            Anterior
                        </button>
                        <button
                            disabled={pagination.page === dataTable.meta.totalPages}
                            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                            className="flex items-center border rounded-md px-2"
                        >
                            Siguiente <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;