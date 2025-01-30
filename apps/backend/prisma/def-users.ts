export const users: User[] = [
    {
        email: "joel.dome17@gmail.com",
        name: "Joel",
        lastName: "Dominguez",
        password: "12345678",
        role: "ADMIN",
        permissions: [
            "READ",
            "CREATE",
            "UPDATE",
            "DELETE"
        ]
    },
    {
        email: "nattech202@gmail.com",
        name: "Natalia",
        lastName: "Rubiano",
        password: "12345678",
        role: "ADMIN",
        permissions: [
            "READ",
            "CREATE",
            "UPDATE",
            "DELETE"
        ]
    },
    {
        email: "enokyws@gmail.com",
        name: "Enoc",
        lastName: "Lima",
        password: "12345678",
        role: "ADMIN",
        permissions: [
            "READ",
            "CREATE",
            "UPDATE",
            "DELETE"
        ]
    }
]

interface User {
    email: string;
    name: string;
    lastName: string;
    password: string;
    role: string;
    permissions: string[];
}