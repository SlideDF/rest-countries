import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTheme } from "../../utils/selector";

const { actions, reducer } = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        toggle: (state) => {
            return state === 'light' ? 'dark' : 'light'
        },
        set: (draft, action) => {
            return action.payload
        },
        reset: () => {
            return 'light'
        }
    }
})

export const ThemeStyle = () => {
    const theme = useSelector(selectTheme)
    
    const backgroundColor = theme === 'light' ? 'var(--LightBackground)' : 'var(--DarkBackground)'
    const color = theme === 'light' ? 'var(--LightText)' : 'var(--White)'
    const backgroundColorElement = theme === 'light' ? 'var(--White)' : 'var(--DarkElements)'
    const boxShadow = theme === 'light' ? '0px 1px 6px 0px #eee' : null
    const colorElement = theme === 'light' ? 'var(--LightInput)' : 'var(--White)'
    const colorPlaceholder = theme === 'light' ? 'var(--LightInput)' : 'var(--LightBackground)'

    return { color, backgroundColor, boxShadow, backgroundColorElement, colorElement, colorPlaceholder }
}

export const { set, toggle, reset } = actions

export default reducer