import axios from 'axios'
export const RequestMethods = Object.freeze({
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch",
});

export async function makeRequest(
    url,
    method,
    inputPayload
) {
    console.log('Second')
    let requestConfig = {
        baseURL: `http://localhost:8080/api/v1`,
        url: url,
        method: method,
        headers: {
            Authorization: localStorage.getItem("authKey") || "",
        },
        data: {},
    };

    console.log("requestConfig : ",requestConfig);
    if (method !== "get" && inputPayload) {
        requestConfig.data = inputPayload;
    }
    console.log('payload : ',requestConfig);

    try {
        let response = await axios.request(requestConfig);
        return response;
    } catch (error) {
        throw error.message;
    }
}