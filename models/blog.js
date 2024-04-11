const { Schema, model } = require("mongoose");

const blogSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        require: true,
    },
    coverImageUrl: {
        type: String,
        require: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true});

const Blog = model("blog", blogSchema);
module.exports = Blog;