const { await } = require("await");
const Folow = require("../models/entity/folow.entity");
const FolowResponse = require("../models/response/folow.response");
class FolowController {
    get_folow = (req, res) => {
        Folow.get(req.user.id, (data) => {
            const folows = data.map(async (folowData) => {
                const folow = new FolowResponse(folowData, FolowResponse);
                await folow.initStore()
                return folow
            })
            Promise.all(folows)
                .then((folowsWithData) => res.json(folowsWithData))
                .catch((error) => res.json({ message: "Error fetching folow data", error }))

        })
    }
    add_folow = (req, res) => {
        req.body.user_id = req.user.id;
        Folow.add(req.body, (data) => {
            res.json(data);
        })
    }
    delete_folow = (req, res) => {
        let data = {
            follow_id: req.params.id,
            user_id: req.user.id
        }
        Folow.delete(data, (result) => {
            res.json(result);
        })
    }
}

module.exports = new FolowController;