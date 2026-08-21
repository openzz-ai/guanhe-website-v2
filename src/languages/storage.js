
export default {
    get(key){
        if(globalThis.localStorage){
            const value = globalThis.localStorage.getItem(key)
            return value ?? (key === 'language' ? 'en' : value)
        }
    },
    set(key,value){
        if(globalThis.localStorage){
            globalThis.localStorage.setItem(key,value)
        }
    },
    remove(key){
        if(globalThis.localStorage){
            globalThis.localStorage.removeItem(key)
        }
    }
}
