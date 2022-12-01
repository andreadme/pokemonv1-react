import http from "../http-common";

class TrainerService {
    register(form) {
        console.log(form);
        return http.post("/register", form);
    }

    login(form) {
        return http.post("/login/", form);
    }

    getAll() {
        return http.get("/view-all/trainer");
    }

    // get(form) {
    //     return http.get("/login/", form);
    // }

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

export default new TrainerService();