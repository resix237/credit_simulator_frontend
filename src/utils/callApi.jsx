import axios from "axios";
import { useLocalStorage } from "../hooks";
export let url = "https://resixpr.pythonanywhere.com/api/";
export default function CallApi(auth, route, methode, query, body) {

    let headers = {};

    if (auth) {
        let user = JSON.parse(localStorage.getItem("user"));
        console.log("user", user);
        axios.defaults.headers.common.Authorization = `Bearer ${user?.access}`;
        let config = {
            url: url + route,
            method: methode,
            params: null,
            data: null,
        };
        if (query) {
            config.params = query;
        }
        if (body) {
            config.data = body;
        }
        return axios
            .request(config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
    else {
        let config = {
            url: url + route,
            method: methode,
            params: null,
            data: null,
        };
        if (query) {
            config.params = query;
        }
        if (body) {
            config.data = body;
        }
        return axios
            .request(config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

}

