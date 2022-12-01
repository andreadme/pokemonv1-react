import http from "../http-common";

class SlotService {
    create(form) {
        console.log(form);
        return http.post("/create-slot", form);
    }

    getTrainerSlots(id) {
        return http.get(`/view-slots/trainer/${id}`);
    }

    // getAll() {
    //     return http.get("/view-all/league");
    // }

    // get(id) {
    //     return http.get(`/view-league/${id}`);
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

export default new SlotService();