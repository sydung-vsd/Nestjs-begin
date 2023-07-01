export const getDataResponse = (message = "Error", statuscode = 400, data: any = null) => {
    const status = (statuscode === 200) ? "Success" : "Error";

    return {
        status,
        statuscode,
        message,
        data,
    }
}