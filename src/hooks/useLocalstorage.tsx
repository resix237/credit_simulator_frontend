import { useState } from "react";


export const useLocalStorage = (keyName: string, defaultValue: any) => {
    const [storage, setStorage] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            }
            else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        }
        catch (e) {
            return defaultValue;
        }
    }
    )
    const setValue = (newValue: any) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        }
        catch (e) { }
        setStorage(newValue);

    };
    return [storage, setValue];
}
