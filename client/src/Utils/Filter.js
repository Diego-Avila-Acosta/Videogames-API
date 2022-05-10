function isUUID(id){
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
}


export default function Filter(){

    this.idFilter = function(videogames, payload){
        let bool = payload === "uuid" ? true : false
        return videogames.filter(game => {
            return isUUID(game.id) === bool
        })
    }

    this.genreFilter = function(videogames, payload){
        return videogames.filter(game => {
            for (let i = 0; i < game.genres.length; i++) {
                if(game.genres[i].id === payload) return true            
            }
            return false
        })
    }

}
