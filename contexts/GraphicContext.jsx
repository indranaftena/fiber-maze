import { createContext, useContext, useEffect, useState } from "react";

const GraphicContext = createContext()

export function useGraphicContext() {
    return useContext(GraphicContext)
}

export function GraphicProvider({ children }) {

    const [dpr, setDpr] = useState(() => {
        const localDpr = localStorage.getItem("DPR")
        if (localDpr == null) return 1
        return JSON.parse(localDpr)
    })
    useEffect(() => {
        localStorage.setItem("DPR", JSON.stringify(dpr))
    }, [dpr])

    const [antialias, setAntialias] = useState(() => {
        const localAnti = localStorage.getItem("ANTIALIAS")
        if (localAnti == null) return true
        return JSON.parse(localAnti)
    })
    useEffect(() => {
        localStorage.setItem("ANTIALIAS", JSON.stringify(antialias))
    }, [antialias])

    const value = {
        dpr,
        setDpr,
        antialias,
        setAntialias
    }

    return (
        <GraphicContext.Provider value={value}>
            { children }
        </GraphicContext.Provider>
    )
}