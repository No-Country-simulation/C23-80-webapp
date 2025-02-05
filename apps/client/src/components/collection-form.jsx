import { useEffect, useState, useTransition, useCallback } from "react";
import { fetchData } from "../utils/api";
import { uploadImage } from "../utils/cloudinary_upload";
import { Trash2 } from "lucide-react";

const CollectionForm = ({ setDataTable, modalFeatures, setModalFeatures }) => {
    const [error, setError] = useState(null);
    const [collection, setCollection] = useState(null);
    const [imageObj, setImageObj] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [dragging, setDragging] = useState(false);
    const [resources, setResources] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const { id, edit } = modalFeatures;

    const onSubmit = (e) => {
        e.preventDefault();
        if(selectedIds.length === 0) {
            setError("Selecciona al menos un recurso");
            return;
        }
        const formData = new FormData(e.target);
        startTransition(async () => {
            try {
                const respData = await fetchData({
                    ...(id && edit ? {
                        path: `/collections/${id}`,
                        method: "PATCH",
                    } : {
                        path: "/collections",
                        method: "POST",
                    }),
                    body: {
                        title: formData.get("title"),
                        description: formData.get("description"),
                        featuredImage: imageObj,
                        skills: selectedIds
                    }
                });

                setDataTable((prev) => {
                    if (prev?.data && respData) {
                        const data = [...prev.data];
                        const index = data.findIndex((res) => res.id === id);
                        if (index === -1) {
                            data.unshift(respData);
                        } else {
                            data[index] = respData;
                        };

                        return { ...prev, data };
                    } else {
                        return prev;
                    }
                })
                setModalFeatures(prev => ({ ...prev, show: false, id: null, edit: false }));
            } catch (error) {
                console.error(error);
                setError("Error al guardar los cambios");
            }
        })
    }

    const uploadHandler = async (file) => {
        if (!file.type.startsWith("image/")) {
            setError("Por favor selecciona una imagen");
        } else {
            const folder = "collections";
            const data = await uploadImage(file, folder);
            if (data) {
                setImageObj({
                    public_id: data.public_id,
                    secure_url: data.secure_url,
                    altText: collection?.title,
                    width: data.width,
                    height: data.height
                });
            } else {
                setError("Error al subir la imagen");
            }
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        startTransition(() => {
            uploadHandler(file);
        })
    }

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedIds(Array.from(new Set([...selectedIds, value])));
        } else {
            setSelectedIds(Array.from(new Set([...selectedIds.filter((item) => item !== value)])));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        startTransition(() => {
            uploadHandler(file);
        })
    };

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }, [])

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);

    useEffect(() => {
        if (id && edit) {
            fetchData({ path: `/collections/by-id/${id}` }).then((data) => {
                setCollection(data);
                setImageObj(data?.featuredImage);
                setSelectedIds(data.skills.map((skill) => skill.id));
            });
        }
    }, []);

    useEffect(() => {
        fetchData({ path: "/resources/basic" }).then(setResources);
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">
                {edit ? "Editar colección" : "Nueva colección"}
            </h3>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="block">
                    <span className="text-slate-500">Recursos:</span>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 rounded border border-slate-300 max-h-24 overflow-y-auto mt-1.5 p-2 select-none">
                        {resources.map((res) => {
                            return (
                                <label key={res.id} htmlFor={res.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={res.id}
                                        name="categories"
                                        required={selectedIds?.length === 0}
                                        value={res.id}
                                        checked={selectedIds.includes(res.id)}
                                        onChange={handleCheckboxChange}
                                        disabled={isPending}
                                    />
                                    <span className="font-semibold text-slate-500">{res.title}</span>
                                </label>
                            )
                        })}
                    </div>
                </div>
                <label className="block">
                    <span className="text-slate-500">Titulo:</span>
                    <input
                        name="title"
                        defaultValue={collection?.title}
                        className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                        placeholder="Titulo"
                        type="text"
                        disabled={isPending}
                    />
                </label>
                <label className="block">
                    <textarea
                        name="description"
                        rows="3"
                        placeholder="Descripción"
                        defaultValue={collection?.description}
                        className="form-textarea w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                        disabled={isPending}
                    />
                </label>
                <label className="block w-full relative" htmlFor="res-image">
                    <div
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        className={`flex items-center justify-between h-24 border-2 border-dashed rounded-lg p-4 ${dragging ? "border-[var(--purple)]" : "border-slate-300"}`}>
                        <div className="flex flex-col flex-1">
                            <span className="absolute top-0 left-0 py-2 px-3 text-xs text-slate-500">Imagen del recurso</span>
                            {imageObj ? (
                                <div className="relative h-20 aspect-auto ml-auto ring-2 ring-slate-300 ring-ring-offset-2 rounded-lg w-auto"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                >
                                    <img src={imageObj?.secure_url ?? "/no-image-available.png"} alt="Resource image" className="w-auto h-full object-cover rounded-lg" />
                                    <button type="button" className="absolute top-1 right-1 p-1 aspect-square text-[var(--negative)] bg-white rounded-sm border border-slate-300"
                                        onClick={() => setImageObj(null)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 text-center mt-4 line-clamp-2">
                                    Arrastra una imagen o haz click para seleccionar
                                </p>
                            )}
                        </div>
                    </div>
                    {error && <p className="text-xs text-negative mt-1">{error}</p>}
                    <input
                        type="file"
                        id="res-image"
                        accept="image/*"
                        onChange={onFileChange}
                        className="sr-only"
                    />
                </label>
                <div className="flex gap-2 justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => setModalFeatures(prev => ({ ...prev, show: false, id: null, edit: false }))}
                        className="destructive rounded-full cursor-pointer"
                        disabled={isPending}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="btn rounded-full btn:hover cursor-pointer" disabled={isPending}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default CollectionForm;