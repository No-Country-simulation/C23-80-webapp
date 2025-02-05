import { useAuth } from "../provider";

const resentResources = [
    {
        id: 1, title: "JavaScript", category: "Programming", author: "John Doe", date: "2021-10-01"
    },
    {
        id: 2, title: "Python", category: "Programming", author: "Jane Doe", date: "2021-10-02"
    },
    {
        id: 3, title: "React", category: "Programming", author: "John Doe", date: "2021-10-03"
    },
    {
        id: 4, title: "Node.js", category: "Programming", author: "Jane Doe", date: "2021-10-04"
    },
    {
        id: 5, title: "Express", category: "Programming", author: "John Doe", date: "2021-10-05"
    },
]

const UserIndex = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-8">
                <div className="flex flex-col gap-4 rounded-md border border-slate-300 min-h-[200px] p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-[var(--purple)] text-lg">Usuarios</h3>
                        <a href={`/auth/${user.id}/users`} className="text-[var(--blue)]">Ver...</a>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <span className="text-4xl font-bold text-slate-400">5</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-md border border-slate-300 min-h-[200px] p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-[var(--purple)] text-lg">Categorias</h3>
                        <a href={`/auth/${user.id}/categories`} className="text-[var(--blue)]">Ver...</a>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <span className="text-4xl font-bold text-slate-400">10</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-md border border-slate-300 min-h-[200px] p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-[var(--purple)] text-lg">Recursos</h3>
                        <a href={`/auth/${user.id}/resources`} className="text-[var(--blue)]">Ver...</a>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <span className="text-4xl font-bold text-slate-400">20</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-md border border-slate-300 min-h-[200px] p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-[var(--purple)] text-lg">Colecciones</h3>
                        <a href={`/auth/${user.id}/collections`} className="text-[var(--blue)]">Ver...</a>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <span className="text-4xl font-bold text-slate-400">12</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-slate-500">Recursos Recientes</h2>
                <div className="flex border border-slate-300 rounded-md shadow-md min-h-[200px] max-h-[350px]">
                    {resentResources.length > 0 ? (
                        <div className="flex flex-col gap-4 w-full overflow-y-auto">
                            {resentResources.map((resource) => (
                                <div key={resource.id} className="flex px-4 py-3 border-b border-slate-300">
                                    <div className="grid grid-cols-4 w-full gap-4">
                                        <h3 className="font-semibold text-lg text-slate-500">{resource.title}</h3>
                                        <span className="text-sm text-slate-400">{resource.category}</span>
                                        <span className="text-sm text-slate-400">Por: {resource.author}</span>
                                        <span className="text-sm text-slate-400">Fecha: {resource.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center p-4">
                            <span className="text-slate-300">
                                Aun no se han agregado recursos recientes
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserIndex;