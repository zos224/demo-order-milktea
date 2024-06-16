"use client"
import { createContext, useEffect, useState } from "react";

export const CardContext = createContext({
    card: [],
    updateCard: () => {},
    infoUser: [],
    updateInfoUser: () => {}
})

export const CardProvider = ({children}) => {
    const [card, setCard] = useState([])
    const [infoUser, setInfoUser] = useState([])
    const updateCard = (newCard) => {
        setCard(newCard)
        localStorage.setItem("cardMilktea", JSON.stringify(newCard))
    }

    const updateInfoUser = (newInfoUser) => {
        setInfoUser(newInfoUser)
        localStorage.setItem("infoMilktea", JSON.stringify(newInfoUser))
    }

    useEffect(() => {
        if (localStorage.getItem("cardMilktea")) {
            setCard(JSON.parse(localStorage.getItem("cardMilktea")))
        }
        if (localStorage.getItem("infoMilktea")) {
            setInfoUser(JSON.parse(localStorage.getItem("infoMilktea")))
        }
    }, [])

    return (
        <CardContext.Provider value={{card, updateCard, infoUser, updateInfoUser}}>
            {children}
        </CardContext.Provider>
    )
}