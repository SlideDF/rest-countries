import { createSlice } from "@reduxjs/toolkit"
import { selectInfo } from "../../utils/selector"

const initialState = {
    borders: [],
    languages: null,
    nativeName: null,
    currencie: null,
    countrie: null,
    error: null,
    status: 'void',
}

const { actions, reducer } = createSlice({
    name: 'info',
    initialState,
    reducers: {
        fetching: {
            reducer: (draft, action) => {
                if(draft.status === 'void') {
                    draft.status = 'pending'
                    return
                }
                if(draft.status === 'rejected') {
                    draft.status = 'pending'
                    return
                }
                if(draft.status === 'resolved') {
                    draft.status = 'updating'
                    return
                }
                return
            }
        },
        resolved: {
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating') {
                    if(action.payload.data.name.nativeName) {
                        draft.nativeName = Object.values(action.payload.data.name.nativeName).slice(-1)[0].common
                    }

                    if(action.payload.data.currencies) {
                        draft.currencie = Object.values(action.payload.data.currencies).slice(-1)[0].name
                    }

                    if(action.payload.data.languages) {
                        const languages = Object.values(action.payload.data.languages)
                        
                        draft.languages = languages.reduce((accumulator, currentValue) => {
                            return accumulator + ', ' + currentValue
                        }) 
                    }

                    draft.borders = action.payload.border

                    draft.countrie = action.payload.data
                    draft.status = 'resolved'
                    return
                }
                return
            },
        },
        rejected: {
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.countrie = null
                    draft.status = 'rejected'
                    return
                }
                return
            }
        },
    }
})

export const fetchCountrie = (countrieCode) => {
    return async (dispatch, getState) => {
        const { status } = selectInfo(getState())

        if(status === 'updating' || status === 'pending') {
            return
        }

        dispatch(fetching())
        
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countrieCode}`)
            const data = await response.json()

            let border = []

            if(data[0].borders) {
                for(let i = 0; i < data[0].borders.length; i++) {
                    const responseBorder = await fetch(`https://restcountries.com/v3.1/alpha/${data[0].borders[i]}`)
                    
                    const dataBorder = await responseBorder.json()
                    
                    border.push({name: dataBorder[0].name.common, code: dataBorder[0].cca2})
                }
            }
                
            dispatch(resolved({data: data[0], border}))

        } catch(error) {
            dispatch(rejected(error))
        }
    }
}

export const { fetching, resolved, rejected } = actions

export default reducer