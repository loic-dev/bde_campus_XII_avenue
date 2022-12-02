export const createSetUpdateDatabase = (object) => {
    let SQL = 'SET'
    let index = 0;
    for (const [key, value] of Object.entries(object)) {
        if(index === 0){
            SQL += ` ${key}='${value}'`
        } else {
            SQL += `, ${key}='${value}'`
        }
        index++;
    }
    return SQL;
}