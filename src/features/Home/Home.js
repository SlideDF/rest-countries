import { createSlice } from "@reduxjs/toolkit"
import { selectHome } from "../../utils/selector"

const initialState = {
    data: [],
    countries: [],
    error: null,
    status: 'void'
}

const  { actions, reducer } = createSlice({
    name: 'home',
    initialState,
    reducers: {
        fetching: {
            reducer: (draft, action) => {
                if(draft.status === 'void') {
                    draft.status = 'pending'
                    return
                }
                if(draft.status === 'rejected') {
                    draft.error = null
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
                    draft.countries = action.payload
                    draft.data = action.payload
                    draft.status = 'resolved'
                    return
                } 
                return
            }
        },
        rejected: {
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload
                    draft.countries = null
                    draft.data = null
                    draft.status = 'rejected'
                    return
                }
                return
            }
        },

        searchCountrie: (draft, action) => {
            draft.countries = draft.data.filter(data => data.translations.fra.common.toLowerCase().includes(action.payload.toLowerCase()))
            return
        }
    }
})

export const fetchCountries = async (dispatch, getState) => {
        const { status } = selectHome(getState())

        if(status === 'pending' || status === 'updating') {
            return
        }

        dispatch(fetching())
        
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            const data = await response.json()

            data.sort((a, b) => {
                if(a.translations.fra.common > b.translations.fra.common) {
                    return 1
                }
                if(a.translations.fra.common < b.translations.fra.common) {
                    return -1
                }
                return 0
            })

            dispatch(resolved(data))
        } catch(error) {
            dispatch(rejected(error))
        }
}

export const fetchRegionCountries = (region) => {
    return async (dispatch, getState) => {
        const { status } = selectHome(getState())
        
        if(status === 'pending' || status === 'updating') {
            return
        }
        
        dispatch(fetching())
        
        try {
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            const data = await response.json()

            data.sort((a, b) => {
                if(a.translations.fra.common > b.translations.fra.common) {
                    return 1
                }
                if(a.translations.fra.common < b.translations.fra.common) {
                    return -1
                }
                return 0
            })

            dispatch(resolved(data))
        } catch(error) {
            dispatch(rejected(error))
        }
    }
} 

export const { fetching, resolved, rejected, searchCountrie } = actions

export default reducer