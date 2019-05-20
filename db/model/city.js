const mongoose = require('../');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;

            delete ret._id;
            delete ret.__v;

            return ret;
        }
    }
});

const City = mongoose.model('City', CitySchema);

module.exports = {
    model: City,
    methods: {
        save(params) {
            if (params) {
                if (params._id) {
                    const fields = _.clone(params);

                    delete fields._id;

                    return City
                        .findOneAndUpdate({_id: params._id}, {$set: fields}, {new: true})
                        .then(model => Promise.resolve(model))
                        .catch(error => console.error(error));
                }

                params.created_at = _.now();

                return City
                    .create(params)
                    .then(model => Promise.resolve(model))
                    .catch(error => console.error(error));
            }
        }
    }
};
