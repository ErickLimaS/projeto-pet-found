// gets the timestamp received from request and transform into a readable date
export const convertDate = (originalDate: string) => {

    // unix timestamp
    const unix = Date.parse(originalDate)

    // returns formated date
    return `${new Date(unix).getDate()}/${new Date(unix).getMonth()}/${new Date(unix).getFullYear()}`

}