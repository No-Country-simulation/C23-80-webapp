import { useEffect, useState, useTransition, useCallback } from "react";
import { fetchData } from "../utils/api";
import { uploadImage } from "../utils/cloudinary_upload";
import { Trash2 } from "lucide-react";

const ResourcesCrateModal = ({ isOpen, setResources, resourceId, setEdit }) => {
    const [error, setError] = useState(null);
    const [resource, setResource] = useState(null);
    const [imageObj, setImageObj] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        startTransition(async () => {
            try {
                const respData = await fetchData({
                    path: `/resources/${resourceId}`,
                    method: "PATCH",
                    body: {
                        title: formData.get("title"),
                        description: formData.get("description"),
                        url: formData.get("url"),
                        featuredImage: imageObj
                    }
                });
                setEdit({ show: false, id: null });
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
            const folder = "resources";
            const data = await uploadImage(file, folder);
            if (data) {
                setImageObj({
                    public_id: data.public_id,
                    secure_url: data.secure_url,
                    altText: resource?.title,
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
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== value));
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
        if (isOpen) {
            fetchData({ path: `/resources/by-id/${resourceId}` }).then((data) => {
                setResource(data);
                setImageObj(data?.featuredImage);
                setSelectedItems(data.categories.map((category) => category.id))
            });
        }
    }, []);

    useEffect(() => {
        fetchData({ path: "/categorias" }).then(({ data, meta }) => {
            setCategories(data.map((category) => ({ id: category.id, title: category.title })));
        });
    }, []);

    return (
        <div className="absolute top-0 z-20 left-0 w-full h-full bg-black/50 bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-[420px] w-full">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">Editar Recurso</h3>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <div className="block">
                            <span className="text-slate-500">Categorías:</span>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 rounded border border-slate-300 mt-1.5 p-2 select-none">
                                {categories.map((category) => {
                                    return (
                                        <label key={category.id} htmlFor={category.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={category.id}
                                                name="categories"
                                                value={category.id}
                                                checked={selectedItems.includes(category.id)}
                                                onChange={handleCheckboxChange}
                                                disabled={isPending}
                                            />
                                            <span className="font-semibold text-slate-500">{category.title}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                        <label className="block">
                            <span className="text-slate-500">Titulo:</span>
                            <input
                                name="title"
                                defaultValue={resource?.title}
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
                                value={resource?.description}
                                className="form-textarea w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                                disabled={isPending}
                            />
                        </label>
                        <label className="block">
                            <span className="text-slate-500">Url del recurso:</span>
                            <input
                                name="url"
                                defaultValue={resource?.url}
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                                placeholder="https://recurso.com"
                                type="text"
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
                                onClick={() => setEdit({ show: false, id: null })}
                                className="destructive rounded-full cursor-pointer"
                                disabled={isPending}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn rounded-full btn:hover cursor-pointer" disabled={isPending}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResourcesCrateModal;