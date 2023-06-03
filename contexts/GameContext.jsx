import { createContext, useContext, useRef } from "react";

const InGameContext = createContext()

export function useGameContext() {
    return useContext(InGameContext)
}

export function InGameProvider({ children }) {
    const playerPos = useRef([-4, 1.5, 5])
    const playerRot = useRef([0, 0, 0])
    const cameraPosYZ = useRef([0, 8])
    const timing = useRef(0)
    const isWinning = useRef(false)

    function movePlayerPos(position) {
        playerPos.current = position
    }

    function movePlayerRot(position) {
        playerRot.current = position
    }

    function moveCameraPosYZ(position) {
        cameraPosYZ.current = position
    }

    function won() {
        isWinning.current = true
    }

    const value = {
        playerPos,
        movePlayerPos,
        movePlayerRot,
        moveCameraPosYZ,
        playerRot,
        cameraPosYZ,
        timing,
        isWinning,
        won
    }

    return (
        <InGameContext.Provider value={value}>
            { children }
        </InGameContext.Provider>
    )
}