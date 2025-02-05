const endpoint = `https://api.cloudinary.com/v1_1/dkwvnv9ey/image/upload`;
export const defFolder = "equipo-c23-80-webapp"

export async function uploadImage(file, folder) {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "ml_default");
    form.append("folder", `${defFolder}/${folder}`);
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: form
        });

        if (!response.ok) {
            return null
        } 
        return await response.json();
    } catch (error) {
        return null;
    }
}