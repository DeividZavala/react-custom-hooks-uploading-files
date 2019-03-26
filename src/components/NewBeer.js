import React, {useState} from 'react';
import {uploadFiles, saveBeer} from '../firebase';

function useFilePreview (){
    let [filesUrls, setFilesUrls] = useState([]);
    let [files, setFiles] = useState({});

    function onChange(e){
        const fileList = e.target.files;
        setFiles(fileList);
        let filesUrls = [];
        for (let file of fileList){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                filesUrls.push(fileReader.result);
                setFilesUrls([...filesUrls]);
            }
        }
    }

    return{
        files,
        filesUrls,
        onChange
    }

}

function NewBeer(props){

    let {filesUrls, files, onChange:handleFilesChange} = useFilePreview();
    let [beer, setBeer] = useState({name: "", price:0, description:""});

    function handleChange(e){
        let b = {...beer};
        b[e.target.name] = e.target.value;
        setBeer(b);
    }

    function handleSubmit(e){
        e.preventDefault();
        uploadFiles(files)
            .then(links => {
                beer.images = links;
                saveBeer(beer)
                    .then(()=>{
                        props.history.push("/")
                    })
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Nombre de la chela
                        <input type="text" name="name" value={beer.name} onChange={handleChange}/>
                    </label>
                </div>

                <div>
                    <label>
                        Precio de la chela:
                        <input type="number" name="price" value={beer.price} onChange={handleChange}/>
                    </label>
                </div>

                <div>
                    <label>
                        Descripción de la chela:
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
                    </label>
                </div>

                <div>
                    <label>
                        Imagenes de las chelas:
                        <input type="file" onChange={handleFilesChange} multiple/>
                    </label>
                    <div>
                        {filesUrls.map((file,key) => (
                            <img key={key}  src={file} alt="" width="100" height="100"/>
                        ))}
                    </div>
                </div>

                <button>Subir chela</button>

            </form>
        </div>
    )

}

export default NewBeer;
