import Compressor from "compressorjs";

const imageTobase64 = async(image)=>{
    return new Promise((resolve, reject)=>{
        new Compressor(image,{
            quality:0.2,
            success(compressedImage){
                const reader = new FileReader();

                reader.readAsDataURL(compressedImage);

                reader.onload = ()=>{
                    resolve(reader.result);
                };

                reader.onerror = (error) =>{
                    reject(error);
                };
            },
            error(err){
                reject(err);
            }
        });
    });
};

export default imageTobase64;