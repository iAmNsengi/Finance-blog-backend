const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lütfen başlık giriniz"], // Uyarı metni ekleme
      trim: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "Lütfen içerik giriniz"], // Uyarı metni ekleme
    },
    summary: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Lütfen yazar bilgisi giriniz"], // Uyarı metni ekleme
    },

    // TO-DO kategoriler daha dinamik bir şekilde eklenir mi ?
    category: {
      type: String,
      required: [true, "Lütfen kategori giriniz"], // Uyarı metni ekleme
      trim: true,
      enum: [
        "mikro-ekonomi",
        "makro-ekonomi",
        "kişisel-finans",
        "tasarruf",
        "temel-analiz",
        "teknik-analiz",
        "kategori-yok",
        "araştırma",
      ],
      default: "Kategori yok",
    },
    slug: String,
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    status: {
      type: String,
      enum: ["yayında", "düzenleniyor", "arşivlenmiş", "taslak"],
      default: "taslak",
    },
    views: {
      type: Number,
      default: 0, // Başlangıç değeri 0
    },
    // Beğeniler
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Downvote için:
    dislikes: {
      type: Number,
      default: 0,
    },
    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
postSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
postSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: false, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};
module.exports = mongoose.model("Post", postSchema);
