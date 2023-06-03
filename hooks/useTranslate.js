import { useState, useCallback, useEffect } from "react";

// const SPEED = 1

export function useTranslate() {
    const [move, setMove] = useState({
        onward: false,
        back: false,
        left: false,
        right: false
    })

    const handleKeyDown = useCallback((e) => {
        if (e.code === 'KeyW') {
            setMove((prev) => {
                return ({
                    ...prev,
                    onward: true
                })
            })
        }
        if (e.code === 'KeyS') {
            setMove((prev) => {
                return ({
                    ...prev,
                    back: true
                })
            })
        }
        if (e.code === 'KeyA') {
            setMove((prev) => {
                return ({
                    ...prev,
                    left: true
                })
            })
        }
        if (e.code === 'KeyD') {
            setMove((prev) => {
                return ({
                    ...prev,
                    right: true
                })
            })
        }
    }, [])

    const handleKeyUp = useCallback((e) => {
        if (e.code === 'KeyW') {
            setMove((prev) => {
                return ({
                    ...prev,
                    onward: false
                })
            })
        }
        if (e.code === 'KeyS') {
            setMove((prev) => {
                return ({
                    ...prev,
                    back: false
                })
            })
        }
        if (e.code === 'KeyA') {
            setMove((prev) => {
                return ({
                    ...prev,
                    left: false
                })
            })
        }
        if (e.code === 'KeyD') {
            setMove((prev) => {
                return ({
                    ...prev,
                    right: false
                })
            })
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    // console.log(document.getElementById('starter'))

    return [move, setMove]

}