
const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;

    for(let i = 0; i < rest.length; i++){
        const cur = rest[i];
        const next = rest[i + 1];

        if(cur.charAt(0) !== "-") continue;
        
        i === rest.length - 1 
            && (res[cur.slice(1)] = true);

        next && next.charAt(0) !== "-" 
            ? (res[cur.slice(1)] = next)
            : (res[cur.slice(1)] = true)
    }

    return res
};

export { getArgs };