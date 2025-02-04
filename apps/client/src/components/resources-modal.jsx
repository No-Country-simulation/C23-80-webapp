import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const ResourcesCrateModal = ({ isOpen, setResources, resourceId, setEdit }) => {
    const [resource, setResource] = useState(null);
    const [publicId, setPublicId] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    const uwConfig = {
        cloudName: "juniorlandia",
        uploadPreset: "resources",
        cropping: true
    }

    useEffect(() => {
        if (isOpen) {
            fetchData({ path: `/resources/${resourceId}` }).then(setResource);
        }
    }, []);
    
    return (
        <div className="absolute top-0 z-20 left-0 w-full h-full bg-black/50 bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-[420px] w-full">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">Editar Recurso</h3>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <label className="block">
                            <span className="text-slate-500">Titulo:</span>
                            <input
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                                placeholder="Titulo"
                                type="text"
                            />
                        </label>
                        <label class="block">
                            <textarea
                                rows="3"
                                placeholder="Descripción"
                                className="form-textarea w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                            ></textarea>
                        </label>
                        <label className="block">
                            <span className="text-slate-500">Url del recurso:</span>
                            <input
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-[var(--purple)]"
                                placeholder="https://recurso.com"
                                type="text"
                            />
                        </label>
                        <div className="flex gap-2 justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => setEdit({ show: false, id: null })}
                                className="destructive rounded-full cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn rounded-full btn:hover cursor-pointer">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResourcesCrateModal;