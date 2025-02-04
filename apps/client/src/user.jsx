import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./provider";
import { fetchData } from "./utils/api";


const User = () => {
    const [userData, setUserData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if(user) {
            fetchData({
                path: `/users/${user.email}`,
            }).then(setUserData);
        }
    },[]);
    
    return user ? (
        <div className="size-full">
            <div className="relative w-full h-40 bg-[#ededed]">
                <div className="container mx-auto px-8">
                    <div className="absolute z-10 bottom-0 text-white flex max-sm:flex-col items-center gap-4">
                        <div className="avatar size-24">
                            <img
                                className="rounded-full"
                                src={user.avatar.secure_url??"/avatar.png"}
                                alt="avatar"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name} {userData?.lastName} <strong className="text-xs capitalize">({user.role.toLowerCase()})</strong></h1>
                            <p className="text-sm">{user.email}</p>
                            <div className="flex gap-2 mt-2">
                            {userData?.profile?.professions.map((prof) => (
                                <span key={prof} className="text-xs text-slate-400 border px-2 py-1 rounded-lg">{prof}</span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute h-[90%] bottom-0 w-full"
                    style={{
                        background: `linear-gradient(180deg, #ededed, transparent 50%),
                 linear-gradient(90deg, #17d1c6, #336aea 19.84%, #8d639e 39.68%, #eb644c 59.52%, #ea7e11 79.36%, #44b678 99.2%),
                 linear-gradient(0deg, transparent, #ededed 40%)`,
                    }}
                />
            </div>
            <div className="container mx-auto">
                <Outlet />
            </div>
        </div>
    ) : <Navigate to='/login' />
}

export default User;