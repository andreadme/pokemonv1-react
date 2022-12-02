import http from "../http-common";

class PokemonService {
    create(form) {
        return http.post("/create-pokemon", form);
    }

    get(id) {
        return http.get(`/view-pokemon/${id}`);
    }

    getAll() {
        return http.get("/view-all/pokemon");
    }

    getTrainerPokemons(id) {
        return http.get(`/view-pokemons/trainer/${id}`);
    }

    // create(data) {
    //     return http.post("/tutorials", data);
    // }

    // update(id, data) {
    //     return http.put(`/tutorials/${id}`, data);
    // }

    // delete(id) {
    //     return http.delete(`/tutorials/${id}`);
    // }

    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }

    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new PokemonService();