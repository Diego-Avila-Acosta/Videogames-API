
export function ascendent(target, element){
    if(target.name > element.name){
        return true
    }else{
        return false
    }
}

export function descendent(target,element){
    if(target.name < element.name){
        return true
    }else{
        return false
    }
}

export function sort(array, callback){

    let aux, target
    
    for (let i = 0; i < array.length; i++) {
        target = i
        for (let j = i+1; j < array.length; j++) {
            if(callback(array[target], array[j])){
                target = j
            }
        }

        aux = array[i]
        array[i] = array[target]
        array[target]= aux
    }
    return array
}



