

function Sort(){

    this.ascendent = function (target, element, prop){
        if(target[prop] > element[prop]){
            return true
        }else{
            return false
        }
    }

    this.descendent = function (target,element, prop){
        if(target[prop] < element[prop]){
            return true
        }else{
            return false
        }
    }
    
    this.sort = function (array, callback, prop){

        let aux, target
        
        for (let i = 0; i < array.length; i++) {
            target = i
            for (let j = i+1; j < array.length; j++) {
                if(callback(array[target], array[j], prop)){
                    target = j
                }
            }
    
            aux = array[i]
            array[i] = array[target]
            array[target]= aux
        }
        return array
    }
}

export default Sort

