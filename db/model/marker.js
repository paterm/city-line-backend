const mongoose = require('../');

const MarkerSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    city_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});
const Marker = mongoose.model('Marker', MarkerSchema);

module.exports = {
    model: Marker,
    methods: {
        save(params) {
            if (params) {
                if (params._id) {
                    const fields = _.clone(params);

                    delete fields._id;

                    return Marker
                        .findOneAndUpdate({_id: params._id}, {$set: fields}, {new: true})
                        .then(model => Promise.resolve(model))
                        .catch(error => console.error(error));
                }

                params.created_at = _.now();

                return Marker
                    .create(params)
                    .then(model => Promise.resolve(model))
                    .catch(error => console.error(error));
            }
        }
    }
};
