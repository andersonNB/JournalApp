//Este archivo tiene el objetivo de subir imagenes a cloudinary

export const fileUpload = async (file) => {

    if (!file) throw new Error('No tenemos ningún archivo a subir')


    //Cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-curso-fernandoh/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        console.log("resp: ", resp)
        if (!resp.ok) throw new Error('No se pudo subir la imagen')

        //Serializamos el body
        const cloudResp = await resp.json()
        console.log("CloudResp: ", cloudResp)

        return cloudResp.secure_url


    } catch (error) {
        console.log("fileUpload error: ", error)

        throw new Error(error.message)

    }
}