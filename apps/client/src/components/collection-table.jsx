import { PlusCircle, Pen, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import FormModal from "./form-modal";
import CollectionForm from "./collection-form";

const CollectionTable = () => {
    const [dataTable, setDatable] = useState({ data: [], meta: {} });
    const [pagination, setPagination] = useState({ page: 1, limit: 5 });
    const [modalFeatures, setModalFeatures] = useState({ id: null, show: false, edit: false });

    useEffect(() => {
        fetchData({ path: `/collections?page=${pagination.page}&limit=${pagination.limit}` })
            .then(setDatable);
    }, [pagination]);

    return (
        <div className="p-6 bg-white dark:bg-navy-900 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Categoria de Recursos</h2>
                <FormModal 
                    isOpen={modalFeatures.show}
                    children={<CollectionForm 
                        modalFeatures={modalFeatures}
                        setModalFeatures={setModalFeatures}
                        setDataTable={setDatable}
                    />}
                />
                <button
                    onClick={() => setModalFeatures((prev) => ({ ...prev, show: true, edit: false }))}
                >
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
                                Categoría
                            </th>
                            <th
                                className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                            >
                                Estado
                            </th>
                            <th
                                className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                            >

                            </th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {dataTable.data.map((row, index) => (
                            <tr key={row.id} className="border border-transparent border-b-slate-200 dark:border-b-navy-500">
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">{row.title}</td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div>
                                        {row.available ? (
                                            <span className="text-green-500">Activo</span>
                                        ): (<span className="text-red-500">Inactivo</span>)}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                                    <div className="flex gap-2 w-full justify-end">
                                        <button className="text-[var(--purple)] size-6 border rounded-sm flex justify-center items-center"
                                            onClick={() => setModalFeatures({ id: row.id, show: true, edit: true })}
                                        >
                                            <Pen size={16} />
                                        </button>
                                        <button className="text-red-500 size-6 border rounded-sm flex justify-center items-center"
                                            onClick={async () => {
                                                const confirm = window.confirm("¿Estás seguro de eliminar esta Coleción?");
                                                if (!confirm) return;
                                                const deleted = await fetchData({ path: `/collections/soft-delete/${row.id}`, method: "DELETE" });
                                                if (deleted) {
                                                    setDatable({
                                                        ...dataTable,
                                                        /* data: dataTable.data.map((cat) => {
                                                            if(cat.id === row.id) {
                                                                return { ...cat, available: false }
                                                            } else {
                                                                return cat;
                                                            }
                                                        }) */
                                                       data: dataTable.data.filter((cat) => cat.id !== row.id)
                                                    })
                                                }
                                            }}
                                        >
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

export default CollectionTable;