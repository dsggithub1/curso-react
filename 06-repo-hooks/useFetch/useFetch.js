import { useEffect, useRef, useState } from "react"


export const useFetch = (url) => {

    const isMounted = useRef(true); //referencia cuando este componente esta montado

    //tendrá un efecto
    const [state, setstate] = useState({data:null, loading:true, error:null });


    useEffect(()=>{

        return ()=>{
            isMounted.current=false;
        }

    },[]); //solo se ejecutara la 1a vez

    useEffect(()=>{

        setstate({
            data:null, loading:true, error:null
        })

        fetch(url)
            .then(resp=> resp.json())
            .then(data=>{


                if(isMounted.current){
                    setstate({
                        loading:false,
                        error:null,
                        data
                    });
                }


                /* setTimeout(()=>{

                    if(isMounted.current){
                        setstate({
                            loading:false,
                            error:null,
                            data
                        });
                    }else{
                        console.log("setState no se llamo")
                    }

                },500); //se pone el timeout para simular que sse tarda más
                 */
            })
            .catch(()=>{

                console.log("en catch");
                setstate({
                    data:null,
                    loading:false,
                    error:'No se pudo cargar la info'
                })
            })

    },[url]); //se diparara solo cuando cambie el url

    return state;
}
