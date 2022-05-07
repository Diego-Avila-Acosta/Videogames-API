module.exports = {
    mapGenre(genres){
        return genres.map(genre => {
            return {
                id: genre.id,
                name: genre.name
            }
        })
    }
}