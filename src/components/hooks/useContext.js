// CharacterContext.js
import React from "react"

export const CharacterContext = React.createContext({
  animation: 'Idle',
  previousAnimation: null,
  setAnimation: () => {},
  setPreviousAnimation: () => {},
})
